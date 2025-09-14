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

      <!-- Timeline (separate from Experience) -->
      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="las la-stream" />
            </q-item-section>
            <q-item-section class="text-h6">Timeline</q-item-section>
          </template>
          <div class="q-pa-md">
            <LsTimeline
              :tags="timeline.tags"
              :selected-tags="selectedTags"
              :timestamps="timestamps"
              :timeline-events="timeline.timelineEvents"
            >
              <template #timelineEventTooltipContent="{ identifier }">
                <q-list dark separator dense>
                  <q-item class="q-mb-sm">
                    <q-item-section>
                      <q-item-label>{{
                        timeline.timelineEvents[identifier].tooltip.label
                      }}</q-item-label>
                      <q-item-label caption class="row items-center">
                        <q-icon name="schedule" class="q-mr-xs" />
                        {{ timelineDates[identifier].from }} to {{ timelineDates[identifier].to }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    v-for="tag in timeline.timelineEvents[identifier].tags"
                    :key="tag"
                    dense
                    clickable
                    bordered
                  >
                    <q-item-section v-if="timeline.tags[tag] && timeline.tags[tag].icon" avatar>
                      <q-icon :name="timeline.tags[tag].icon" />
                    </q-item-section>
                    <q-item-section>
                      {{ timeline.tags[tag] ? timeline.tags[tag].label : tag }}
                    </q-item-section>
                  </q-item>
                  <q-item
                    v-if="
                      timeline.timelineEvents[identifier].tooltip.github ||
                      timeline.timelineEvents[identifier].tooltip.link
                    "
                    class="justify-end q-py-xs"
                  >
                    <q-item-section
                      v-if="timeline.timelineEvents[identifier].tooltip.github"
                      thumbnail
                      class="q-pr-sm"
                    >
                      <q-btn
                        flat
                        color="tertiary"
                        round
                        icon="lab la-github"
                        type="a"
                        :href="timeline.timelineEvents[identifier].tooltip.github"
                        target="_blank"
                        size="md"
                      />
                    </q-item-section>
                    <q-item-section
                      v-if="timeline.timelineEvents[identifier].tooltip.link"
                      thumbnail
                    >
                      <q-btn
                        flat
                        color="tertiary"
                        round
                        icon="launch"
                        type="a"
                        :href="timeline.timelineEvents[identifier].tooltip.link"
                        target="_blank"
                        size="md"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>
            </LsTimeline>
          </div>
        </q-expansion-item>
      </q-card-section>

      <q-card-section>
        <q-expansion-item
          expand-separator
          icon="las la-stream"
          label="Experience"
          default-opened
          header-class="bg-black text-white text-h6"
        >
          <!-- Left: Work Experience, Education, Side Projects -->
          <q-card>
            <q-card-section horizontal>
              <q-card-section class="col-12 col-md-8">
                <q-list class="col q-gutter-md">
                  <!-- Work Experience -->
                  <q-expansion-item
                    default-opened
                    icon="work_outline"
                    label="Work Experience"
                    header-class="bg-black text-white"
                    class="q-gap-sm"
                  >
                    <div class="col q-gutter-sm">
                      <q-separator />
                      <!-- WPE Senior -->
                      <q-card
                        v-show="hasAnyTag(timeline.timelineEvents.wpeSenior.tags)"
                        flat
                        class="q-pa-none q-mt-none"
                      >
                        <q-card-section
                          horizontal
                          header
                          class="q-px-md q-py-sm items-center justify-between"
                        >
                          <q-card-section class="q-py-none">
                            <div class="text-h6">Senior Software Engineer</div>
                            <div class="text-caption">WP Engine</div>
                          </q-card-section>
                          <q-card-section horizontal>
                            <q-icon class="q-mr-md q-my-auto" name="schedule" size="xs" />
                            <div>
                              <div class="row items-center">
                                {{ timelineDates.wpeSenior.from }} to
                                {{ timelineDates.wpeSenior.to }}
                              </div>
                              <span class="row text-caption">
                                ({{ timelineDates.wpeSenior.duration }})
                              </span>
                            </div>
                          </q-card-section>
                        </q-card-section>
                        <q-list dense bordered separator class="q-px-md">
                          <q-item>
                            <q-item-section>
                              Working with HTML, CSS, TypeScript/JavaScript, React, Go, PHP,
                              PostgreSQL.
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              Experience with integrating Google Cloud Platform's suite of
                              infrastructure tools within microservices such as Pub/Sub, Google
                              Kubernetes Engine(GKE), Google BigQuery, and Google Cloud Tracing
                              using Terraform.
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              Lead Product initiatives from conception to implementation, entailing
                              deep integration with Stripe's payment platform and WooCommerce
                              Payment Gateway development.
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              Took on the role of Agile Advocate for a newly formed team where I
                              earned my Certified ScrumMaster certificate. I was responsible for
                              guiding the team to ensure we adhered to Agile best practices, and
                              helped guide the team to transition from Scrum to Kanban.
                            </q-item-section>
                          </q-item>
                        </q-list>
                        <q-card-section class="q-py-sm">
                          <q-chip
                            v-for="tag in timeline.timelineEvents.wpe.tags"
                            :key="tag"
                            :outline="!selectedTagsSet.has(tag)"
                            :color="selectedTagsSet.has(tag) ? 'primary' : void 0"
                            clickable
                            @click="toggleTag(tag)"
                          >
                            <q-icon
                              v-if="timeline.tags[tag].icon"
                              :name="timeline.tags[tag].icon"
                              class="q-mr-xs"
                            />
                            {{ timeline.tags[tag].label }}
                          </q-chip>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-expansion-item>

                  <q-expansion-item
                    default-opened
                    icon="school"
                    label="Education"
                    header-class="bg-black text-white"
                    class="q-gap-sm"
                  >
                    <div class="col q-gutter-sm">
                      <q-separator />
                      <q-card
                        v-show="hasAnyTag(timeline.timelineEvents.internetSystemsDevelopment.tags)"
                        flat
                        class="q-pa-none q-mt-none"
                      >
                        <q-card-section
                          horizontal
                          header
                          class="q-px-md q-py-sm items-center justify-between"
                        >
                          <q-card-section class="q-py-none">
                            <div class="text-h6">Internet Systems Development</div>
                            <div class="text-caption">Limerick Institute Of Technology</div>
                          </q-card-section>
                          <q-card-section horizontal>
                            <q-icon class="q-mr-md q-my-auto" name="schedule" size="xs" />
                            <div>
                              <div class="row items-center">
                                {{ timelineDates.internetSystemsDevelopment.from }} to
                                {{ timelineDates.internetSystemsDevelopment.to }}
                              </div>
                              <span class="row text-caption">
                                ({{ timelineDates.internetSystemsDevelopment.duration }})
                              </span>
                            </div>
                          </q-card-section>
                        </q-card-section>
                        <q-list dense bordered separator class="q-px-md">
                          <q-item>
                            <q-item-section> Passed with Distinction (70% GPA). </q-item-section>
                          </q-item>
                        </q-list>
                        <q-card-section class="q-py-sm">
                          <q-chip
                            v-for="tag in timeline.timelineEvents.internetSystemsDevelopment.tags"
                            :key="tag"
                            :outline="!selectedTagsSet.has(tag)"
                            :color="selectedTagsSet.has(tag) ? 'primary' : void 0"
                            clickable
                            @click="toggleTag(tag)"
                          >
                            <q-icon
                              v-if="timeline.tags[tag].icon"
                              :name="timeline.tags[tag].icon"
                              class="q-mr-xs"
                            />
                            {{ timeline.tags[tag].label }}
                          </q-chip>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-expansion-item>

                  <q-expansion-item
                    default-opened
                    icon="integration_instructions"
                    label="Side Projects"
                    header-class="bg-black text-white"
                    class="q-gap-sm"
                  >
                    <div class="col q-gutter-sm">
                      <q-separator />
                      <q-card
                        v-show="hasAnyTag(timeline.timelineEvents.liamsarsfield.tags)"
                        flat
                        class="q-pa-none q-mt-none"
                      >
                        <q-card-section
                          horizontal
                          header
                          class="q-px-md q-py-sm items-center justify-between"
                        >
                          <q-card-section class="q-py-none">
                            <div class="text-h6">liamsarsfield.dev</div>
                            <div class="text-caption">This Website :)</div>
                          </q-card-section>
                          <q-card-section horizontal>
                            <q-icon class="q-mr-md q-my-auto" name="schedule" size="xs" />
                            <div>
                              <div class="row items-center">
                                {{ timelineDates.liamsarsfield.from }} to
                                {{ timelineDates.liamsarsfield.to }}
                              </div>
                              <span class="row text-caption">
                                ({{ timelineDates.liamsarsfield.duration }})
                              </span>
                            </div>
                          </q-card-section>
                        </q-card-section>
                        <q-list dense bordered separator class="q-px-md">
                          <q-item>
                            <q-item-section>
                              Personal website which was originally written in Vue 2 and then
                              migrated to Vue 3.
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section> Uses Vue's Quasar Framework. </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              Hosted using in Google Cloud using Google Kubernetes Engine.
                            </q-item-section>
                          </q-item>
                        </q-list>
                        <q-card-section class="q-py-sm">
                          <q-chip
                            v-for="tag in timeline.timelineEvents.internetSystemsDevelopment.tags"
                            :key="tag"
                            :outline="!selectedTagsSet.has(tag)"
                            :color="selectedTagsSet.has(tag) ? 'primary' : void 0"
                            clickable
                            @click="toggleTag(tag)"
                          >
                            <q-icon
                              v-if="timeline.tags[tag].icon"
                              :name="timeline.tags[tag].icon"
                              class="q-mr-xs"
                            />
                            {{ timeline.tags[tag].label }}
                          </q-chip>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
              <q-separator vertical inset class="q-display-none q-display-md-block q-my-md" />
              <!-- Right: Filters panel -->
              <q-card-section>
                <q-select
                  filled
                  v-model="selectedTimelineOptions"
                  multiple
                  :options="allTimelineOptions"
                  stack-label
                  label-slot
                  color="teal-5"
                  options-dense
                  :display-value="
                    allTimelineOptionsSelected
                      ? 'All Selected'
                      : selectedTimelineOptions.length > 0
                        ? 'Some Selected'
                        : 'None Selected'
                  "
                >
                  <template #label> My Languages </template>
                  <template #prepend>
                    <q-icon name="fas fa-layer-group" size="md" />
                  </template>
                  <template #append>
                    <q-icon
                      name="close"
                      clickable
                      @click.stop="allTimelineOptionsSelected = false"
                      class="cursor-pointer"
                    />
                  </template>
                  <template #before-options>
                    <q-item
                      clickable
                      @click="allTimelineOptionsSelected = !allTimelineOptionsSelected"
                      dense
                    >
                      <q-item-section>
                        <q-item-label>Select All</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox v-model="allTimelineOptionsSelected" />
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #option="{ itemProps, opt }">
                    <q-item v-bind="itemProps">
                      <q-item-section avatar v-if="opt.icon">
                        <q-icon :name="opt.icon" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-card flat bordered>
                  <q-card-section class="q-py-sm">
                    <div class="text-caption text-uppercase">Frontend</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="q-pt-sm">
                    <div class="row q-col-gutter-sm">
                      <q-chip
                        v-for="key in frontendKeys"
                        :key="key"
                        clickable
                        :outline="!selectedTagsSet.has(key)"
                        :color="selectedTagsSet.has(key) ? 'primary' : void 0"
                        @click="toggleTag(key)"
                      >
                        <q-icon
                          v-if="timeline.tags[key].icon"
                          :name="timeline.tags[key].icon"
                          class="q-mr-xs"
                        />
                        {{ timeline.tags[key].label }}
                      </q-chip>
                    </div>
                  </q-card-section>
                </q-card>

                <q-card flat bordered>
                  <q-card-section class="q-py-sm">
                    <div class="text-caption text-uppercase">Backend</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="q-pt-sm">
                    <div class="row q-col-gutter-sm">
                      <q-chip
                        v-for="key in backendKeys"
                        :key="key"
                        clickable
                        :outline="!selectedTagsSet.has(key)"
                        :color="selectedTagsSet.has(key) ? 'primary' : void 0"
                        @click="toggleTag(key)"
                      >
                        <q-icon
                          v-if="timeline.tags[key].icon"
                          :name="timeline.tags[key].icon"
                          class="q-mr-xs"
                        />
                        {{ timeline.tags[key].label }}
                      </q-chip>
                    </div>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// No Tailwind; using Quasar grid/utilities and components
