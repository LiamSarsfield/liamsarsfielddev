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
            <VueTerminal />
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
                        <q-icon name="schedule" class="q-mr-md" />
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
          <q-card class="bg-dark-80">
            <q-card-section horizontal class="q-pa-md gap-md flex-column-reverse flex-row-lg">
              <!-- Left: Work Experience, Education, Side Projects -->
              <q-card-section class="q-pa-none col-12 col-xl-8">
                <q-list class="col q-gutter-md">
                  <!-- Work Experience -->
                  <q-expansion-item
                    default-opened
                    icon="work_outline"
                    label="Work Experience"
                    header-class="bg-black text-white"
                    class="q-gap-sm"
                  >
                    <q-separator />

                    <div class="column gap-md">
                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.wpeSenior.tags)"
                        title="Senior Software Engineer"
                        subtitle="WP Engine"
                        :from="timelineDates.wpeSenior.from"
                        :to="timelineDates.wpeSenior.to"
                        :duration="timelineDates.wpeSenior.duration"
                        :bullets="[
                          'Working with HTML, CSS, TypeScript/JavaScript, React, Go, PHP, PostgreSQL.',
                          'Experience with integrating Google Cloud Platform\'s suite of infrastructure tools within microservices such as Pub/Sub, Google Kubernetes Engine(GKE), Google BigQuery, and Google Cloud Tracing using Terraform.',
                          'Lead Product initiatives from conception to implementation, entailing deep integration with Stripe\'s payment platform and WooCommerce Payment Gateway development.',
                          'Took on the role of Agile Advocate for a newly formed team where I earned my Certified ScrumMaster certificate. I was responsible for guiding the team to ensure we adhered to Agile best practices, and helped guide the team to transition from Scrum to Kanban.',
                        ]"
                        :tags="timeline.timelineEvents.wpe.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      />

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.wpe.tags)"
                        title="Software Engineer"
                        subtitle="WP Engine"
                        :from="timelineDates.wpe.from"
                        :to="timelineDates.wpe.to"
                        :duration="timelineDates.wpe.duration"
                        :bullets="['Promoted to Senior Software Engineer in October 2023.']"
                        :tags="timeline.timelineEvents.wpe.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      />

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.mtx.tags)"
                        title="Software Engineer"
                        subtitle="Mackessy Technology"
                        :from="timelineDates.mtx.from"
                        :to="timelineDates.mtx.to"
                        :duration="timelineDates.mtx.duration"
                        :bullets="[
                          'Working with HTML, CSS, JavaScript/ECMAScript 6, jQuery, Vue.js/Vue 3, PHP/Laravel, GraphQL, MySQL.',
                          'Took lead and integrated a third-party Vehicle AI Damage Analysis API into one of Mackessy Technology\'s products.',
                          'Developed a feature that informs users on when an auction was viewed or when a bid was placed in near real-time with minimal system performance impact.',
                          'Worked as part of a team to develop an algorithm that determines whether a vehicle involved in an accident would be determined as repairable or written-off.',
                          'Implemented a weather API that displays hourly weather information based on GPS coordinates and a date.',
                        ]"
                        :tags="timeline.timelineEvents.mtx.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      />

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.courseco.tags)"
                        title="Full Stack Web Developer"
                        subtitle="CourseCo - IdeaBubble"
                        :from="timelineDates.courseco.from"
                        :to="timelineDates.courseco.to"
                        :duration="timelineDates.courseco.duration"
                        :bullets="[
                          'Working with HTML, CSS, jQuery, PHP/Kohana, MySQL.',
                          'Using disciplined Git Workflow integrated with Jira.',
                          'Adopting Agile development to provide Minimal Viable Products to customers.',
                          'Expanded upon the product\'s messaging functionality by allowing users to bulk message contacts in the system.',
                          'Experience in accurately planning and estimating tickets.',
                        ]"
                        :tags="timeline.timelineEvents.courseco.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      />
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
                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.internetSystemsDevelopment.tags)"
                        title="B.S. in Internet Systems Development"
                        subtitle="Limerick Institute Of Technology"
                        :from="timelineDates.internetSystemsDevelopment.from"
                        :to="timelineDates.internetSystemsDevelopment.to"
                        :duration="timelineDates.internetSystemsDevelopment.duration"
                        :bullets="['Passed with Distinction (70% GPA).']"
                        :tags="timeline.timelineEvents.internetSystemsDevelopment.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      />
                    </div>
                  </q-expansion-item>

                  <q-expansion-item
                    default-opened
                    icon="integration_instructions"
                    label="Side Projects"
                    header-class="bg-black text-white"
                    class="q-gap-sm"
                  >
                    <q-separator />
                    <div class="column gap-md">
                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.liamsarsfield.tags)"
                        title="liamsarsfield.dev"
                        subtitle="This Website :)"
                        :from="timelineDates.liamsarsfield.from"
                        :to="timelineDates.liamsarsfield.to"
                        :duration="timelineDates.liamsarsfield.duration"
                        :bullets="[
                          'Personal website which was originally written in Vue 2 and then migrated to Vue 3.',
                          'Uses Vue\'s Quasar Framework.',
                          'Hosted using in Google Cloud using Google Kubernetes Engine.',
                        ]"
                        :tags="timeline.timelineEvents.liamsarsfield.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      >
                        <template #actions>
                          <q-btn
                            flat
                            round
                            icon="lab la-github"
                            type="a"
                            href="https://github.com/LiamSarsfield/liamsarsfielddev"
                            target="_blank"
                          />
                        </template>
                      </InfoCard>

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.claimlink.tags)"
                        title="claimlink.net"
                        subtitle="Brochure Website"
                        :from="timelineDates.claimlink.from"
                        :to="timelineDates.claimlink.to"
                        :duration="timelineDates.claimlink.duration"
                        :bullets="[
                          'Brochure website developed for one of Mackessy Technology\'s products.',
                          'Displays information regarding the product\'s functionality which sends a ClaimLink (mobile web application) to a claimant to help process their claim.',
                        ]"
                        :tags="timeline.timelineEvents.claimlink.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      >
                        <template #actions>
                          <q-btn
                            flat
                            round
                            icon="launch"
                            type="a"
                            href="https://www.claimlink.net"
                            target="_blank"
                          />
                        </template>
                      </InfoCard>

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.auxion.tags)"
                        title="auxion.net"
                        subtitle="Brochure Website"
                        :from="timelineDates.auxion.from"
                        :to="timelineDates.auxion.to"
                        :duration="timelineDates.auxion.duration"
                        :bullets="[
                          'Brochure website developed for one of Mackessy Technology\'s products.',
                          'Displays a carousel of salvage vehicles currently in auction.',
                          'Salvage Agents can register for the platform using an online registration form.',
                        ]"
                        :tags="timeline.timelineEvents.auxion.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      >
                        <template #actions>
                          <q-btn
                            flat
                            round
                            icon="launch"
                            type="a"
                            href="https://auxion.net"
                            target="_blank"
                          />
                        </template>
                      </InfoCard>

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.checkersBot.tags)"
                        title="Discord Checkers Bot"
                        subtitle="Discord Checkers Bot"
                        :from="timelineDates.checkersBot.from"
                        :to="timelineDates.checkersBot.to"
                        :duration="timelineDates.checkersBot.duration"
                        :bullets="[
                          'A node.js web application where users can play checkers with each other.',
                          'Uses object-oriented programming and recursive functionality to enforce the rules of checkers.',
                          'Hosted on an AWS EC2 Ubuntu server.',
                        ]"
                        :tags="timeline.timelineEvents.checkersBot.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      >
                        <template #actions>
                          <q-btn
                            flat
                            round
                            icon="launch"
                            type="a"
                            href="https://discord.gg/RnAv9ZwPMY"
                            target="_blank"
                          />
                          <q-btn
                            flat
                            round
                            icon="lab la-github"
                            type="a"
                            href="https://github.com/LiamSarsfield/checkers-bot"
                            target="_blank"
                          />
                        </template>
                      </InfoCard>

                      <InfoCard
                        v-show="hasAnyTag(timeline.timelineEvents.groupProject.tags)"
                        title="Group Project"
                        subtitle="Group Project With My Course"
                        :from="timelineDates.groupProject.from"
                        :to="timelineDates.groupProject.to"
                        :duration="timelineDates.groupProject.duration"
                        :bullets="[
                          '4-person group project where I took team lead.',
                          'Users can create customer accounts and purchase products on a store.',
                          'Staff members can update stock, view orders and progress customer orders statuses.',
                        ]"
                        :tags="timeline.timelineEvents.groupProject.tags"
                        :tagMeta="timeline.tags"
                        :selectedKeys="selectedTags"
                        @toggle="toggleChip"
                      >
                        <template #actions>
                          <q-btn
                            flat
                            round
                            icon="lab la-github"
                            type="a"
                            href="https://github.com/LiamSarsfield/Web-Project"
                            target="_blank"
                          />
                        </template>
                      </InfoCard>
                    </div>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
              <q-separator vertical inset class="block gt-md q-my-none" />
              <!-- Right: Filters panel -->
              <q-card-section class="q-pa-none col">
                <div class="column no-wrap gap-sm position-sticky">
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

                  <q-card flat>
                    <q-card-section class="q-py-sm">
                      <div class="text-h6">Frontend</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="chip-grid q-py-sm">
                      <q-chip
                        v-for="key in frontendKeys"
                        :key="key"
                        :outline="!selectedTags.includes(key)"
                        :color="selectedTags.includes(key) ? 'primary' : void 0"
                        clickable
                        square
                        @click="toggleChip(key)"
                      >
                        <q-icon
                          v-if="timeline.tags[key].icon"
                          :name="timeline.tags[key].icon"
                          class="q-mr-md"
                        />
                        {{ timeline.tags[key].label }}
                      </q-chip>
                    </q-card-section>
                  </q-card>

                  <q-card flat>
                    <q-card-section class="q-py-sm">
                      <div class="text-h6">Backend</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="chip-grid q-py-sm">
                        <q-chip
                          v-for="key in backendKeys"
                          :key="key"
                          :outline="!selectedTags.includes(key)"
                          :color="selectedTags.includes(key) ? 'primary' : void 0"
                          clickable
                          square
                          @click="toggleChip(key)"
                        >
                          <q-icon
                            v-if="timeline.tags[key].icon"
                            :name="timeline.tags[key].icon"
                            class="q-mr-sm"
                          />
                          {{ timeline.tags[key].label }}
                        </q-chip>
                    </q-card-section>
                  </q-card>
                </div>
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
import InfoCard from 'components/InfoCard.vue';
import { computed, ref } from 'vue';
import { date } from 'quasar';
import VueTerminal from 'components/terminal/VueTerminal.vue';
import LsDialog from 'components/custom/LsDialog.vue';
import LsParallax from 'components/custom/LsParallax.vue';

