<template>
  <div class="university">
    <h4 class="center">University</h4>
    <div class="row">
      <div class="col s12 m4 card-container">
        <div class="card hoverable blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title activator center">Mean</span>
            <p class="center">
              <span class="score mean">30</span>
              <span class="score total">/30</span>
            </p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Mean<i class="material-icons right">close</i></span>
            <p>
              <span class="score worst">Worst possible score: 102/110</span>
              <br>
              <span class="score best">Best possible score: 110/110</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col s12 m4 card-container">
        <div class="card hoverable blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title center">CFU</span>
            <p class="center">
              <span class="cfu mean">42</span>
              <span class="cfu total">/120</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col s12 m4 card-container">
        <div class="card hoverable blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title center">Exams left</span>
            <p class="center">
              <span class="exams mean">8</span>
              <span class="exams total">/15</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 card-container">
        <div class="card hoverable green darken-3">
          <div class="card-content white-text">
            <span class="card-title center">Progress</span>
            <p class="center">
              <span class="mean">Graph</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import M from 'materialize-css'

  export default {
    name: 'University',
    data() {
      return {
        exams: [
          {
            name: 'Ingegneria del Software Avanzata',
            score: null,
            done: false,
            date: null,
            color: 'red'
          },
          {
            name: 'Materiali per l\'Ingegneria Elettrica',
            score: 30,
            done: true,
            date: '21/10/2020',
            color: 'green'
          }
        ]
      }
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
    },
    mounted() {
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {accordion: false})
    }
  }
</script>

<style scoped>
  .collapsible {
    margin: 0;
    box-shadow: 0 0 0 0;
  }

  .mean {
    font-size: 56px;
    cursor: default;
  }

  .total {
    font-size: 24px;
    cursor: default;
  }
</style>