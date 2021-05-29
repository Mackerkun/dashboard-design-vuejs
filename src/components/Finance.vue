<template>
  <div class="row finance">
    <h4 class="center">Your cards</h4>
    <div class="col s12 m4 card-container" v-for="card in finance" :key="card.id">
      <div class="card hoverable">
        <div class="card-content">
          <span class="card-title">{{ card.bank }}</span>
          <p class="card-details">
            <span class="valign-wrapper" v-if="card.name">
              <i class="material-icons" style="margin-right: 5%;">person</i>
              {{ card.name }}
            </span>
            <span class="valign-wrapper truncate" v-if="card.iban" @click="copyToClipboard(card.iban)">
              <i class="material-icons" style="margin-right: 5%;">account_balance</i>
              {{ card.iban }}
            </span>
            <span class="valign-wrapper" v-if="card.bic" @click="copyToClipboard(card.bic)">
              <i class="material-icons" style="margin-right: 5%;">account_balance_wallet</i>
              {{ card.bic }}
            </span>
            <span class="valign-wrapper" v-if="card.number" @click="copyToClipboard(card.number)">
              <i class="material-icons" style="margin-right: 5%;">credit_card</i>
              {{ card.number }}
            </span>
            <span class="valign-wrapper" v-if="card.expire">
              <i class="material-icons" style="margin-right: 5%;">today</i>
              {{ card.expire }}
            </span>
            <span class="valign-wrapper" v-if="card.ccv">
              <i class="material-icons" style="margin-right: 5%;">lock</i>
              {{ card.ccv }}
            </span>
          </p>
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
    name: 'Finance',
    data() {
      return {
        finance: []
      }
    },
    mounted () {
      db.collection('users').doc(uid).collection('finance').orderBy('bank').get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          this.finance.push({
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
      }
    }
  }
</script>

<style scoped>
  .card-details span {
    padding: 2% 0;
    cursor: default;
  }
</style>