const timeline = {
  tags: {
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
    golang: { label: 'Go', icon: 'fab fa-golang' },
  },
  timelineEvents: {
    internetSystemsDevelopment: {
      label: 'B.S. in Internet Systems Development',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'java', 'mysql'],
      plot: { from: { value: 2016, month: 4 }, to: { value: 2019, month: 8 } },
      tooltip: { label: 'Limerick Institute Of Technology' },
      borderColour: 'yellow-5',
    },
    courseco: {
      label: 'Full Stack Web Developer',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'mysql'],
      plot: { from: { value: 2019, month: 3 }, to: { value: 2020, month: 3 } },
      tooltip: { label: 'CourseCo - IdeaBubble' },
      borderColour: 'green-6',
    },
    mtx: {
      label: 'Software Engineer',
      tags: ['html', 'javascript', 'jquery', 'vuejs', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2020, month: 4 }, to: { value: 2022, month: 4 } },
      tooltip: { label: 'Mackessy Technology' },
      borderColour: 'red-8',
    },
    wpe: {
      label: 'Software Engineer II',
      tags: ['react', 'golang', 'php', 'html', 'css', 'javascript'],
      plot: { from: { value: 2022, month: 5 }, to: { value: 2023, month: 9 } },
      tooltip: { label: 'Software Engineer at WPEngine' },
      borderColour: 'blue-5',
    },
    wpeSenior: {
      label: 'Senior Software Engineer',
      tags: ['react', 'golang', 'php', 'html', 'css', 'javascript'],
      plot: { from: { value: 2023, month: 10 }, to: { value: 'now' } },
      tooltip: { label: 'Senior Software Engineer at WPEngine' },
      borderColour: 'blue-6',
    },
    groupProject: {
      label: 'Group Project',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'mysql'],
      plot: { from: { value: 2018, month: 10 }, to: { value: 2019, month: 5 } },
      tooltip: { label: 'Group Project With My Course' },
      borderColour: 'grey-7',
    },
    checkersBot: {
      label: 'Discord Checkers Bot',
      tags: ['javascript', 'nodeJS'],
      plot: { from: { value: 2019, month: 8 }, to: { value: 2020, month: 3 } },
      tooltip: { label: 'Discord Checkers Bot' },
      borderColour: 'yellow-5',
    },
    auxion: {
      label: 'auxion.net',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2020, month: 9 }, to: { value: 2021, month: 3 } },
      tooltip: { label: 'Brochure Website' },
      borderColour: 'red-6',
    },
    claimlink: {
      label: 'claimlink.net',
      tags: ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
      plot: { from: { value: 2021, month: 4 }, to: { value: 2021, month: 9 } },
      tooltip: { label: 'Brochure Website' },
      borderColour: 'orange-5',
    },
    liamsarsfield: {
      label: 'liamsarsfield.dev',
      tags: ['html', 'javascript', 'vuejs', 'css'],
      plot: { from: { value: 2021, month: 10 }, to: { value: 2022, month: 3 } },
      tooltip: { label: 'This Website :)' },
      borderColour: 'blue-7',
    },
  },
};

