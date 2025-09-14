<template>
  <q-card flat class="q-pa-none q-mt-none">
    <q-card-section horizontal class="q-px-md q-py-sm items-center justify-between">
      <q-card-section class="q-py-none">
        <div class="text-h6">{{ title }}</div>
        <div v-if="subtitle" class="text-caption">{{ subtitle }}</div>
      </q-card-section>
      <q-card-section v-if="from || to || duration || $slots['header-extra']" horizontal>
        <slot name="header-extra">
          <q-icon class="q-mr-md q-my-auto" name="schedule" size="xs" />
          <div>
            <div v-if="from || to" class="row items-center">
              <span>{{ from }}</span>
              <span class="q-mx-xs">to</span>
              <span>{{ to }}</span>
            </div>
            <span v-if="duration" class="row text-caption">{{ duration }}</span>
          </div>
        </slot>
      </q-card-section>
    </q-card-section>

    <q-list v-if="bullets && bullets.length" dense bordered separator class="q-px-md">
      <q-item v-for="(b, i) in bullets" :key="i">
        <q-item-section>{{ b }}</q-item-section>
      </q-item>
    </q-list>
    <slot v-else />

    <q-card-section v-if="tags && tags.length" class="q-py-sm">
      <q-chip
        v-for="key in tags"
        :key="key"
        :outline="!(selectedKeys && selectedKeys.includes(key))"
        :color="selectedKeys && selectedKeys.includes(key) ? 'primary' : void 0"
        clickable
        square
        @click="$emit('toggle', key)"
      >
        <q-icon
          v-if="tagMeta && tagMeta[key] && tagMeta[key].icon"
          :name="tagMeta[key].icon"
          class="q-mr-sm"
        />
        {{ (tagMeta && tagMeta[key] && tagMeta[key].label) || key }}
      </q-chip>
    </q-card-section>

    <q-separator v-if="$slots.actions" />
    <q-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  from: { type: String, default: '' },
  to: { type: String, default: '' },
  duration: { type: String, default: '' },
  bullets: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] },
  tagMeta: { type: Object, default: () => ({}) },
  selectedKeys: { type: Array, default: () => [] },
});

defineEmits(['toggle']);
</script>

<style scoped lang="scss">
.q-card {
  &__section {
    .q-chip {
      min-width: 7.5rem;
    }
  }
}
</style>
