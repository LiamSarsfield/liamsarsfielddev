<template>
  <q-item :style="mergedStyles" :class="mergedClasses" dense clickable v-ripple>
    <q-item-section clickable v-ripple>
      <span class="ellipsis full-width">{{ label }}</span>
    </q-item-section>
    <slot name="tooltip">
      <q-menu fit v-model="menuExpanded">
        <slot name="tooltipHeader" :menuExpanded="menuExpanded" :identifier="identifier">
          <q-bar dense class="q-px-none">
            <span class="menu-header-line ellipsis">{{ label }}</span>
            <q-btn flat icon="close" @click="menuExpanded = false" />
          </q-bar>
        </slot>
        <q-item class="q-pb-none">
          <q-item-section>
            <slot name="tooltipContent" :menuExpanded="menuExpanded" :identifier="identifier" />
          </q-item-section>
        </q-item>
      </q-menu>
    </slot>
  </q-item>
</template>

<script>
export default {
  name: 'LsTimelineEvent',
  props: {
    identifier: { type: String, required: true },
    label: { type: String, required: true },
    classes: { type: Object, default: () => ({}) },
    styles: { type: Object, default: () => ({}) },
    borderColour: { type: String }, // expects a Quasar color name, e.g. 'primary', 'secondary', 'white'
  },
  data() {
    return {
      menuExpanded: false,
    }
  },
  computed: {
    mergedClasses() {
      // Base text sizing and truncation
      const base = {
        'text-body2': true,
        'q-px-xs': true,
      }
      return { ...base, ...this.classes }
    },
    mergedStyles() {
      const styles = { ...this.styles }
      if (this.borderColour) {
        styles['border-bottom-width'] = '2px'
        styles['border-bottom-style'] = 'solid'
        // Use Quasar CSS variable if available
        const varName = `--q-color-${this.borderColour}`
        styles['border-bottom-color'] = `var(${varName}, currentColor)`
      }
      return styles
    },
  },
}
</script>

<style scoped>
.menu-header-line {
  border-bottom: 2px solid currentColor;
  padding-left: 8px;
  display: inline-block;
  width: 100%;
}
</style>

