<template>
  <div class="shoppingitems">
    <div class="col s12 m6 card-container">
      <div class="card hoverable">
        <div class="card-content">
          <span class="card-title">
            Shopping
            <i class="material-icons right tooltipped" data-position="top" data-tooltip="Delete bought items" @click="deleteBoughtItems">delete</i>
          </span>
          <div :class="'valign-wrapper shoppingitem ' + (shoppingitem.done ? 'done' : '')" v-for="shoppingitem in shoppingitems" :key="shoppingitem.id" :id="'shoppingitem_' + shoppingitem.id">
            <label :for="'checkbox_' + shoppingitem.id">
              <input type="checkbox" :id="'checkbox_' + shoppingitem.id" :checked="(shoppingitem.done ? 'checked' : '')" @click="updateshoppingitem(shoppingitem.id)" />
              <span>{{ shoppingitem.name }}</span>
           </label>
          </div>
        </div>
        <div class="card-action">
          <form @submit.prevent="newshoppingitem" class="valign-wrapper row">
            <i class="material-icons col s2 center">add</i>
            <input type="text" class="col s8" id="newshoppingitem_name" required>
            <button><i class="material-icons col s2 center clickable">send</i></button>
          </form>
        </div>
      </div>  
    </div>  
  </div>
</template>

<script>
  import M from 'materialize-css'
  import db from './firebaseInit'
  import uid from './firebaseUserUID'

  export default {
    name: 'Shopping',
    data() {
      return {
        shoppingitems: []
      }
    },
    mounted() {
      if (window.outerWidth > 600) {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
      }

      db.collection('users').doc(uid).collection('shopping_items').orderBy('done').onSnapshot(querySnapshot => {
        this.shoppingitems = []
        querySnapshot.forEach((doc) => {
          this.shoppingitems.push({
            ...doc.data(),
            id: doc.id
          })
        })
      })
    },
    methods: {
      newshoppingitem() {
        var name = document.getElementById('newshoppingitem_name')
        // Check if a shoppingitem has been inserted
        if (name.value) {
          db.collection('users').doc(uid).collection('shopping_items').add({
            name: name.value,
            important: false,
            done: false
          })
          .then(() => {
            // Clear field
            name.value = ''
          })
        }
      },
      updateshoppingitem(shoppingitemId) {
        var isChecked = document.getElementById('checkbox_' + shoppingitemId)
        if (isChecked.checked) {
          // It has been checked
          db.collection('users').doc(uid).collection('shopping_items').doc(shoppingitemId).update({
            done: true
          })
        } else {
          db.collection('users').doc(uid).collection('shopping_items').doc(shoppingitemId).update({
            done: false
          })
        }
      },
      deleteBoughtItems() {
        if (confirm('Delete all bought shopping items?')) {
          db.collection('users').doc(uid).collection('shopping_items').where('done', '==', true).get()
          .then(function(querySnapshot) {
                // Once we get the results, begin a batch
                var batch = db.batch();

                querySnapshot.forEach(function(doc) {
                    // For each doc, add a delete operation to the batch
                    batch.delete(doc.ref);
                });

                // Commit the batch
                return batch.commit();
          }).then(function() {
              // Delete completed!
              M.toast({html: 'Deleting completed'})
          }); 
        }
      }
    }
  }
</script>

<style scoped>
  .shoppingitem {
    padding: 2%;
  }

  .done span {
    text-decoration: line-through;
  }

  .right-aligned {
    position: absolute;
    right: 10%;
  }

  .card-title .material-icons {
    cursor: pointer;
  }

  .card-action .material-icons {
    cursor: default;
  }

  .clickable {
    cursor: pointer !important;
  }
</style>