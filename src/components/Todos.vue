<template>
  <div class="todos">
    <div class="col s12 m6 card-container">
      <div class="card hoverable">
        <div class="card-content">
          <span class="card-title">
            Todos
            <i class="material-icons right tooltipped" data-position="top" data-tooltip="Delete done todos" @click="deleteDoneTodos">delete</i>
          </span>
          <div :class="'valign-wrapper todo ' + (todo.done ? 'done' : '')" v-for="todo in todos" :key="todo.id" :id="'todo_' + todo.id">
            <label :for="'checkbox_' + todo.id">
              <input type="checkbox" :id="'checkbox_' + todo.id" :checked="(todo.done ? 'checked' : '')" @click="updateTodo(todo.id)" />
              <span>{{ todo.name }}</span>
           </label>
          </div>
        </div>
        <div class="card-action">
          <form @submit.prevent="newTodo" class="valign-wrapper row">
            <i class="material-icons col s2 center">add</i>
            <input type="text" class="col s8" id="newTodo_name" required>
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
    name: 'Todos',
    data() {
      return {
        todos: []
      }
    },
    mounted() {
      if (window.outerWidth > 600) {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
      }

      db.collection('users').doc(uid).collection('todos').orderBy('done').onSnapshot(querySnapshot => {
        this.todos = []
        querySnapshot.forEach((doc) => {
          this.todos.push({
            ...doc.data(),
            id: doc.id
          })
        })
      })
    },
    methods: {
      newTodo() {
        var name = document.getElementById('newTodo_name')
        // Check if a todo has been inserted
        if (name.value) {
          db.collection('users').doc(uid).collection('todos').add({
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
      updateTodo(todoId) {
        var isChecked = document.getElementById('checkbox_' + todoId)
        if (isChecked.checked) {
          // It has been checked
          db.collection('users').doc(uid).collection('todos').doc(todoId).update({
            done: true
          })
        } else {
          db.collection('users').doc(uid).collection('todos').doc(todoId).update({
            done: false
          })
        }
      },
      deleteDoneTodos() {
        if (confirm('Delete all done todos?')) {
          db.collection('users').doc(uid).collection('todos').where('done', '==', true).get()
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
  .todo {
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