const frontendKeys = ['html', 'css', 'javascript', 'jquery', 'vuejs', 'react'];
const backendKeys = ['nodeJS', 'php', 'laravel', 'codeigniter', 'mysql', 'java', 'golang'];

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
      duration: [
        years ? `${years} ${years === 1 ? 'Year' : 'Years'}` : null,
        remMonths ? `${remMonths} ${remMonths === 1 ? 'Month' : 'Months'}` : null,
      ]
        .filter(Boolean)
        .join(', '),
    };
  }
  return res;
});

// Options and helpers for q-select (My Languages)
const allTimelineOptionsKeys = computed(() => Object.keys(timeline.tags));
const allTimelineOptions = computed(() =>
  allTimelineOptionsKeys.value.map((key) => ({ value: key, ...timeline.tags[key] })),
);
const selectedTimelineOptions = ref(allTimelineOptions.value);
const allTimelineOptionsSelected = computed({
  get() {
    const selectedOptions = selectedTimelineOptions.value.map((option) => option.value);
    return (
      selectedOptions.length === allTimelineOptionsKeys.value.length &&
      allTimelineOptionsKeys.value.every((k) => selectedOptions.includes(k))
    );
  },
  set(allSelected) {
    selectedTimelineOptions.value = allSelected ? allTimelineOptions.value : [];
  },
});
const selectedTags = computed(() => selectedTimelineOptions.value.map(({ value }) => value));

function hasAnyTag(tags) {
  return tags.some((t) => selectedTags.value.includes(t));
}
function toggleChip(chip) {
  if (selectedTags.value.includes(chip)) {
    selectedTimelineOptions.value = selectedTimelineOptions.value.filter(
      ({ value }) => value !== chip,
    );
  } else {
    selectedTimelineOptions.value = [
      ...selectedTimelineOptions.value,
      allTimelineOptions.value.find(({ value }) => value === chip),
    ];
  }
}
</script>
