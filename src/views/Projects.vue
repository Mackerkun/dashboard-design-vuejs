<template>
  <div class="projects">
    <h4 class="center">Projects</h4>
    <div class="row">
      <div class="col s6 m4 card-container" v-for="item in sources" :key="item.name">
        <div class="card small hoverable" :style="'background-color: ' + item.color + ';'">
          <div class="card-content white-text">
            <span class="card-title">{{ item.name }}</span>
            <p>{{ item.description}}</p>
            <div class="technology-container center">
              <span v-for="skill in item.categories" :key="skill">
                <i class="material-icons technology">{{ skill }}</i>
              </span>
            </div>
          </div>
          <div class="card-action valign-wrapper">
            <a :href="item.url" target="_blank">Visit</a>
            <i class="material-icons float-right" @click="copyToClipboard(item.url)">content_copy</i>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card grey darken-3 hoverable">
          <div class="card-content white-text">
            <span class="card-title">
              Add new project
              <div class="input-color-container right">
                <input type="color" class="white-text input-color" id="newProject_color" placeholder="Color...">
              </div>
            </span>
            <p class="row">
              <input type="text" class="col s12 m5 white-text" id="newProject_name" placeholder="Name..." autocomplete="off">
              <input type="text" class="col s12 m5 push-m2 white-text" id="newProject_description" placeholder="Description..." autocomplete="off">
              <input type="text" class="col s12 white-text" id="newProject_categories" placeholder="Categories..." autocomplete="off">
              <input type="text" class="col s12 white-text" id="newProject_url" placeholder="Url..." autocomplete="off">
            </p>
          </div>
          <div class="card-action white-text valign-wrapper">
            <span @click="insertProject()">Insert</span>
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
    name: 'Projects',
    data() {
      return {
        sources: []
      }
    },
    mounted() {
      db.collection('users').doc(uid).collection('projects').orderBy('name').get().then(querySnapshot => {
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
      //
      insertProject() {
        var name = document.getElementById('newProject_name')
        var description = document.getElementById('newProject_description')
        var categories = document.getElementById('newProject_categories')
        var url = document.getElementById('newProject_url')
        var color = document.getElementById('newProject_color')

        if (name.value && description.value && url.value) {
          db.collection('users').doc(uid).collection('projects').add({
            name: name.value,
            description: description.value,
            categories: categories.value.split(', '),
            url: url.value,
            color: color.value
          })
          .then((docRef) => {
            this.sources.push({
              name: name.value,
              description: description.value,
              categories: categories.value.split(', '),
              url: url.value,
              color: color.value,
              id: docRef.id
            })
            // Clear fields
            name.value = ''
            description.value = ''
            categories.value = ''
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

  .technology {
    padding: 2%;
    cursor: default;
  }

  .technology-container {
    position: absolute;
    bottom: 70px;
    width: calc(100% - 48px);
  }
</style>