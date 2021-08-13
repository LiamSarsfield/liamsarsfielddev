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
  mounted() {
    let _this = this;
    // Get the actual DOM element of the scrollTarget
    _this.stickyElement = _this.$el.closest(_this.scrollTarget);
    _this.mediaElem = _this.$refs.parallaxMedia.media;
    _this.mediaElem.style.transform += ` scale(${_this.scale})`;
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
      return `translate3d(${this.translate3dStyle}) scale(${this.scale})`;
    },
  },
  watch: {
    // From the computed property, if either the translate or the scale changes, update the transform
    transformStyle(newValue) {
      this.mediaElem.style.transform = newValue;
    },
  },
  methods: {
    /**
     * When we scroll, the transform property is reset. We need to update it to our own custom properties
     * @param percentage
     */
    onScroll: async function(percentage) {
      let _this = this;
      if (percentage !== 0) {
        // Firstly reapply the scaling straight away so the imgTop gets an accurate reading
        _this.mediaElem.style.transform += ` scale(${_this.scale})`;

        // We now need get the distance between the stickyElement and the actual mediaElem and ensure there is no space between them (So the mediaElem always "starts" from the stickyElem)
        let parallaxScrollTop = _this.stickyElement.getBoundingClientRect().top;
        let imgTop = _this.mediaElem.getBoundingClientRect().top;
        let thisElemTop = _this.$el.getBoundingClientRect().top;
        // This is the formula the q-parallax uses to get the translate3d
        let transformProperty = 0;
        if (parallaxScrollTop < thisElemTop) {
          transformProperty += thisElemTop - parallaxScrollTop;
        }
        transformProperty = (transformProperty + _this.mediaElem.height - _this.height) * percentage;
        let offset = transformProperty - (imgTop - parallaxScrollTop);
        _this.translate3dStyle = `-50%, ${offset}px, 0px`;
      }
    },
  },
};
</script>
