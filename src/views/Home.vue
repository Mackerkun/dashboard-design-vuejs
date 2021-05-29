<template>
  <div class="home">
    <!-- Quote of the day -->
    <div class="container quoteoftheday">
      <h4 class="center">{{ quotes[quotes_index].text }}</h4>
      <h6 class="quote-author">{{ quotes[quotes_index].author }}</h6>
    </div>
    <!-- Todos card -->
    <div class="row">
      <Todos />
      <ShoppingList />
    </div>
    <!-- Credit cards and finance -->
    <Finance />
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue'
  import Finance from '@/components/Finance.vue'
  import Todos from '@/components/Todos.vue'
  import ShoppingList from '@/components/ShoppingList.vue'
  import M from 'materialize-css'

  export default {
    name: 'Home',
    components: {
      Finance,
      Todos,
      ShoppingList
    },
    data: function () {
      return {
        quotes: [
          {
            text: 'Beep bloop bloop bleep boop',
            author: 'R2D2 | Star Wars'
          },
          {
            text: 'Test 2',
            author: 'Test 2'
          }
        ],
        quotes_index: 0,
      };
    },
    mounted() {
      // Choose a random quote
      this.quotes_index = Math.floor(Math.random() * this.quotes.length)

      //
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
      }
    }
  }
</script>

<style>
  .quoteoftheday {
    margin-top: 5%;
    margin-bottom: 5%;
  }

  .quote-author {
    text-align: right;
    color: #5a5a5a;
  }

  .material-icons:hover {
    color: #1a8887;
    transition: color .5s;
  }

  button {
    border: none;
    background-color: transparent;
  }
</style>