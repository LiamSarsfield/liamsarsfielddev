<template>
  <q-item
    :style="stylesParsed"
    :class="classesParsed"
    dense
    clickable
    v-ripple
    @click.stop="menuExpanded = !menuExpanded"
  >
    <q-item-section clickable v-ripple>
      <span class="ellipsis full-width">{{ label }}</span>
    </q-item-section>
    <slot name="tooltip">
      <q-menu fit no-parent-event v-model="menuExpanded">
        <slot name="tooltipHeader" :menuExpanded="menuExpanded" :identifier="identifier">
          <q-bar dense class="q-px-none">
            <span class="menu-header-line ellipsis">{{ label }}</span>
            <q-btn flat icon="close" @click="menuExpanded = false" />
          </q-bar>
        </slot>
        <q-item class="q-px-none">
          <q-item-section>
            <slot name="tooltipContent" :menuExpanded="menuExpanded" :identifier="identifier" />
          </q-item-section>
        </q-item>
      </q-menu>
    </slot>
  </q-item>
</template>

<script setup>
import { computed, ref } from 'vue';

defineOptions({
  name: 'LsTimelineEvent',
});

const props = defineProps({
  identifier: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  classes: {
    type: Object,
    default: () => ({}),
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
  borderColour: {
    type: String,
  },
});

const menuExpanded = ref(false);

const classDefaults = {
  'text-body2': true,
  'q-px-xs': true,
};

const classesParsed = computed(() => {
  return { ...classDefaults, ...props.classes };
});

const stylesParsed = computed(() => {
  const mergedStyles = { ...props.styles };

  if (props.borderColour) {
    mergedStyles['border-bottom-width'] = '2px';
    mergedStyles['border-bottom-style'] = 'solid';
    mergedStyles['border-bottom-color'] = `var(--q-color-${props.borderColour}, currentColor)`;
  }

  return mergedStyles;
});
</script>

<style scoped>
.menu-header-line {
  border-bottom: 2px solid currentColor;
  padding-left: 8px;
  display: inline-block;
  width: 100%;
}
</style>
