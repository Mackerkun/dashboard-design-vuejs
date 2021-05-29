<template>
  <div class="design">
    <h4 class="center">Design websites</h4>
    <div class="row">
      <div class="col s6 m4 card-container" v-for="item in sources" :key="item.id">
        <div class="card hoverable" :style="'background-color: ' + item.color + ';'">
          <div class="card-content white-text">
            <span class="card-title">{{ item.name }}</span>
            <p>{{ item.description}}</p>
          </div>
          <div class="card-action">
            <a :href="item.url" target="_blank">Visit</a>
            <i class="material-icons float-right" @click="copyToClipboard(item.url)">content_copy</i>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card grey darken-3 hoverable">
          <div class="card-content white-text">
            <span class="card-title">
              Add new website
              <div class="input-color-container right">
                <input type="color" class="white-text input-color" id="newDesignWebsite_color" placeholder="Color...">
              </div>
            </span>
            <p class="row">
              <input type="text" class="col s12 m5 white-text" id="newDesignWebsite_name" placeholder="Name..." autocomplete="off">
              <input type="text" class="col s12 m5 push-m2 white-text" id="newDesignWebsite_description" placeholder="Description..." autocomplete="off">
              <input type="text" class="col s12 white-text" id="newDesignWebsite_url" placeholder="Url..." autocomplete="off">
            </p>
          </div>
          <div class="card-action white-text valign-wrapper">
            <span @click="insertWebsite()">Insert</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import M from 'materialize-css'
  import db from '../components/firebaseInit'
  import uid from '../components/firebaseUserUID'

  export default {
    name: 'Design_Websites',
    data() {
      return {
        sources: []
      }
    },
    mounted() {
      db.collection('users').doc(uid).collection('design_websites').orderBy('name').get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.sources.push({
            ...doc.data(),
            id: doc.id
          })
        })
      })
    },
    methods: {
      copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        M.toast({
          html: 'Copied to clipboard'
        })
      },
      // Insert new website
      insertWebsite() {
        var name = document.getElementById('newDesignWebsite_name')
        var description = document.getElementById('newDesignWebsite_description')
        var url = document.getElementById('newDesignWebsite_url')
        var color = document.getElementById('newDesignWebsite_color')

        if (name.value && description.value && url.value) {
          db.collection('users').doc(uid).collection('design_websites').add({
            name: name.value,
            description: description.value,
            url: url.value,
            color: color.value
          })
          .then((docRef) => {
            this.sources.push({
              name: name.value,
              description: description.value,
              url: url.value,
              color: color.value,
              id: docRef.id
            })

            name.value = ''
            description.value = ''
            url.value = ''
          })
        }
      }
    }
  }
</script>

<style scoped>
  .card-action a {
    color: white !important;
  }

  .card-action .material-icons {
    position: absolute;
    left: 80%;
    color: white;
    cursor: pointer;
  }

  .input-color-container {
  position: relative;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border: solid 2px #ddd;
  border-radius: 40px;
  }

  .input-color {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 56px;
    height: 56px;
    border: none;
  }

</style>