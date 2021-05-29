<template>
  <div class="saved-pages">
    <h4 class="center">Saved pages</h4>
    <div class="row">
      <div class="col s6 m4 card-container" v-for="page in pages" :key="page.id">
        <div class="card small hoverable" :style="'background-color: ' + page.color + ';'">
          <div class="card-content white-text">
            <span class="card-title">
              {{ page.name }}
              <i class="material-icons" @click="deletePage(page.id)">delete</i>  
            </span>
            <p>
              <span class="valign-wrapper" v-if="page.description"><i class="material-icons" style="margin-right: 5%;">description</i>{{ page.description }}</span>
            </p>
          </div>
          <div class="card-action" v-if="page.url">
            <a :href="page.url" target="_blank">Visit</a>
            <i class="material-icons float-right" @click="copyToClipboard(page.url)">content_copy</i>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card grey darken-3 hoverable">
          <div class="card-content white-text">
            <span class="card-title">
              Add new page
              <div class="input-color-container right">
                <input type="color" class="white-text input-color" id="newPage_color" placeholder="Color...">
              </div>
            </span>
            <p class="row">
              <input type="text" class="col s12 white-text" id="newPage_name" placeholder="Name..." autocomplete="off">
              <input type="text" class="col s12 white-text" id="newPage_description" placeholder="Description..." autocomplete="off">
              <input type="text" class="col s12 white-text" id="newPage_url" placeholder="Url..." autocomplete="off">
            </p>
          </div>
          <div class="card-action white-text valign-wrapper">
            <span @click="insertPage()">Insert</span>
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
    name: 'SavedPages',
    data() {
      return {
        pages: []
      }
    },
    mounted() {
      // TODO: Manage visited places
      db.collection('users').doc(uid).collection('saved_pages').orderBy('name').get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.pages.push({
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
      // Insert new page
      insertPage() {
        var name = document.getElementById('newPage_name')
        var description = document.getElementById('newPage_description')
        var url = document.getElementById('newPage_url')
        var color = document.getElementById('newPage_color')

        if (name.value && url.value) {
          db.collection('users').doc(uid).collection('saved_pages').add({
            name: name.value,
            description: description.value,
            url: url.value,
            color: color.value
          }).then((docRef) => {
            this.pages.push({
              id: docRef.id,
              name: name.value,
              description: description.value,
              url: url.value,
              color: color.value
            })

            name.value = ''
            description.value = ''
            url.value = ''
          })
        }
      },
      deletePage(id) {
        db.collection('users').doc(uid).collection('saved_pages').doc(id).delete().then(() => {
          M.toast({html: 'Page deleted'})
        })
      }
    }
  }
</script>

<style scoped>
  .material-icons {
    cursor: pointer;
  }

  .card-action a {
    color: white !important;
  }

  .card-action .material-icons {
    position: absolute;
    left: 80%;
    color: white;
    cursor: pointer;
  }

  .card-action span {
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