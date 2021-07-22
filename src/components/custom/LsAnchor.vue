<template>
  <a :class="computedClass" @click="$emit('click', $event)">
    <slot/>
    <span v-if="hasUnderline" :class="computedUnderlineClass"></span>
  </a>
</template>

<script>
export default {
  name: 'LsAnchor',
  props: {
    /** START: anchor props */
    className: {
      value: String,
      default: () => '',
    },
    /** END: anchor props */
    //
    underlineGradient: {
      value: Array,
      default: () => [],
    },
    underlineTransition: {
      value: Boolean,
      default: () => true,
    },
    underlineTransitionDuration: {
      value: Number,
      default: () => 500,
    },
  },
  data: () => ({}),
  computed: {
    computedClass() {
      let _this = this;
      let parsedClass = _this.className;
      if (_this.hasUnderline) {
        parsedClass += ' tw-group tw-relative';
        parsedClass += (_this.underlineTransition) ? ' tw-transition' : '';
      }
      return parsedClass;
    },
    hasUnderline() {
      return (this.underlineGradient.length > 1);
    },
    computedUnderlineClass() {
      let _this = this;
      // The basic classes, that will always be used to achieve the animation
      let parsedUnderlineClass = 'tw-w-0 tw-h-[1px] group-hover:tw-w-full tw-absolute tw-inset-0';
      if (_this.hasUnderline) {
        // If underline gradients were passed, add the gradient class and append everyone to the parsedUnderlineClass
        parsedUnderlineClass += ' tw-bg-gradient-to-r ';
        parsedUnderlineClass += _this.underlineGradient.join(' ');
      }
      parsedUnderlineClass += (_this.underlineTransition) ? ` tw-ease-in-out tw-transition-bg-width tw-duration-${_this.underlineTransitionDuration}` : '';

      return parsedUnderlineClass;
    },
  },
};
</script>
