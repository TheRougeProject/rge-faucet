<template>

  <div id="wrapper">

    <section class="panel banner right">
      <div class="content color0 span-3-70">
        <h2 class="major">Testnet RGE token faucet</h2>
        <h3 v-if="!$eth.isConnected">Please use a compatible* web3 wallet to start...</h3>
        <h3 v-if="$eth.isConnected && !$eth.isTestNetwork">To use this faucet, please connect to a test network**</h3>
        <div class="field">
          <input id="isConnected" :checked="$eth.isConnected" type="checkbox" onclick="return false;" class="color2">
          <label for="isConnected">{{ $eth.isConnected ? '' : 'not ' }}logged in {{ $eth.walletType }}</label>
        </div>
        <div class="field">
          <input id="isTestNetwork" :checked="$eth.isTestNetwork" type="checkbox" onclick="return false;" class="color2">
          <label for="isTestNetwork">{{ $eth.isTestNetwork ? '' : 'not ' }}connected to <span v-if="$eth.isTestNetwork">{{ $eth.networkName }}</span><span v-else>a test network</span></label>
        </div>
        <ul class="actions color1">
          <li>
            <a href="#"
               :class="{ disabled: !$eth.selectedAddress || !$eth.isTestNetwork || pending }"
               class="button primary icon fa-gift"
               @click="giveMeRGE()"
            >
              Give me 50 RGE
            </a>
          </li>
        </ul>
        <p v-if="$eth.selectedAddress && $eth.explorer">Your account: <a target="_blank" :href="$eth.explorer('address', $eth.selectedAddress)">{{ $eth.selectedAddress }}</a></p>
        <p v-if="rgeAddress && $eth.explorer">RGE contract: <a target="_blank" :href="$eth.explorer('address', rgeAddress)">{{ rgeAddress }}</a></p>
        <p v-if="tx && $eth.explorer">tx: <a target="_blank" :href="$eth.explorer('tx', tx)">{{ tx }}</a></p>
        <p v-if="msg">{{ msg }}</p>
        <p v-if="!$eth.isConnected">* Tested with <a target="_blank" href="https://metamask.io/">MetaMask</a> <a target="_blank" href="https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid">Nifty</a> and <a target="_blank" href="https://trustwalletapp.com/">Trust</a></p>
        <p v-if="$eth.isConnected && !$eth.isTestNetwork">** Ethereum Ropsten Testnet or POA Sokol Testnet</p>
      </div>
      <div class="image filtered span-1-75" data-position="25% 25%">
        <img src="/images/tap.png" alt="">
      </div>
    </section>

    <section class="panel color2-alt">
      <div class="intro color2">
        <h2 class="major">About Rouge</h2>
        <p>
          The Rouge Project is an open-source software project
          building a note and voucher protocol — the Rouge
          Network — as a suite of smart contracts using the Rouge
          token (RGE). It's a platform to securely transfer
          certificates of financial value (vouchers, discount coupons,
          tickets, any notes, ..) between market participants. Trackable,
          verifiable, monitizeable, frictionless and unique
          vouchers are opening new possibilities in ecommerce and
          digital marketing.
        </p>
      </div>
      <div class="inner columns">
        <div class="span-1-6">
          <ul class="contact-icons color2">
            <li class="icon fa-envelope"><a target="_blank" href="mailto:hello@rouge.network">hello@rouge.network</a></li>
            <li class="icon fa-twitter"><a target="_blank" href="https://twitter.com/Rougetoken">@rougetoken</a></li>
            <li class="icon fa-telegram"><a target="_blank" href="https://t.me/rougetoken">@rougetoken</a></li>
            <li class="icon fa-github"><a target="_blank" href="https://github.com/TheRougeProject">github.com/TheRougeProject</a></li>
            <li class="icon fa-facebook"><a target="_blank" href="https://www.facebook.com/rougetoken/">facebook.com/rougetoken</a></li>
            <li class="icon fa-medium"><a target="_blank" href="https://medium.com/the-rouge-project">medium.com/the-rouge-project</a></li>
          </ul>
        </div>
      </div>
    </section>

    <div class="copyright">&copy; The Rouge Foundation OÜ. All rights reserved. theme: <a target="_blank" href="https://html5up.net">html5up</a>.</div>

  </div>

</template>

<script>

import Web3 from 'web3'

import RGEToken from 'rouge-protocol-solidity/build/contracts/TestRGEToken.json'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tx: null,
      pending: false,
      msg: null
    }
  },
  computed: {
    rgeAddress () {
      return this.$store.state.rgeAt[this.$eth.networkId]
    }
  },
  mounted () {
    this.$eth.on()
  },
  methods: {
    giveMeRGE: async function () {
      this.msg = 'Transaction pending, please wait...'

      const instance = this.$eth.web3
      const RGE = new instance.eth.Contract(RGEToken.abi, this.rgeAddress, {})

      const method = RGE.methods.giveMeRGE(50 * 10 ** 6)

      const estimate = await method.estimateGas({ from: this.$eth.selectedAddress })
      const encoded = await method.encodeABI()

      this.pending = true
      this.tx = null

      instance.eth.sendTransaction({
        from: this.$eth.selectedAddress,
        gasPrice: instance.utils.toHex(1000000000),
        gasLimit: instance.utils.toHex(estimate),
        to: this.rgeAddress,
        value: '0x00',
        data: encoded
      }).on('transactionHash', (hash) => {
        this.tx = hash
      }).on('receipt', (receipt) => {
        if (receipt.status) this.msg = 'Cheers! 50 RGE tokens have been transfered to your account...'
        this.pending = false
      }).off('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation', confirmationNumber)
      }).on('error', (error, receipt) => {
        console.log('sendTransaction failed', { error, receipt })
        this.msg = `tx failed!`
        this.pending = false
      })
    }
  }
}

</script>

<style lang="scss">

.banner {

  input[checked]:focus {
    outline: none;
  }

  .field {
    margin-top: 0.5em;
  }

  .actions {
    margin-top: 3em;
  }

}

</style>
