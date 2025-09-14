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
            <div class="q-mb-md">
              <div class="row items-center q-gutter-sm q-mb-sm">
                <div class="text-subtitle2">Filter by tags</div>
                <q-space />
                <q-btn
                  dense
                  outline
                  color="secondary"
                  :label="allSelected ? 'Clear all' : 'Select all'"
                  @click="toggleSelectAll()"
                />
              </div>
              <div class="row q-col-gutter-sm">
                <q-chip
                  v-for="(tag, key) in timeline.tags"
                  :key="key"
                  clickable
                  :outline="!selectedTagsSet.has(key)"
                  :color="selectedTagsSet.has(key) ? 'primary' : void 0"
                  @click="toggleTag(key)"
                >
                  <q-icon v-if="tag.icon" :name="tag.icon" class="q-mr-xs" />
                  {{ tag.label }}
                </q-chip>
              </div>
            </div>

            <LsTimeline
              :tags="timeline.tags"
              :selected-tags="selectedTags"
              :timestamps="timestamps"
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
import LsTimeline from 'components/custom/LsTimeline.vue'
import { computed, ref } from 'vue'
import { date } from 'quasar'

const timeline = {
  tags: {
    work: { label: 'Work', icon: 'work_outline' },
    cloud: { label: 'Cloud', icon: 'cloud' },
    product: { label: 'Product', icon: 'settings' },
    html: { label: 'HTML', icon: 'fab fa-html5' },
    css: { label: 'CSS', icon: 'fab fa-css3-alt' },
    javascript: { label: 'JavaScript', icon: 'fab fa-js' },
    jquery: { label: 'jQuery', icon: 'fab fa-js-square' },
    vuejs: { label: 'Vue.js', icon: 'fab fa-vuejs' },
    react: { label: 'React', icon: 'fab fa-react' },
    nodeJS: { label: 'NodeJS', icon: 'fab fa-node' },
    php: { label: 'PHP', icon: 'fab fa-php' },
    laravel: { label: 'Laravel', icon: 'fab fa-laravel' },
    codeigniter: { label: 'CodeIgniter', icon: 'code' },
    mysql: { label: 'MySQL', icon: 'fas fa-database' },
    java: { label: 'Java', icon: 'fab fa-java' },
    golang: { label: 'Go', icon: 'fa-brands fa-golang' },
  },
  timelineEvents: {
    wpeSenior: {
      label: 'Senior Software Engineer · WPEngine',
      tags: ['work', 'cloud', 'product', 'react', 'golang', 'php', 'html', 'css', 'javascript'],
      plot: { from: { value: 2021, month: 1 }, to: { value: 'now' } },
      tooltip: { label: 'Senior Software Engineer at WPEngine' },
      borderColour: 'white',
    },
    wpe: {
      label: 'Software Engineer · WPEngine',
      tags: ['work', 'react', 'golang', 'php', 'html', 'css', 'javascript'],
      plot: { from: { value: 2018, month: 6 }, to: { value: 2021, month: 1 } },
      tooltip: { label: 'Software Engineer at WPEngine' },
      borderColour: 'white',
    },
    mtx: {
      label: 'Software Engineer · Mackessy Technology',
      tags: ['work', 'html', 'javascript', 'jquery', 'vuejs', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2020, month: 4 }, to: { value: 2022, month: 4 } },
      tooltip: { label: 'Mackessy Technology' },
      borderColour: 'white',
    },
    courseco: {
      label: 'Full Stack Web Developer · CourseCo',
      tags: ['work', 'html', 'javascript', 'jquery', 'css', 'php', 'mysql'],
      plot: { from: { value: 2019, month: 3 }, to: { value: 2020, month: 3 } },
      tooltip: { label: 'CourseCo - IdeaBubble' },
      borderColour: 'white',
    },
    internetSystemsDevelopment: {
      label: 'B.S. in Internet Systems Development',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'java', 'mysql'],
      plot: { from: { value: 2016, month: 4 }, to: { value: 2019, month: 8 } },
      tooltip: { label: 'Limerick Institute Of Technology' },
      borderColour: 'white',
    },
    groupProject: {
      label: 'Group Project',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'mysql'],
      plot: { from: { value: 2018, month: 10 }, to: { value: 2019, month: 5 } },
      tooltip: { label: 'Group Project With My Course' },
      borderColour: 'white',
    },
    checkersBot: {
      label: 'Discord Checkers Bot',
      tags: ['javascript', 'nodeJS'],
      plot: { from: { value: 2019, month: 8 }, to: { value: 2020, month: 3 } },
      tooltip: { label: 'Discord Checkers Bot' },
      borderColour: 'white',
    },
    auxion: {
      label: 'auxion.net',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2020, month: 9 }, to: { value: 2021, month: 3 } },
      tooltip: { label: 'Brochure Website' },
      borderColour: 'white',
    },
    claimlink: {
      label: 'claimlink.net',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2021, month: 4 }, to: { value: 2021, month: 9 } },
      tooltip: { label: 'Brochure Website' },
      borderColour: 'white',
    },
    liamsarsfield: {
      label: 'liamsarsfield.dev',
      tags: ['html', 'javascript', 'vuejs', 'css'],
      plot: { from: { value: 2021, month: 10 }, to: { value: 2022, month: 3 } },
      tooltip: { label: 'This Website :)' },
      borderColour: 'white',
    },
  },
}

// Selected tags (default to all)
const selectedTags = ref(Object.keys(timeline.tags))
const selectedTagsSet = computed(() => new Set(selectedTags.value))
const allSelected = computed(() => selectedTags.value.length === Object.keys(timeline.tags).length)

function toggleTag(key) {
  const idx = selectedTags.value.indexOf(key)
  if (idx >= 0) selectedTags.value = selectedTags.value.filter((k) => k !== key)
  else selectedTags.value = [...selectedTags.value, key]
}

function toggleSelectAll() {
  selectedTags.value = allSelected.value ? [] : Object.keys(timeline.tags)
}

// Derive timestamps from min/max of events
const timestamps = computed(() => {
  const years = []
  Object.values(timeline.timelineEvents).forEach((ev) => {
    years.push(Number(ev.plot.from.value))
    if (ev.plot.to.value === 'now') years.push(new Date().getFullYear())
    else years.push(Number(ev.plot.to.value))
  })
  const minY = Math.min(...years)
  const maxY = Math.max(...years)
  const arr = []
  for (let y = minY; y <= maxY; y++) arr.push(y)
  return arr
})

const timelineDates = computed(() => {
  const res = {}
  for (const key of Object.keys(timeline.timelineEvents)) {
    const ev = timeline.timelineEvents[key]
    const from = new Date(ev.plot.from.value, (ev.plot.from.month || 1) - 1)
    const to =
      ev.plot.to.value === 'now'
        ? new Date()
        : new Date(
            ev.plot.to.value,
            ev.plot.to && ev.plot.to.month ? ev.plot.to.month - 1 : 11,
            31,
          )
    const months = date.getDateDiff(to, from, 'months') + 1
    const years = Math.floor(months / 12)
    const remMonths = months % 12
    res[key] = {
      from: date.formatDate(from, 'MMM YYYY'),
      to: ev.plot.to.value === 'now' ? 'Present' : date.formatDate(to, 'MMM YYYY'),
      duration: `${years ? years + 'y ' : ''}${remMonths ? remMonths + 'm' : ''}`.trim(),
    }
  }
  return res
})
</script>

<style scoped></style>
