<template>
  <q-dialog v-model="valueBind"
            @show="onShow"
            ref="projectDialog"
            content-class="about-project-dialog"
            :persistent="false"
  >
    <slot ref="testLs"/>
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
    /** END: q-parallax props */
    hasParallax: {
      type: Boolean,
      default: () => false,
    },
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
      if (_this.hasParallax) {
        _this.refreshDialogElements();
        console.log('LsDialog -> onShow', _this.dialogScrollElement);
        // _this Dialog has a parallax, to initialise the parallax on a new element on the DOM, we need to "wake" it up
        _this.dialogScrollElement.scrollTop++;
      }
      _this.$emit('show', event);
    },
    /**
     * We need to manually refresh the DialogElements ourselves
     * as computed properties do not work due to the default slot not being present when the its first watched by Vue
     */
    refreshDialogElements() {
      console.log('methods refreshDialogElements');
      this.dialogElement = (document.body.contains(this.dialogElement))
        ? this.dialogElement
        : this.$slots.default[0].elm;
      this.dialogScrollElement = (document.body.contains(this.dialogScrollElement))
        ? this.dialogScrollElement : this.dialogElement.querySelector('.parallax-scroll');
    },
  },
};
</script>
