<template>
  <q-dialog v-model="valueBind"
            @show="onShow"
            :transition-show="transitionShow"
            :transition-hide="transitionHide"
            content-class="about-project-dialog"
            :persistent="false"
  >
    <slot/>
  </q-dialog>
</template>

<script>
export default {
  name: 'LsDialog',
  /** START: Lifecycle Hooks */
  /** END: Lifecycle Hooks */
  props: {
    /** START: q-dialog props */
    value: {
      type: Boolean,
      default: () => false,
    },
    transitionShow: {
      type: String,
      default: () => 'fade',
    },
    transitionHide: {
      type: String,
      default: () => 'scale',
    },
    /** START: q-parallax props */
    /** This property should have a child with this class in this component and the same in scrollTarget */
    parallaxScrollTarget: {
      type: String,
      default: () => '.parallax-scroll-target',
    },
    /** END: q-parallax props */
  },
  data: () => ({
    // These are used to correctly position the parallax when the user enters the Dialog
    dialogElement: null,
    dialogScrollElement: null,
  }),
  computed: {
    valueBind: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    onShow(event) {
      let _this = this;
      _this.refreshDialogElements();
      _this.$emit('show', event);
    },
    /**
     * We need to manually get/refresh the DialogElements ourselves
     * as computed properties do not work due to the default slot not being present when it's first watched by Vue
     */
    refreshDialogElements() {
      let _this = this;
      _this.dialogElement = (document.body.contains(_this.dialogElement)) ? _this.dialogElement : _this.$slots.default[0].elm;

      if (_this.dialogScrollElement) {
        if (!document.body.contains(_this.dialogScrollElement)) {
          // If this expression is true, we already have the dialogScrollElement from a different time the user entered this component
          _this.dialogScrollElement = findDialogScrollElement();
        }

        _this.dialogScrollElement.scrollTop++;
      }

      /**
       * Finds the scroll target that needs to be refreshed
       * @returns {boolean|any}
       */
      function findDialogScrollElement() {
        if (typeof _this.parallaxScrollTarget === 'string') {
          let parallaxScroll = _this.dialogElement.querySelectorAll(_this.parallaxScrollTarget);

          if (parallaxScroll.length > 0) {
            // If we specifically set an element as the scrollTarget, get it (Assume it's the first one found)
            return parallaxScroll[0];
          }
        }

        // If we didn't specify a scrollTarget assume it's the one we set via Tailwind's .scroll class
        let tailwindScroll = _this.dialogElement.querySelectorAll('.scroll');
        if (tailwindScroll.length > 0) {
          return tailwindScroll[0];
        }

        // None was found, assume no parallax was used for this dialog/modal
        return false;
      }
    },
  },
};
</script>
