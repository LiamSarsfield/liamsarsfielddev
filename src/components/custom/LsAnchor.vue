<template>
  <a :class="computedClass"
     :href="href || null"
     ref="noopener"
     :target="newTab ? '_self' : href ? '_blank' : null"
     @click="onClick($event)"
  >
    <slot/>
    <span v-if="hasUnderline" :class="computedUnderlineClass"></span>
  </a>
</template>

<script>
export default {
  name: 'LsAnchor',
  props: {
    /** START: anchor props */
    // Cannot use prop name class in JSX as is reserved attribute
    className: {
      value: String,
      default: () => '',
    },
    href: {
      value: String,
      default: () => '',
    },
    newTab: {
      value: Boolean,
      default: () => false,
    },
    /** END: anchor props */
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
      const _this = this;
      let parsedClass = _this.className;
      if (_this.hasUnderline) {
        parsedClass += ' tw-group tw-relative';
        parsedClass += (_this.underlineTransition) ? ' tw-transition' : '';
      }
      // For now, we assume every anchor has a text-decoration of no underline/default. To overwrite the rule we can mark the text-decoration as important
      parsedClass += ' tw-no-underline';
      return parsedClass;
    },
    hasUnderline() {
      return (this.underlineGradient.length > 1);
    },
    computedUnderlineClass() {
      const _this = this;
      // The basic classes, that will always be used to achieve the animation
      let parsedUnderlineClass = 'tw-w-0 tw-h-[1px] group-hover:tw-w-full tw-absolute tw-bottom-0 tw-left-0';
      if (_this.hasUnderline) {
        // If underline gradients were passed, add the gradient class and append everyone to the parsedUnderlineClass
        parsedUnderlineClass += ' tw-bg-gradient-to-r ';
        parsedUnderlineClass += _this.underlineGradient.join(' ');
      }
      parsedUnderlineClass += (_this.underlineTransition) ? ` tw-ease-in-out tw-transition-bg-width tw-duration-${_this.underlineTransitionDuration}` : '';

      return parsedUnderlineClass;
    },
  },
  methods: {
    onClick($event) {
      if (!this.href) {
        $event.preventDefault();
      }
      this.$emit('anchorClick', $event);
    },
  },
};
</script>
