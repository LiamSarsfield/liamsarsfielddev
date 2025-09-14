<template>
  <q-page class="row justify-center q-pa-md">
    <q-card class="col-12 col-sm-10 col-md-8 bg-primary text-white">
      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="code" />
            </q-item-section>
            <q-item-section class="text-h6">About Me</q-item-section>
          </template>
          <div class="q-pa-md">
            <p class="q-mb-sm text-body1">
              Hi, I'm Liam — a software engineer with experience across frontend and backend.
            </p>
            <p class="text-body2 q-mb-none">
              This section will be expanded with more details shortly.
            </p>
          </div>
        </q-expansion-item>
      </q-card-section>

      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="timeline" />
            </q-item-section>
            <q-item-section class="text-h6">Experience</q-item-section>
          </template>
          <div class="q-pa-md">
            <LsTimeline
              :tags="timeline.tags"
              :selected-tags="timeline.selectedTags"
              :timestamps="timeline.timestamps"
              :timeline-events="timeline.timelineEvents"
            >
              <template #timelineEventTooltipContent="{ identifier }">
                <q-list dense separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">
                        {{ timeline.timelineEvents[identifier].tooltip.label }}
                      </q-item-label>
                      <q-item-label caption>
                        {{ timelineDates[identifier].from }} to {{ timelineDates[identifier].to }}
                        <span class="text-italic"> ({{ timelineDates[identifier].duration }})</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>
            </LsTimeline>
          </div>
        </q-expansion-item>
      </q-card-section>

      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="integration_instructions" />
            </q-item-section>
            <q-item-section class="text-h6">Side Projects</q-item-section>
          </template>
          <div class="q-pa-md">
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-subtitle2">liamsarsfield.dev</div>
                <div class="text-caption">Personal website</div>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item>
                  <q-item-section>
                    Originally written in Vue 2 and migrated to Vue 3.
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> Uses Quasar Framework. </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Hosted on Google Cloud using Google Kubernetes Engine.
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// No Tailwind; using Quasar grid/utilities and components
import LsTimeline from 'components/custom/LsTimeline.vue';
import { computed } from 'vue';
import { date } from 'quasar';

const timeline = {
  tags: {
    work: { label: 'Work', icon: 'work_outline' },
    cloud: { label: 'Cloud', icon: 'cloud' },
    product: { label: 'Product', icon: 'settings' },
  },
  selectedTags: ['work', 'cloud', 'product'],
  timestamps: [2018, 2019, 2020, 2021, 2022, 2023, new Date().getFullYear()],
  timelineEvents: {
    wpeSenior: {
      label: 'Senior Software Engineer · WPEngine',
      tags: ['work', 'cloud', 'product'],
      plot: {
        from: { value: 2021, month: 1 },
        to: { value: 'now' },
      },
      tooltip: {
        label: 'Senior Software Engineer at WPEngine',
      },
      borderColour: 'white',
    },
    wpe: {
      label: 'Software Engineer · WPEngine',
      tags: ['work'],
      plot: {
        from: { value: 2018, month: 6 },
        to: { value: 2021, month: 1 },
      },
      tooltip: {
        label: 'Software Engineer at WPEngine',
      },
      borderColour: 'white',
    },
  },
};

const timelineDates = computed(() => {
  const res = {};
  for (const key of Object.keys(timeline.timelineEvents)) {
    const ev = timeline.timelineEvents[key];
    const from = new Date(ev.plot.from.value, (ev.plot.from.month || 1) - 1);
    const to =
      ev.plot.to.value === 'now'
        ? new Date()
        : new Date(
            ev.plot.to.value,
            ev.plot.to && ev.plot.to.month ? ev.plot.to.month - 1 : 11,
            31,
          );
    const months = date.getDateDiff(to, from, 'months') + 1;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    res[key] = {
      from: date.formatDate(from, 'MMM YYYY'),
      to: ev.plot.to.value === 'now' ? 'Present' : date.formatDate(to, 'MMM YYYY'),
      duration: `${years ? years + 'y ' : ''}${remMonths ? remMonths + 'm' : ''}`.trim(),
    };
  }
  return res;
});
</script>

<style scoped></style>
