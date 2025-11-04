<template>
  <a
    :class="computedClass"
    :href="href || ''"
    rel="noopener"
    :target="newTab ? '_self' : href ? '_blank' : ''"
    @click="handleClick"
  >
    <slot />
    <span v-if="hasUnderline" :class="underlineClass" :style="underlineStyle"></span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'LsAnchor',
});

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  newTab: {
    type: Boolean,
    default: false,
  },
  underlineGradient: {
    type: Array as () => string[],
    default: () => [],
  },
  underlineTransition: {
    type: Boolean,
    default: true,
  },
  underlineTransitionDuration: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits<{
  (event: 'anchorClick', payload: MouseEvent): void;
}>();

const hasUnderline = computed(() => props.underlineGradient.length > 0);

const computedClass = computed(() => {
  const classes = ['ls-anchor'];
  if (props.className) {
    classes.push(props.className);
  }
  if (hasUnderline.value) {
    classes.push('ls-anchor--underline');
  }
  if (props.underlineTransition) {
    classes.push('ls-anchor--transition');
  }
  return classes;
});

const underlineClass = computed(() => ['ls-anchor__underline']);

const underlineStyle = computed(() => {
  const style: Record<string, string> = {
    transitionDuration: props.underlineTransition
      ? `${props.underlineTransitionDuration}ms`
      : '0ms',
  };

  if (props.underlineGradient.length > 0) {
    style.backgroundImage = `linear-gradient(to right, ${props.underlineGradient.join(', ')})`;
  } else {
    style.backgroundColor = 'currentColor';
  }

  return style;
});

function handleClick(event: MouseEvent) {
  if (!props.href) {
    event.preventDefault();
  }

  emit('anchorClick', event);
}
</script>

<style scoped lang="scss">
.ls-anchor {
  color: inherit;
  text-decoration: none;

  &--underline {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  &--transition .ls-anchor__underline {
    transition-property: width, background-image;
    transition-timing-function: ease-in-out;
  }

  &:hover .ls-anchor__underline,
  &:focus-visible .ls-anchor__underline {
    width: 100%;
  }
}

.ls-anchor__underline {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition-property: none;
}
</style>
