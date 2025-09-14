<template>
  <q-page class="row justify-center q-pa-md">
    <q-card class="col-12 col-sm-10 col-md-8 col-lg-6">
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Responsive Demo</div>
        <q-badge color="primary" outline>
          {{ $q.screen.name }} ({{ $q.screen.width }}px)
        </q-badge>
      </q-card-section>

      <q-separator />

      <q-card-section :class="$q.screen.lt.md ? 'q-pa-md' : 'q-pa-xl'">
        <div class="text-body1 q-mb-md">
          This section changes padding based on breakpoint using
          <code>$q.screen.lt.md</code>.
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-xs">Shown on all sizes</div>
              <div class="text-caption text-grey-7">
                Uses Quasar grid for responsive columns.
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-xs">Conditional visibility</div>
              <div class="text-caption text-grey-7">
                <span v-show="$q.screen.gt.md">Only visible on ≥ md (≥ 1440px)</span>
                <span v-show="$q.screen.lt.md">Only visible on &lt; md (&lt; 1440px)</span>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>

      
    </q-card>
  </q-page>
  
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
// Access $q in template via provide/inject; importing here clarifies usage
// and ensures tree-shaking keeps the plugin.
const $q = useQuasar();
</script>

<style scoped>
</style>