import LsTimeline from 'components/custom/LsTimeline.vue';
import { computed, ref } from 'vue';
import { date } from 'quasar';

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
    golang: { label: 'Go', icon: 'code' },
  },
  timelineEvents: {
    wpeSenior: {
      label: 'Senior Software Engineer · WPEngine',
      tags: ['work', 'cloud', 'product', 'react', 'golang', 'php', 'html', 'css', 'javascript'],
      plot: { from: { value: 2021, month: 1 }, to: { value: 'now' } },
      tooltip: { label: 'Senior Software Engineer at WPEngine' },
      borderColour: 'info',
    },
    wpe: {
      label: 'Software Engineer · WPEngine',
      tags: ['work', 'react', 'golang', 'php', 'html', 'css', 'javascript'],
      plot: { from: { value: 2018, month: 6 }, to: { value: 2021, month: 1 } },
      tooltip: { label: 'Software Engineer at WPEngine' },
      borderColour: 'info',
    },
    mtx: {
      label: 'Software Engineer · Mackessy Technology',
      tags: ['work', 'html', 'javascript', 'jquery', 'vuejs', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2020, month: 4 }, to: { value: 2022, month: 4 } },
      tooltip: { label: 'Mackessy Technology' },
      borderColour: 'accent',
    },
    courseco: {
      label: 'Full Stack Web Developer · CourseCo',
      tags: ['work', 'html', 'javascript', 'jquery', 'css', 'php', 'mysql'],
      plot: { from: { value: 2019, month: 3 }, to: { value: 2020, month: 3 } },
      tooltip: { label: 'CourseCo - IdeaBubble' },
      borderColour: 'positive',
    },
    internetSystemsDevelopment: {
      label: 'B.S. in Internet Systems Development',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'java', 'mysql'],
      plot: { from: { value: 2016, month: 4 }, to: { value: 2019, month: 8 } },
      tooltip: { label: 'Limerick Institute Of Technology' },
      borderColour: 'tertiary',
    },
    groupProject: {
      label: 'Group Project',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'mysql'],
      plot: { from: { value: 2018, month: 10 }, to: { value: 2019, month: 5 } },
      tooltip: { label: 'Group Project With My Course' },
      borderColour: 'secondary',
    },
    checkersBot: {
      label: 'Discord Checkers Bot',
      tags: ['javascript', 'nodeJS'],
      plot: { from: { value: 2019, month: 8 }, to: { value: 2020, month: 3 } },
      tooltip: { label: 'Discord Checkers Bot' },
      borderColour: 'warning',
    },
    auxion: {
      label: 'auxion.net',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2020, month: 9 }, to: { value: 2021, month: 3 } },
      tooltip: { label: 'Brochure Website' },
      borderColour: 'accent',
    },
    claimlink: {
      label: 'claimlink.net',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2021, month: 4 }, to: { value: 2021, month: 9 } },
      tooltip: { label: 'Brochure Website' },
      borderColour: 'warning',
    },
    liamsarsfield: {
      label: 'liamsarsfield.dev',
      tags: ['html', 'javascript', 'vuejs', 'css'],
      plot: { from: { value: 2021, month: 10 }, to: { value: 2022, month: 3 } },
      tooltip: { label: 'This Website :)' },
      borderColour: 'info',
    },
  },
};

