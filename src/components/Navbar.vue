<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <form class="hide-on-med-and-down">
          <div class="input-field">
            <input id="search" type="search" autocomplete="off" @keyup="searchInRoute()" required>
            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
            <i class="material-icons">close</i>
          </div>
        </form>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      searchInRoute() {
        var input, filter, cards, title, description, i;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        cards = document.getElementsByClassName("card-container");
        for (i = 0; i < cards.length; i++) {
          title = cards[i].querySelector(".card-content .card-title");
          description = cards[i].querySelector(".card-content p")
          if (title.innerText.toUpperCase().indexOf(filter) > -1 || description.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
          } else {
            cards[i].style.display = "none";
          }
        }
      }
    }
  }
</script>

<style>
  nav {
    background-color: #1a8887;
  }

  @media only screen and (min-width: 600px) {
    nav {
      width: calc(100% - 50px);
    }
  }
</style>