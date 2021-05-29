<template>
  <ul id="slide-out" class="sidenav sidenav-fixed center">
    <li v-for="item in sidenav_items" :key="item.icon">
      <router-link :to="'/' + item.router" class="sidenav-option sidenav-close tooltipped" data-position="right" :data-tooltip="item.tooltip" :id="'sidenavoption_' + item.icon">
        <i class="material-icons">{{ item.icon }}</i>
      </router-link>
    </li>
    <li class="logout">
      <a href="#" class="tooltipped" data-position="right" data-tooltip="Logout" @click="logout"><i class="material-icons">logout</i></a>
    </li>
  </ul>
</template>

<script>
  import M from 'materialize-css'
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    name: 'Sidenav',
    data: function() {
      return {
        sidenav_items: [
          {
            icon: 'dashboard',
            tooltip: 'Dashboard',
            router: ''
          },
          {
            icon: 'email',
            tooltip: 'Mail',
            router: 'email'
          },
          {
            icon: 'event',
            tooltip: 'Calendar',
            router: 'calendar'
          },
          {
            icon: 'school',
            tooltip: 'University',
            router: 'university'
          },
          {
            icon: 'work',
            tooltip: 'Projects',
            router: 'projects'
          },
          {
            icon: 'bookmark',
            tooltip: 'Saved pages',
            router: 'bookmarks'
          },
          {
            icon: 'luggage',
            tooltip: 'Places to visit',
            router: 'travel'
          },
          {
            icon: 'code',
            tooltip: 'Useful websites',
            router: 'code_websites'
          },
          {
            icon: 'palette',
            tooltip: 'Design websites',
            router: 'design_websites'
          }
        ]
      };
    },
    mounted() {
      if (window.outerWidth > 600) {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
      }
      elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems);
    },
    methods: {
      logout: function() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.go({ path: this.$router.path });
          });
      }
    }
  }
</script>

<style>
  .sidenav {
    width: 50px;
  }

  .sidenav-option.router-link-exact-active i {
    color: #1a8887 !important;
  }

  .sidenav li:first-child {
    margin-top: 9px;
  }

  .sidenav li {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }

  .sidenav li a {
    padding: 0 !important;
  }

  .sidenav li i {
    width: 32px !important;
    height: 32px !important;
    margin: 0 !important;
    margin-left: 9px !important;
  }

  .logout {

  }

  @media only screen and (min-width: 600px) {
   
  }
</style>