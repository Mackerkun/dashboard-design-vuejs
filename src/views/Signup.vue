<template>
  <div class="signup container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="signup center">
          <h4>Signup</h4>
          <form action="index.html">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email">
              <label for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <label for="password">Password</label>
            </div>
            <button v-on:click="register" class="btn btn-large btn-extended">Signup</button>
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../components/firebaseInit'

export default {
  name: 'Signup',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // Create a document in collection
            db.collection('users').doc(user.user.uid).set({
              email: this.email
            }).then(() => {
              this.$router.go({ path: this.$router.path })
            })
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
}
</script>

<style scoped>

</style>