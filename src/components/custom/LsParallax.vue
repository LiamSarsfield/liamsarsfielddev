<template>
  <q-parallax :height="height" @scroll="onScroll" ref="parallaxMedia" :scroll-target="scrollTarget">
    <template>
      <slot />
    </template>
    <template v-slot:media>
      <slot name="media" />
    </template>
  </q-parallax>
</template>

<script setup>
import { computed, onMounted, ref, watch, useSlots } from 'vue';

defineOptions({
  name: 'LsParallax',
});

const props = defineProps({
  height: {
    type: Number,
    default: 500,
  },
  scrollTarget: {
    type: String,
    default: '.parallax-scroll-target',
  },
  scale: {
    type: String,
    default: '1',
  },
});

const slots = useSlots();

const parallaxMedia = ref(null);
const translate3dStyle = ref('');
const mediaElem = ref(null);
const stickyElement = ref(null);

const getRootElement = () => {
  const target = parallaxMedia.value;
  if (!target) {
    return null;
  }
  if (target instanceof Element) {
    return target;
  }
  if ('$el' in target && target.$el instanceof Element) {
    return target.$el;
  }
  return null;
};

const transformStyle = computed(() => {
  let transform = translate3dStyle.value ? `translate3d(${translate3dStyle.value})` : '';
  transform += props.scale ? `scale(${props.scale})` : '';
  return transform;
});

watch(
  transformStyle,
  (newValue) => {
    if (mediaElem.value) {
      mediaElem.value.style.transform = newValue;
    }
  },
  { immediate: true },
);

onMounted(() => {
  const root = getRootElement();
  stickyElement.value = root?.closest?.(props.scrollTarget) ?? null;

  const mediaSlot = slots.media?.()[0];
  mediaElem.value = mediaSlot && 'el' in mediaSlot ? mediaSlot.el : null;

  if (mediaElem.value) {
    mediaElem.value.style.transform = transformStyle.value;
  }
});

const onScroll = (amountChanged) => {
  if (amountChanged === 0 || !mediaElem.value) {
    return;
  }

  mediaElem.value.style.transform += ` scale(${props.scale})`;

  const root = getRootElement();
  const sticky = stickyElement.value;
  if (!root || !sticky) {
    return;
  }

  const parallaxScrollTop = sticky.getBoundingClientRect().top;
  const imgTop = mediaElem.value.getBoundingClientRect().top;
  const thisElemTop = root.getBoundingClientRect().top;
  let transformProperty = 0;

  if (parallaxScrollTop < thisElemTop) {
    transformProperty += thisElemTop - parallaxScrollTop;
  }

  transformProperty = (transformProperty + mediaElem.value.height - props.height) * amountChanged;
  const offset = transformProperty - (imgTop - parallaxScrollTop);
  translate3dStyle.value = `-50%, ${offset}px, 0px`;
};
</script>
<style scoped>
.sticky-parallax-media-container:deep(> *) {
  position: fixed;
  pointer-events: none;
}
</style>
