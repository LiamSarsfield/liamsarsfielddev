<template>
  <q-page class="row justify-center">
    <q-card class="col-12 col-md-8 tw-bg-primary">
      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="!tw-bg-black">
          <template v-slot:header>
            <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
              <q-icon name="code" />
            </q-item-section>
            <q-item-section class="tw-text-xl">
              About Me
            </q-item-section>
          </template>
          <vue-terminal :on-mount="terminalOptions.onMount" :commands="terminalOptions.commands"
            :built-in="terminalOptions.builtIn" :title="terminalOptions.title" :prompt="terminalOptions.prompt"
            v-model:stdin="terminalOptions.stdin" v-model:history="terminalOptions.history" ref="vueTerminal" />
        </q-expansion-item>
      </q-card-section>
      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="!tw-bg-black">
          <template v-slot:header>
            <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
              <q-icon name="timeline" />
            </q-item-section>
            <q-item-section class="tw-text-xl">
              Timeline
            </q-item-section>
          </template>
          <q-card class="col-12">
            <q-card>
              <q-card-section>
                <ls-timeline v-bind="timelineOptions">
                  <template v-slot:timelineEventTooltipContent="{ tooltipContent }">
                    <q-list dark separator dense class="tw--mx-[15px]">
                      <q-item class="tw-mb-2">
                        <q-item-section>
                          <q-item-label>
                            {{ timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.label }}
                          </q-item-label>
                          <q-item-label caption class="tw-pl-1 tw-flex tw-items-center">
                            <q-icon name="schedule" class="tw-pr-1" />
                            {{ timelineOptionDates[tooltipContent.identifier].from }} to
                            {{ timelineOptionDates[tooltipContent.identifier].to }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item dense clickable v-ripple bordered
                        v-for="(tag) in timelineOptions.timelineEvents[tooltipContent.identifier].tags" :key="tag">
                        <q-item-section v-if="timelineOptions.tags[tag].icon" avatar>
                          <q-icon :name="timelineOptions.tags[tag].icon" />
                        </q-item-section>
                        <q-item-section>
                          {{ timelineOptions.tags[tag].label }}
                        </q-item-section>
                      </q-item>
                      <q-item
                        v-if="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.github || timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.link"
                        class="tw-justify-end !tw-py-1">
                        <q-item-section v-if="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.github"
                          thumbnail class="!tw-pr-2">
                          <q-btn flat color="tertiary" round icon="lab la-github" type="a"
                            :href="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.github"
                            target="_blank" size="md" />
                        </q-item-section>
                        <q-item-section v-if="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.link"
                          thumbnail class="!tw-pr-2">
                          <q-btn flat color="tertiary" round icon="launch" type="a"
                            :href="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.link"
                            target="_blank" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </template>
                </ls-timeline>
              </q-card-section>
            </q-card>
          </q-card>
        </q-expansion-item>
      </q-card-section>
      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="!tw-bg-black">
          <template v-slot:header>
            <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
              <q-icon name="las la-stream" />
            </q-item-section>
            <q-item-section class="tw-text-xl">
              Experience
            </q-item-section>
          </template>
          <q-card class="col-12 !tw-shadow-xl tw-backdrop-blur-md !tw-bg-dark/80">
            <q-card-section horizontal class="!tw-flex-wrap">
              <q-card-section class="col-12 col-md-8 tw-flex tw-flex-col tw-gap-4">
                <q-list class="tw-flex tw-flex-col tw-gap-4">
                  <q-expansion-item default-opened header-class="!tw-bg-black tw-text-lg">
                    <template v-slot:header>
                      <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
                        <q-icon name="work_outline" />
                      </q-item-section>
                      <q-item-section>
                        Work Experience
                      </q-item-section>
                    </template>
                    <q-separator />
                    <div class="tw-flex tw-flex-col tw-gap-3">
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.wpe.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.wpe.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.wpe.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.wpe.from }} to
                                    {{ timelineOptionDates.wpe.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.wpe.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.wpe.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Working with HTML, CSS, JavaScript/ECMAScript 6, React, Go, PHP, PostgreSQL.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Working as part of WP Engine's eCommerce product line to provide new payment integration
                                functionality for customers.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.wpe.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                        </q-card>
                      </transition>
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.mtx.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.mtx.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.mtx.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.mtx.from }} to
                                    {{ timelineOptionDates.mtx.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.mtx.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.mtx.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Working with HTML, CSS, JavaScript/ECMAScript 6, jQuery, Vue.js/Vue 3,
                                PHP/Laravel, GraphQL, MySQL.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Took lead and integrated a third-party Vehicle AI Damage Analysis API into one of
                                Mackessy Technology’s products.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Developed a feature that informs users on when an auction was viewed or when a bid
                                was placed in near real-time with minimal system performance impact.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Worked as part of a team to develop an algorithm that determines whether a vehicle
                                involved in an accident would be determined as repairable or written-off.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Implemented a weather API that displays hourly weather information based on GPS
                                coordinates and a date.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.mtx.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                        </q-card>
                      </transition>
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.courseco.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.courseco.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.courseco.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.courseco.from }} to
                                    {{ timelineOptionDates.courseco.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.courseco.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.courseco.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Working with HTML, CSS, jQuery, PHP/Kohana, MySQL.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Using disciplined Git Workflow integrated with Jira.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Adopting Agile development to provide Minimal Viable Products to customers.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Expanded upon the product’s messaging functionality by allowing users to bulk
                                message contacts in the system.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Experience in accurately planning and estimating tickets.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.courseco.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                        </q-card>
                      </transition>
                    </div>
                  </q-expansion-item>
                  <q-expansion-item default-opened header-class="!tw-bg-black tw-text-lg">
                    <template v-slot:header>
                      <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
                        <q-icon name="school" />
                      </q-item-section>
                      <q-item-section>
                        Education
                      </q-item-section>
                    </template>
                    <q-separator />
                    <div class="tw-flex tw-flex-col tw-gap-3">
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.internetSystemsDevelopment.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{
                                      timelineOptions.timelineEvents.internetSystemsDevelopment.label
                                  }}
                                  </q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.internetSystemsDevelopment.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.internetSystemsDevelopment.from }} to
                                    {{ timelineOptionDates.internetSystemsDevelopment.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.internetSystemsDevelopment.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.internetSystemsDevelopment.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Passed with Distinction (70% GPA).
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.internetSystemsDevelopment.tags"
                              :key="tag" :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                        </q-card>
                      </transition>
                    </div>
                  </q-expansion-item>
                  <q-expansion-item default-opened header-class="!tw-bg-black tw-text-lg">
                    <template v-slot:header>
                      <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
                        <q-icon name="integration_instructions" />
                      </q-item-section>
                      <q-item-section class="tw-text-lg">
                        Side Projects
                      </q-item-section>
                    </template>
                    <q-separator />
                    <div class="tw-flex tw-flex-col tw-gap-3">
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.liamsarsfield.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.liamsarsfield.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.liamsarsfield.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.liamsarsfield.from }} to
                                    {{ timelineOptionDates.liamsarsfield.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.liamsarsfield.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.liamsarsfield.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Personal website which was originally written in Vue 2 and then migrated to Vue 3.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Uses Vue's Quasar Framework.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Hosted using Docker via AWS Elastic Beanstalk.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.liamsarsfield.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions>
                            <q-btn flat round icon="lab la-github" type="a"
                              href="https://github.com/LiamSarsfield/liamsarsfielddev" target="_blank" />
                          </q-card-actions>
                        </q-card>
                      </transition>
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.claimlink.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.claimlink.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.claimlink.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.claimlink.from }} to
                                    {{ timelineOptionDates.claimlink.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.claimlink.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.claimlink.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Brochure website developed for one of Mackessy Technology’s products.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Displays information regarding the product's functionality which sends a ClaimLink
                                (mobile web application) to a claimant to help process their claim.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.claimlink.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions>
                            <q-btn flat round icon="launch" type="a" href="https://www.claimlink.net" target="_blank" />
                          </q-card-actions>
                        </q-card>
                      </transition>
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.auxion.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.auxion.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.auxion.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.auxion.from }} to
                                    {{ timelineOptionDates.auxion.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.auxion.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.auxion.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                Brochure website developed for one of Mackessy Technology’s products.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Displays a carousel of salvage vehicles currently in auction.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Salvage Agents can register for the platform using an online registration form.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.auxion.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions>
                            <q-btn flat round icon="launch" type="a" href="https://auxion.net" target="_blank" />
                          </q-card-actions>
                        </q-card>
                      </transition>
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.checkersBot.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.checkersBot.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.checkersBot.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.checkersBot.from }} to
                                    {{ timelineOptionDates.checkersBot.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.checkersBot.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.checkersBot.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                A node.js web application where users can play checkers with each other.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Uses object-oriented programming and recursive functionality to enforce the rules of
                                checkers.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Hosted on an AWS EC2 Ubuntu server.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.checkersBot.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions>
                            <q-btn flat round icon="launch" type="a" href="https://discord.gg/RnAv9ZwPMY"
                              target="_blank" />
                            <q-btn flat round icon="lab la-github" type="a"
                              href="https://github.com/LiamSarsfield/checkers-bot" target="_blank" />
                          </q-card-actions>
                        </q-card>
                      </transition>
                      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                        <q-card class="!tw-shadow-xl"
                          v-show="intersection(timelineOptions.timelineEvents.groupProject.tags, timelineOptions.selectedTags).length">
                          <q-card-section horizontal
                            class="tw-items-center tw-justify-between !tw-flex-wrap tw-px-3 tw-pt-2 md:tw-pb-2">
                            <q-card-section class="tw-text-lg tw-py-0">
                              <q-item class="tw-p-0">
                                <q-item-section>
                                  <q-item-label>{{ timelineOptions.timelineEvents.groupProject.label }}</q-item-label>
                                  <q-item-label caption>
                                    {{ timelineOptions.timelineEvents.groupProject.tooltip.label }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                            <q-card-section class="tw-py-0 tw-flex md:tw-items-center">
                              <q-item class="tw-py-2 tw-px-0 tw-min-h-0">
                                <q-item-section avatar class="tw-pr-3 tw-hidden md:tw-flex">
                                  <q-icon name="schedule" class="tw-ml-auto" size="xs" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>
                                    {{ timelineOptionDates.groupProject.from }} to
                                    {{ timelineOptionDates.groupProject.to }}
                                    <span class="md:tw-hidden tw-italic">
                                      ({{ timelineOptionDates.groupProject.duration }})
                                    </span>
                                  </q-item-label>
                                  <q-item-label caption class="tw-hidden md:tw-block">
                                    {{ timelineOptionDates.groupProject.duration }}
                                  </q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-card-section>
                          </q-card-section>
                          <q-list class="tw-px-3" dense bordered separator>
                            <q-item>
                              <q-item-section>
                                4-person group project where I took team lead.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Users can create customer accounts and purchase products on a store.
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                Staff members can update stock, view orders and progress customer orders statuses.
                              </q-item-section>
                            </q-item>
                          </q-list>
                          <q-card-section class="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] tw-py-2">
                            <q-chip v-for="tag in timelineOptions.timelineEvents.groupProject.tags" :key="tag"
                              :outline="!selectedChips.has(tag)" clickable v-ripple square
                              :icon="timelineOptions.tags[tag].icon" :color="selectedChips.has(tag) ? 'primary' : null"
                              :selected="selectedChips.has(tag)" class="tw-text-sm" @click="toggleChipTag(tag)">
                              {{ timelineOptions.tags[tag].label }}
                            </q-chip>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions>
                            <q-btn flat round icon="lab la-github" type="a"
                              href="https://github.com/LiamSarsfield/Web-Project" target="_blank" />
                          </q-card-actions>
                        </q-card>
                      </transition>
                    </div>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
              <q-separator class="tw-hidden md:tw-block" vertical inset />
              <q-card-section class="col-12 col-md tw-order-first md:tw-order-last tw-pb-0">
                <div class="tw-flex tw-flex-col tw-gap-2 tw-sticky tw-top-[50px]">
                  <q-select filled v-model="selectedTimelineOptions" multiple :options="allTimelineOptions" stack-label
                    label-slot color="secondary" options-dense
                    :display-value="(allTimelineOptionsSelected) ? 'All Selected' : (selectedTimelineOptions.length > 0) ? 'Some Selected' : 'None Selected'">
                    <template v-slot:label>
                      My Languages
                    </template>
                    <template v-slot:prepend>
                      <q-icon name="fas fa-layer-group" size="md" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" clickable @click.stop="allTimelineOptionsSelected = false"
                        class="cursor-pointer" />
                    </template>
                    <template v-slot:before-options>
                      <q-item clickable :class="{ 'tw-text-secondary': allTimelineOptionsSelected }"
                        @click="allTimelineOptionsSelected = !allTimelineOptionsSelected" dense>
                        <q-item-section>
                          <q-item-label>Select All</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-checkbox v-model="allTimelineOptionsSelected"></q-checkbox>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:option="{ itemProps, opt }">
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

                  <q-card class="my-card">
                    <q-card-section class="tw-py-2">
                      <div class="tw-text-lg">Frontend</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="tw-py-1 tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))]">
                      <q-chip :outline="!selectedChips.has('html')" clickable v-ripple square
                        :icon="timelineOptions.tags.html.icon" :color="selectedChips.has('html') ? 'primary' : null"
                        :selected="selectedChips.has('html')" @click="toggleChipTag('html')">
                        {{ timelineOptions.tags.html.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('css')" clickable v-ripple square
                        :icon="timelineOptions.tags.css.icon" :color="selectedChips.has('css') ? 'primary' : null"
                        :selected="selectedChips.has('css')" @click="toggleChipTag('css')">
                        {{ timelineOptions.tags.css.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('javascript')" clickable v-ripple square
                        :icon="timelineOptions.tags.javascript.icon"
                        :color="selectedChips.has('javascript') ? 'primary' : null"
                        :selected="selectedChips.has('javascript')" @click="toggleChipTag('javascript')">
                        {{ timelineOptions.tags.javascript.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('jquery')" clickable v-ripple square
                        :icon="timelineOptions.tags.jquery.icon" :color="selectedChips.has('jquery') ? 'primary' : null"
                        :selected="selectedChips.has('jquery')" @click="toggleChipTag('jquery')">
                        {{ timelineOptions.tags.jquery.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('vuejs')" clickable v-ripple square
                        :icon="timelineOptions.tags.vuejs.icon" :color="selectedChips.has('vuejs') ? 'primary' : null"
                        :selected="selectedChips.has('vuejs')" @click="toggleChipTag('vuejs')">
                        {{ timelineOptions.tags.vuejs.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('react')" clickable v-ripple square
                        :icon="timelineOptions.tags.react.icon" :color="selectedChips.has('react') ? 'primary' : null"
                        :selected="selectedChips.has('react')" @click="toggleChipTag('react')">
                        {{ timelineOptions.tags.react.label }}
                      </q-chip>
                    </q-card-section>
                  </q-card>

                  <q-card class="my-card">
                    <q-card-section class="tw-py-2">
                      <div class="tw-text-lg">Backend</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="tw-py-1 tw-grid tw-grid-cols-[repeat(auto-fill,minmax(7rem,_1fr))]">
                      <q-chip :outline="!selectedChips.has('nodeJS')" clickable v-ripple square
                        :icon="timelineOptions.tags.nodeJS.icon" :color="selectedChips.has('nodeJS') ? 'primary' : null"
                        :selected="selectedChips.has('nodeJS')" @click="toggleChipTag('nodeJS')">
                        {{ timelineOptions.tags.nodeJS.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('php')" clickable v-ripple square
                        :icon="timelineOptions.tags.php.icon" :color="selectedChips.has('php') ? 'primary' : null"
                        :selected="selectedChips.has('php')" @click="toggleChipTag('php')">
                        {{ timelineOptions.tags.php.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('laravel')" clickable v-ripple square
                        :icon="timelineOptions.tags.laravel.icon"
                        :color="selectedChips.has('laravel') ? 'primary' : null"
                        :selected="selectedChips.has('laravel')" @click="toggleChipTag('laravel')">
                        {{ timelineOptions.tags.laravel.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('codeigniter')" clickable v-ripple square
                        :icon="timelineOptions.tags.codeigniter.icon"
                        :color="selectedChips.has('codeigniter') ? 'primary' : null"
                        :selected="selectedChips.has('codeigniter')" @click="toggleChipTag('codeigniter')">
                        {{ timelineOptions.tags.codeigniter.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('mysql')" clickable v-ripple square
                        :icon="timelineOptions.tags.mysql.icon" :color="selectedChips.has('mysql') ? 'primary' : null"
                        :selected="selectedChips.has('mysql')" @click="toggleChipTag('mysql')">
                        {{ timelineOptions.tags.mysql.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('java')" clickable v-ripple square
                        :icon="timelineOptions.tags.java.icon" :color="selectedChips.has('java') ? 'primary' : null"
                        :selected="selectedChips.has('java')" @click="toggleChipTag('java')">
                        {{ timelineOptions.tags.java.label }}
                      </q-chip>
                      <q-chip :outline="!selectedChips.has('golang')" clickable v-ripple square
                        :icon="timelineOptions.tags.golang.icon" :color="selectedChips.has('golang') ? 'primary' : null"
                        :selected="selectedChips.has('golang')" @click="toggleChipTag('golang')">
                        {{ timelineOptions.tags.golang.label }}
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
    <ls-dialog v-model="showAuxionModal">
      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/auxion/auxion-site.jpeg" class="tw-absolute tw-w-[calc(100%-15px)]">
        </div>
        <q-card-section class="tw-p-0 scroll parallax-about-scroll parallax-scroll-target tw-max-h-[50vh]">
          <div class="tw-h-[150px] md:tw-h-[300px] tw-flex tw-flex-col">
            <div class="tw-relative tw-group tw-text-2xl md:tw-text-4xl tw-mt-auto">
              <div
                class="tw-absolute tw-w-full tw-h-full group-hover:tw-bg-red-900 group-hover:tw-bg-none group-hover:tw-opacity-90 tw-bg-gradient-to-r tw-from-black tw-to-red-900 tw-opacity-70">
              </div>
              <ls-anchor href="https://auxion.net"
                className="tw-relative tw-flex tw-justify-center tw-align-center tw-py-2 tw-text-white">
                auxion.net
                <q-icon name="launch" class="tw-ml-1 tw-my-auto"></q-icon>
              </ls-anchor>
            </div>
          </div>
          <q-list class="tw-text-lg tw-relative q-dark" separator>
            <q-item>
              <q-item-section>
                Brochure website developed for one of Mackessy Technology’s products which sells salvaged vehicles in an
                auction format.
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Displays a carousel of current salvage vehicles in auction that pulls data frequently from the platform.
              </q-item-section>
            </q-item>
            <q-item class="tw-relative tw-p-0">
              <q-item-section>
                <ls-parallax :height="220" scale="0.68" class="parallax-about">
                  <template>
                    <div
                      class="tw-absolute tw-bottom-0 tw-w-full tw-py-2 tw-text-center tw-text-gray-200 tw-text-xl tw-bg-black tw-bg-opacity-70">
                      Salvage Agents can also register for the platform using an online registration form.
                    </div>
                  </template>
                  <template v-slot:media>
                    <img class="parallax-img-about" src="/img/modal-showcase/auxion/auxion-site-registration.png">
                  </template>
                </ls-parallax>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                A strong SEO score was also high priority for this project.
              </q-item-section>
            </q-item>
            <q-item>
              Technologies used: Laravel/PHP, MySQL 8, jQuery/JavaScript.
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat round icon="launch" type="a" href="https://auxion.net" target="_blank" />
        </q-card-actions>
      </q-card>
    </ls-dialog>
    <ls-dialog v-model="claimLinkCheckersModal">
      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/claimlink/claimlink-site-lg.png" class="tw-absolute tw-w-[calc(100%-15px)]">
        </div>
        <q-card-section class="tw-p-0 scroll parallax-about-scroll parallax-scroll-target tw-max-h-[50vh]">
          <div class="tw-h-[150px] md:tw-h-[300px] tw-flex tw-flex-col">
            <div class="tw-relative tw-group tw-text-2xl md:tw-text-4xl tw-mt-auto">
              <div
                class="tw-absolute tw-w-full tw-h-full group-hover:tw-bg-orange-800 group-hover:tw-bg-none group-hover:tw-opacity-90 tw-bg-gradient-to-r tw-from-black tw-to-orange-700 tw-opacity-70">
              </div>
              <ls-anchor href="https://www.claimlink.net/"
                className="tw-relative tw-flex tw-justify-center tw-align-center tw-py-2 tw-text-white">
                www.claimlink.net
                <q-icon name="launch" class="tw-ml-1 tw-my-auto"></q-icon>
              </ls-anchor>
            </div>
          </div>
          <q-list class="tw-text-lg tw-relative q-dark" separator>
            <q-item>
              <q-item-section>
                Brochure website developed for one of Mackessy Technology’s products which sends a ClaimLink
                (mobile web application) to a claimant to help process their claim.
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Mobile compatible with a priority on engagement, ease of use and compatibility.
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Technologies used: Laravel/PHP, jQuery/JavaScript.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat round icon="launch" type="a" href="https://www.claimlink.net/" target="_blank" />
        </q-card-actions>
      </q-card>
    </ls-dialog>
    <ls-dialog v-model="showDiscordCheckersModal">
      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/discord-checkers-bot/discord-checkers.png"
            class="tw-absolute tw-w-[calc(100%-15px)]">
        </div>
        <q-card-section class="tw-p-0 scroll parallax-about-scroll parallax-scroll-target tw-max-h-[50vh]">
          <div class="tw-h-[150px] md:tw-h-[300px] tw-flex tw-flex-col">
            <div class="tw-relative tw-group tw-text-2xl md:tw-text-4xl tw-mt-auto">
              <div
                class="tw-absolute tw-w-full tw-h-full group-hover:tw-bg-yellow-700 group-hover:tw-bg-none group-hover:tw-opacity-90 tw-bg-gradient-to-r tw-from-black tw-to-yellow-700 tw-opacity-70">
              </div>
              <ls-anchor href="https://github.com/LiamSarsfield/checkers-bot"
                className="tw-relative tw-flex tw-justify-center tw-align-center tw-py-2 tw-text-white">
                Discord Checkers Bot
                <q-icon name="launch" class="tw-ml-1 tw-my-auto"></q-icon>
              </ls-anchor>
            </div>
          </div>
          <q-list class="tw-text-lg tw-relative q-dark" separator>
            <q-item>
              <q-item-section>
                Checkers bot designed to work with Discord, a messaging and VoIP app.
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                The bot uses emojies to show the black pieces (⚫) and white pieces(⚪).
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Technologies used: JavaScript/NodeJS.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat round icon="launch" type="a" href="https://discord.gg/RnAv9ZwPMY" target="_blank" />
          <q-btn flat round icon="lab la-github" type="a" href="https://github.com/LiamSarsfield/checkers-bot"
            target="_blank" />
        </q-card-actions>
      </q-card>
    </ls-dialog>
  </q-page>
</template>

<script>
import componentLiaison from 'src/store/componentLiaison';
import VueTerminal from 'components/terminal/VueTerminal';
import LsParallax from 'components/custom/LsParallax';
import LsDialog from 'components/custom/LsDialog';
import LsAnchor from 'components/custom/LsAnchor';
import LsTimeline from 'components/custom/LsTimeline';
import { isEqual, clone, intersection, range } from 'lodash';
import { date } from 'quasar';

// Needed so JSX event handlers can point to the store (which is updated in this event handler's hook)
let _store = null;
export default {
  name: 'PageIndex',
  components: { LsTimeline, LsAnchor, LsDialog, VueTerminal, LsParallax },
  /** https://quasar.dev/quasar-cli/prefetch-feature
   * "The preFetch hook runs only once, when the app boots up, so you can use this opportunity to initialize the Vuex Store here." */
  preFetch({ store }) {
    store.registerModule('index', componentLiaison);
    store.commit('index/updateState', {
      'auxionModal': { show: false },
      'discordCheckersModal': { show: false },
      'claimLinkCheckersModal': { show: false },
    });
  },
  /** START: Lifecycle Hooks */
  created() {
    _store = this.$store;
    // Select all timeline options by default
    this.selectedTimelineOptions = this.allTimelineOptions;

    // Map current min year (2016 with current year)
    this.timelineOptions.timestamps = range((new Date()).getFullYear() - 2016 + 1).map(value => 2016 + value);
  },
  async mounted() {
    let _this = this;

    await _this.$nextTick();
    let vueCommandRef = _this.$refs.vueTerminal;
    let commands = [
      'whoami',
      'htop',
      'vmstat',
    ];
    let executionOptions = { terminalOptionsKey: this, typingAnimation: true, typingSpeed: 150 };
    for (let i = 0; i < commands.length; i++) {
      await vueCommandRef.executeTermCommand(commands[i], executionOptions);
      await _this.sleep(500);
    }
  },
  /** END: Lifecycle Hooks */
  data() {
    return {
      terminalOptions: {
        commands: {
          // _this in the below objects refers to the VueTerminal Vue Instance
          'whoami': () => <span>Enthusiastic web developer with a passion for software development and full-stack web development.</span>,
          'htop': () => <span>I have 3 years experience working with PHP (Laravel), MySQL, jQuery/JavaScript and CSS.
            I have also dabbled with Vue while experimenting with Node, GraphQL and Docker.</span>,
          'vmstat': function () {
            return <span class="">Current portfolio includes:
              <LsAnchor onClick={() => {
                // Communicate to the Index State that the Auxion, ClaimLink Modal, etc. needs to show when the user clicks the link
                _store.commit('index/updateState', {
                  auxionModal: {
                    ..._store.getters['index/getState'].auxionModal,
                    show: true,
                  },
                });
              }} className="tw-cursor-pointer tw-text-red-600 hover:!tw-text-red-700"
                underlineGradient={['tw-from-gray-700', 'tw-to-red-900']}>
                auxion.net (Laravel/MySQL/jQuery/SCSS)</LsAnchor>,
              <LsAnchor onClick={() => {
                _store.commit('index/updateState',
                  { claimLinkCheckersModal: { ..._store.getters['index/getState'].claimLinkCheckersModal, show: true } });
              }} className="tw-cursor-pointer tw-text-orange-500 hover:!tw-text-orange-600"
                underlineGradient={['tw-from-gray-700', 'tw-to-orange-500']}>
                claimlink.net (Laravel/MySQL/jQuery/SCSS)</LsAnchor>,
              <LsAnchor onClick={() => {
                _store.commit('index/updateState', {
                  discordCheckersModal: {
                    ..._store.getters['index/getState'].discordCheckersModal,
                    show: true,
                  },
                });
              }} className="tw-cursor-pointer tw-text-yellow-500 hover:!tw-text-yellow-600"
                underlineGradient={['tw-from-gray-700', 'tw-to-yellow-800']}>
                Discord Checkers bot (Node.js/Discord.js)</LsAnchor>, and this website(Vue/Quasar Framework/Docker).</span>;
          },
        },
        styles: {
          backgroundColor: 'red',
        },
        watch: {},
        history: [],
        title: 'liamsarsfielddev@index: ~',
        prompt: '~liamsarsfielddev@index:#/',
        builtIn: undefined,
        stdin: '',
      },
      timelineOptions: {
        'tags': {
          'html': { 'label': 'HTML', 'icon': 'fab fa-html5' },
          'css': { 'label': 'CSS', 'icon': 'fab fa-css3-alt' },
          'javascript': { 'label': 'JavaScript', 'icon': 'fab fa-js' },
          'jquery': { 'label': 'jQuery', 'icon': 'fab fa-js-square' },
          'vuejs': { 'label': 'Vue.js', 'icon': 'fab fa-vuejs' },
          'react': { 'label': 'React', 'icon': 'fab fa-react' },
          'nodeJS': { 'label': 'NodeJS', 'icon': 'fab fa-node' },
          'php': { 'label': 'PHP', 'icon': 'fab fa-php' },
          'laravel': { 'label': 'Laravel', 'icon': 'fab fa-laravel' },
          'codeigniter': { 'label': 'CodeIgniter', 'icon': 'code' },
          'mysql': { 'label': 'MySQL', 'icon': 'fas fa-database' },
          'java': { 'label': 'Java', 'icon': 'fab fa-java' },
          'golang': { 'label': 'Go', 'icon': 'fa-brands fa-golang' },
        },
        'selectedTags': [],
        'timestamps': [],
        'timelineEvents': {
          'internetSystemsDevelopment': {
            'label': 'B.S. in Internet Systems Development',
            'tooltip': { 'label': 'Limerick Institute Of Technology' },
            'borderColour': 'tw-border-yellow-300',
            'plot': {
              'from': { 'value': 2016, 'month': '4' },
              'to': { 'value': 2019, 'month': '8' },
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'java', 'mysql'],
          },
          'courseco': {
            'label': 'Full Stack Web Developer',
            'tooltip': { 'label': 'CourseCo - IdeaBubble' },
            'borderColour': 'tw-border-green-400',
            'plot': {
              'from': { 'value': 2019, 'month': '3' },
              'to': { 'value': 2020, 'month': '3' },
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'mysql'],
          },
          'mtx': {
            'label': 'Software Developer',
            'tooltip': { 'label': 'Mackessy Technology' },
            'borderColour': 'tw-border-red-800',
            'plot': {
              'from': { 'value': 2020, 'month': '4' },
              'to': { 'value': 2022, 'month': '4' },
            },
            'tags': ['html', 'javascript', 'jquery', 'vuejs', 'css', 'php', 'laravel', 'mysql'],
          },
          'wpe': {
            'label': 'Software Engineer II',
            'tooltip': { 'label': 'WP Engine' },
            'borderColour': 'tw-border-blue-500',
            'plot': {
              'from': { 'value': 2022, 'month': '5' },
              'to': { 'value': 'now' },
            },
            'tags': ['html', 'javascript', 'css', 'react', 'golang', 'php'],
          },
          'groupProject': {
            'label': 'Group Project',
            'tooltip': {
              'label': 'Group Project With My Course',
              'github': 'https://github.com/LiamSarsfield/Web-Project',
            },
            'borderColour': 'tw-border-gray-600',
            'plot': {
              'from': { 'value': 2018, 'month': '10' },
              'to': { 'value': 2019, 'month': '5' },
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'mysql'],
          },
          'checkersBot': {
            'label': 'Checkers Bot',
            'tooltip': { 'label': 'Discord Checkers Bot', 'github': 'https://github.com/LiamSarsfield/checkers-bot' },
            'borderColour': 'tw-border-yellow-500',
            'plot': {
              'from': { 'value': 2019, 'month': '8' },
              'to': { 'value': 2020, 'month': '3' },
            },
            'tags': ['javascript', 'nodeJS'],
          },
          'auxion': {
            'label': 'auxion.net',
            'tooltip': { 'label': 'Brochure Website', 'link': 'https://auxion.net/' },
            'borderColour': 'tw-border-red-600',
            'plot': {
              'from': { 'value': 2020, 'month': '9' },
              'to': { 'value': 2021, 'month': '3' },
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
          },
          'claimlink': {
            'label': 'claimlink.net',
            'tooltip': { 'label': 'Brochure Website', 'link': 'https://www.claimlink.net/' },
            'borderColour': 'tw-border-orange-500',
            'plot': {
              'from': { 'value': 2021, 'month': '4' },
              'to': { 'value': 2021, 'month': '9' },
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
          },
          'liamsarsfield': {
            'label': 'liamsarsfield.dev',
            'tooltip': { 'label': 'This Website :)', 'github': 'https://github.com/LiamSarsfield/liamsarsfielddev' },
            'borderColour': 'tw-border-blue-600',
            'plot': {
              'from': { 'value': 2021, 'month': '10' },
              'to': { 'value': 2022, 'month': '3' },
            },
            'tags': ['html', 'javascript', 'vuejs', 'css'],
          },
        },
      },
      selectedTimelineOptions: [],
      selectedChips: new Set(),
    };
  },
  computed: {
    indexLiaison() {
      return this.$store.getters['index/getState'];
    },
    /** START: Modal Computed Properties */
    showAuxionModal: {
      get() {
        return this.indexLiaison.auxionModal.show;
      },
      set(newValue) {
        this.$store.commit('index/updateState', { auxionModal: { ...this.indexLiaison.auxionModal, show: newValue } });
      },
    },
    showDiscordCheckersModal: {
      get() {
        return this.indexLiaison.discordCheckersModal.show;
      },
      set(newValue) {
        this.$store.commit('index/updateState', {
          discordCheckersModal: {
            ...this.indexLiaison.discordCheckersModal,
            show: newValue,
          },
        });
      },
    },
    claimLinkCheckersModal: {
      get() {
        return this.indexLiaison.claimLinkCheckersModal.show;
      },
      set(newValue) {
        this.$store.commit('index/updateState', {
          claimLinkCheckersModal: {
            ...this.indexLiaison.claimLinkCheckersModal,
            show: newValue,
          },
        });
      },
    },
    /** END: Modal Computed Properties */
    allTimelineOptionsKeys() {
      return Object.keys(this.timelineOptions.tags);
    },
    allTimelineOptions() {
      return this.allTimelineOptionsKeys.map((key) => ({ value: key, ...this.timelineOptions.tags[key] }));
    },
    allTimelineOptionsSelected: {
      get() {
        return intersection(this.timelineOptions.selectedTags, this.allTimelineOptionsKeys).length === this.allTimelineOptions.length;
      },
      set(allTimelineOptionsSelected) {
        this.selectedTimelineOptions = (allTimelineOptionsSelected) ? this.allTimelineOptions : [];
      },
    },
    /**
     * Used for the Experience section on the Index page
     * @returns {{}}
     */
    timelineOptionDates() {
      let _this = this;
      let timelineEvents = _this.timelineOptions.timelineEvents;

      let timelineOptionDates = {};

      for (let timelineKey in timelineEvents) {
        let timelineEvent = timelineEvents[timelineKey];

        let timelineOptionDate = {};
        let fromDate = new Date(timelineEvent.plot.from.value, timelineEvent.plot.from.month && Number(timelineEvent.plot.from.month) - 1);
        timelineOptionDate.from = fromDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

        let toDate;
        if (timelineEvent.plot.to.value === 'now') {
          toDate = new Date();
          timelineOptionDate.to = `Currently (${toDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })})`;
        } else {
          toDate = new Date(timelineEvent.plot.to.value, timelineEvent.plot.to.month && Number(timelineEvent.plot.to.month) - 1);
          timelineOptionDate.to = `${toDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`;
        }

        let durationMonths = Number(date.getDateDiff(toDate, fromDate, 'months'));
        let numYears = Math.floor(durationMonths / 12);
        numYears = (numYears) ? (numYears === 1) ? `${numYears} Year` : `${numYears} Years` : '';
        timelineOptionDate.duration = (durationMonths % 12) ? numYears ? `${numYears}, ${durationMonths % 12} Months` :
          `${durationMonths % 12} Months` : numYears;

        timelineOptionDates[timelineKey] = timelineOptionDate;
      }

      return timelineOptionDates;
    },
  },
  watch: {
    /**
     Need to tell the timelineEvents components which timeline events must be shown.
     We do this via the selectedTags property, however it only needs a 1D array instead of an object which the selectedTimelineOptions gives us
     Convert the object to give us just the keys
     */
    selectedTimelineOptions(newTimelineOptions) {
      this.timelineOptions.selectedTags = newTimelineOptions.map((key) => key.value);
    },
    selectedChips: {
      handler(newVal) {
        let _this = this;
        if (newVal.size) {
          let timelineOptions = [];
          _this.selectedChips.forEach((key) => timelineOptions.push({ value: key, ...this.timelineOptions.tags[key] }));

          _this.selectedTimelineOptions = timelineOptions;
        } else {
          _this.selectedTimelineOptions = _this.allTimelineOptions;
        }
      },
      deep: true,
    },
  },
  methods: {
    intersection,
    toggleChipTag(tag) {
      return (this.selectedChips.has(tag)) ? this.selectedChips.delete(tag) : this.selectedChips.add(tag);
    },
  },
};
</script>

<style lang="scss">

</style>