// Selected tags (default to all)
const selectedTags = ref(Object.keys(timeline.tags));
const selectedTagsSet = computed(() => new Set(selectedTags.value));
// const allSelected = computed(() => selectedTags.value.length === Object.keys(timeline.tags).length)

const frontendKeys = ['html', 'css', 'javascript', 'jquery', 'vuejs', 'react'];
const backendKeys = ['nodeJS', 'php', 'laravel', 'codeigniter', 'mysql', 'java', 'golang'];

function toggleTag(key) {
  const idx = selectedTags.value.indexOf(key);
  if (idx >= 0) selectedTags.value = selectedTags.value.filter((k) => k !== key);
  else selectedTags.value = [...selectedTags.value, key];
}

// function toggleSelectAll() {
//   selectedTags.value = allSelected.value ? [] : Object.keys(timeline.tags)
// }

// Derive timestamps from min/max of events
const timestamps = computed(() => {
  const years = [];
  Object.values(timeline.timelineEvents).forEach((ev) => {
    years.push(Number(ev.plot.from.value));
    if (ev.plot.to.value === 'now') years.push(new Date().getFullYear());
    else years.push(Number(ev.plot.to.value));
  });
  const minY = Math.min(...years);
  const maxY = Math.max(...years);
  const arr = [];
  for (let y = minY; y <= maxY; y++) arr.push(y);
  return arr;
});

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

// Options and helpers for q-select (My Languages)
const allTimelineOptionsKeys = computed(() => Object.keys(timeline.tags));
const allTimelineOptions = computed(() =>
  allTimelineOptionsKeys.value.map((key) => ({ value: key, ...timeline.tags[key] })),
);
const selectedTimelineOptions = computed({
  get() {
    if (selectedTags.value.length === 0) return [];
    return selectedTags.value.map((tag) => ({ value: tag, ...timeline.tags[tag] }));
  },
  set(newOptions) {
    selectedTags.value = newOptions.map((opt) => opt.value);
  },
});
const allTimelineOptionsSelected = computed({
  get() {
    return (
      selectedTags.value.length === allTimelineOptionsKeys.value.length &&
      allTimelineOptionsKeys.value.every((k) => selectedTags.value.includes(k))
    );
  },
  set(allSelected) {
    selectedTags.value = allSelected ? [...allTimelineOptionsKeys.value] : [];
  },
});

function hasAnyTag(tags) {
  return tags.some((t) => selectedTagsSet.value.has(t));
}
</script>

<style scoped></style>
