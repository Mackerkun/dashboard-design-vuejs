<template>
  <div class="travel">
    <h4 class="center">Travel</h4>
    <div class="row">
      <div class="col s6 m4 card-container" v-for="place in places" :key="place.id">
        <div class="card small hoverable" :style="'background-color: ' + place.color + ';'">
          <div class="card-content white-text">
            <span class="card-title activator">{{ place.name }}</span>
            <p>
              <span class="valign-wrapper" v-if="place.city"><i class="material-icons" style="margin-right: 5%;">room</i>{{ place.city }}</span>
              <br>
              <span class="valign-wrapper" v-if="place.description"><i class="material-icons" style="margin-right: 5%;">description</i>{{ place.description }}</span>
            </p>
          </div>
          <div class="card-action" v-if="place.url">
            <a :href="place.url" target="_blank">Visit</a>
            <i class="material-icons float-right" @click="copyToClipboard(place.url)">content_copy</i>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{{ place.name }}<i class="material-icons right">close</i></span>
            <div class="modify-url">
              <form @submit.prevent="modifyPlaceURL(place.id)" class="updatePlace">
                <input type="text" :id="'updatePlace_' + place.id + 'url'" autocomplete="off">
                <button type="submit" class="btn">Modify url</button>
              </form>
            </div>
            <div class="bottom-section">
              <button class="visited-btn btn" @click="visitedPlace(place.id)"><i class="material-icons">done</i></button>
              <button class="deleted-btn btn" @click="deletePlace(place.id)"><i class="material-icons">delete</i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card grey darken-3 hoverable">
          <div class="card-content white-text">
            <span class="card-title">
              Add new place
              <div class="input-color-container right">
                <input type="color" class="white-text input-color" id="newPlace_color" placeholder="Color...">
              </div>
            </span>
            <p class="row">
              <input type="text" class="col s12 white-text" id="newPlace_name" placeholder="Name..." autocomplete="off">
              <input type="text" class="col s12 m5 white-text" id="newPlace_city" placeholder="City..." autocomplete="off">
              <input type="text" class="col s12 m5 push-m2 white-text" id="newPlace_description" placeholder="Description..." autocomplete="off">
              <input type="text" class="col s12 white-text" id="newPlace_url" placeholder="Url..." autocomplete="off">
            </p>
          </div>
          <div class="card-action white-text valign-wrapper">
            <span @click="insertPlace()">Insert</span>
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
    name: 'Travel',
    data() {
      return {
        places: []
      }
    },
    mounted() {
      // TODO: Manage visited places
      db.collection('users').doc(uid).collection('travel').orderBy('name').get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          this.places.push({
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
      // Insert new place to visit
      insertPlace() {
        var name = document.getElementById('newPlace_name')
        var city = document.getElementById('newPlace_city')
        var description = document.getElementById('newPlace_description')
        var url = document.getElementById('newPlace_url')
        var color = document.getElementById('newPlace_color')

        if (name.value && city.value) {
          db.collection('users').doc(uid).collection('travel').add({
            name: name.value,
            city: city.value,
            description: description.value,
            url: url.value,
            color: color.value,
            visited: false
          }).then((docRef) => {
            this.places.push({
              id: docRef.id,
              name: name.value,
              city: city.value,
              description: description.value,
              url: url.value,
              color: color.value,
              visited: false
            })

            name.value = ''
            city.value = ''
            description.value = ''
            url.value = ''
          })
        }
      },
      modifyPlaceURL(id) {
        const new_url = document.getElementById('updatePlace_' + id + 'url')
        if (new_url.value) {
          db.collection('users').doc(uid).collection('travel').doc(id).update({
            url: new_url.value
          })
          .then(() => {
            M.toast({html: 'URL updated'})
            new_url.value = ''
            // TODO: Automatically close card
          })
        }
      },
      visitedPlace(id) {
        db.collection('users').doc(uid).collection('travel').doc(id).update({
          visited: true
        }).then(() => {
          M.toast({html: 'Place marked as visited'})
        })
      },
      deletePlace(id) {
        db.collection('users').doc(uid).collection('travel').doc(id).delete().then(() => {
          M.toast({html: 'Place deleted'})
        })
      }
    }
  }
</script>

<style scoped>
  .bottom-section {
    position: absolute;
    bottom: 10px;
    width: calc(100% - 48px);
  }

  .visited-btn, .deleted-btn {
    margin: 1%;
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