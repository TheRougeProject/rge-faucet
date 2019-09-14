<template>

  <div id="page-wrapper">

    <nuxt />

  </div>

</template>

<script>

export default {
  mounted () {
    let supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true
        }
      })
      window.addEventListener('testPassive', null, opts)
      window.removeEventListener('testPassive', null, opts)
    } catch (e) {}
    // IE9, Chrome, Safari, Opera
    window.addEventListener('mousewheel', this.handleScroll, supportsPassive ? { passive: true } : false)
    // Firefox
    window.addEventListener('DOMMouseScroll', this.handleScroll, supportsPassive ? { passive: true } : false)
  },
  beforeDestroy () {
    window.removeEventListener('mousewheel', this.handleScroll)
    window.removeEventListener('DOMMouseScroll', this.handleScroll)
  },
  methods: {
    handleScroll: function (event) {
      event = window.event || event
      const speed = 60
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)))
      document.documentElement.scrollLeft -= (delta * speed)
      document.body.scrollLeft -= (delta * speed)
      // event.preventDefault()
    }
  }
}
</script>

<style lang="scss">

@charset "UTF-8";

@import '~assets/sass/main.scss';

/* Page

   xbody {
   overflow-x: scroll;
   overflow-y: hidden;
   }*/

/* Wrapper */

#wrapper {
  body.is-preload & {
    @include vendor('transform', 'none');
    opacity: 1;
  }
}

</style>
