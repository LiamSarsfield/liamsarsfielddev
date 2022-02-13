<template>
  <q-parallax :height="height" @scroll="onScroll" ref="parallaxMedia" :scroll-target="scrollTarget">
    <template>
      <slot/>
    </template>
    <template v-slot:media>
      <slot name="media"/>
    </template>
  </q-parallax>
</template>

<script>
export default {
  name: 'LsParallax',
  /** START: Lifecycle Hooks */
  async mounted() {
    const _this = this;
    // Get the actual DOM element of the scrollTarget
    _this.stickyElement = _this.$el.closest(_this.scrollTarget);
    // The media element either belongs to the qParallax or the sticky element
    _this.mediaElem = _this.$slots.media()[0].el ?? _this.$refs.mediaContainer.firstElementChild;

    /**
     * Watches the computed property, if either the translate or the scale changes, update the media's transform with this value, immediately trigger the watch.
     * We cannot have this in the component's watch property as we don't have access to the mediaElem property when the watch first triggers.
     */
    _this.$watch('transformStyle', (newValue) => {
      const _this = this;
      _this.mediaElem.style.transform = newValue;
    }, {immediate: true});
  },
  /** END: Lifecycle Hooks */
  props: {
    /** START: q-parallax props */
    height: {
      type: Number,
      default: () => 500,
    },
    scrollTarget: {
      type: String,
      default: () => '.parallax-scroll-target',
    },
    /** END: q-parallax props */
    // The Scaling of the parallax, this can be used to ensure the image shows the full width
    scale: {
      type: String,
      default: () => '1',
    },
  },
  data: () => ({
    // The style that will be applied to the mediaElem
    translate3dStyle: '',
    // The mediaElem where the qParallax applies the translate update to
    mediaElem: null,
    stickyElement: null,
  }),
  computed: {
    transformStyle() {
      let transformStyle = (this.translate3dStyle) ? `translate3d(${this.translate3dStyle})` : '';
      transformStyle += (this.scale) ? `scale(${this.scale})` : '';
      return transformStyle;
    },
  },
  methods: {
    onScroll: function(amountChanged) {
      const _this = this;
      if (amountChanged !== 0) {
        // Firstly reapply the scaling straight away so the imgTop gets an accurate reading
        _this.mediaElem.style.transform += ` scale(${_this.scale})`;

        // We now need get the distance between the stickyElement and the actual mediaElem and ensure there is no space between them (So the mediaElem always "starts" from the stickyElem)
        let parallaxScrollTop = _this.stickyElement.getBoundingClientRect().top;
        let imgTop = _this.mediaElem.getBoundingClientRect().top;
        let thisElemTop = _this.$el.getBoundingClientRect().top;
        let transformProperty = 0;
        if (parallaxScrollTop < thisElemTop) {
          transformProperty += thisElemTop - parallaxScrollTop;
        }
        // This is the formula the q-parallax uses to get the translate3d
        transformProperty = (transformProperty + _this.mediaElem.height - _this.height) * amountChanged;
        let offset = transformProperty - (imgTop - parallaxScrollTop);
        _this.translate3dStyle = `-50%, ${offset}px, 0px`;
      }
    },
  },
};
</script>
<style scoped>
.sticky-parallax-media-container:deep(> *) {
  position: fixed;
  pointer-events: none;
}
</style>
