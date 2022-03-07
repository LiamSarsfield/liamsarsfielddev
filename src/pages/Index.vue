<template>
  <q-page class="row justify-center">
    <q-card class="col-12 col-md-8 tw-bg-primary">
      <q-card-section>
        <q-expansion-item
          expand-separator
          default-opened
          header-class="!tw-bg-black">
          <template v-slot:header>
            <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
              <q-icon name="las la-stream"/>
            </q-item-section>
            <q-item-section>
              Experience
            </q-item-section>
          </template>
          <q-card class="col-12">
            <q-card>
              <q-card-section>
                <q-select
                  filled
                  v-model="selectedTimelineOptions"
                  multiple
                  :options="selectTimelineOptions"
                  label="My Languages"
                  color="secondary"
                >
                  <template v-slot:prepend>
                    <q-icon name="fas fa-layer-group"/>
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" clickable @click.stop="allTimelineOptionsSelected = false" class="cursor-pointer"/>
                  </template>
                  <template v-slot:before-options>
                    <q-item clickable :class="{'tw-text-secondary': allTimelineOptionsSelected}"
                            @click="allTimelineOptionsSelected = !allTimelineOptionsSelected">
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
                        <q-icon :name="opt.icon"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <ls-timeline v-bind="timelineOptions">
                  <template v-slot:timelineEventTooltipContent="{tooltipContent}">
                    <q-list dark separator dense class="tw--mx-[15px]">
                      <q-item class="tw-mb-2">
                        <q-item-section>
                          <q-item-label>
                            {{ timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.label }}
                          </q-item-label>
                          <q-item-label caption class="tw-pl-1 tw-flex tw-items-center">
                            <q-icon name="schedule" class="tw-pr-1"/>
                            {{
                              timelineOptionDates[tooltipContent.identifier].from
                            }} to
                            {{ timelineOptionDates[tooltipContent.identifier].to }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item dense clickable v-ripple bordered v-for="(tag) in timelineOptions.timelineEvents[tooltipContent.identifier].tags" :key="tag">
                        <q-item-section v-if="timelineOptions.tags[tag].icon" avatar>
                          <q-icon :name="timelineOptions.tags[tag].icon"/>
                        </q-item-section>
                        <q-item-section>
                          {{ timelineOptions.tags[tag].label }}
                        </q-item-section>
                      </q-item>
                      <q-item
                        v-if="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.github || timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.link"
                        class="tw-justify-end !tw-py-1">
                        <q-item-section v-if="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.github" thumbnail class="!tw-pr-2">
                          <q-btn flat color="tertiary" round
                                 icon="lab la-github" type="a" :href="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.github"
                                 target="_blank" size="md"/>
                        </q-item-section>
                        <q-item-section v-if="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.link" thumbnail class="!tw-pr-2">
                          <q-btn flat color="tertiary" round
                                 icon="launch" type="a" :href="timelineOptions.timelineEvents[tooltipContent.identifier].tooltip.link" target="_blank"/>
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
        <q-expansion-item
          expand-separator
          default-opened
          header-class="!tw-bg-black"
        >
          <template v-slot:header>
            <q-item-section avatar class="tw-pr-2 !tw-min-w-0 ">
              <q-icon name="code"/>
            </q-item-section>
            <q-item-section>
              About Me
            </q-item-section>
          </template>
          <vue-terminal :on-mount="terminalOptions.onMount"
                        :commands="terminalOptions.commands"

                        :built-in="terminalOptions.builtIn"
                        :title="terminalOptions.title"
                        :prompt="terminalOptions.prompt"
                        v-model:stdin="terminalOptions.stdin"
                        v-model:history="terminalOptions.history"
                        ref="vueTerminal"
          />
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
              <ls-anchor href="https://auxion.net" className="tw-relative tw-flex tw-justify-center tw-align-center tw-py-2 tw-text-white">
                auxion.net
                <q-icon name="launch" class="tw-ml-1 tw-my-auto"></q-icon>
              </ls-anchor>
            </div>
          </div>
          <q-list class="tw-text-lg tw-relative q-dark" separator>
            <q-item>
              <q-item-section>
                Brochure website developed for one of Mackessy Technology’s products which sells salvaged vehicles in an auction format.
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
                Mobile compatible with a priority on engagement, ease of use and compatibility.
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
        <q-separator/>
        <q-card-actions align="right">
          <q-btn flat color="tertiary" round icon="launch" type="a" href="https://auxion.net" target="_blank"/>
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
              <ls-anchor href="https://www.claimlink.net/" className="tw-relative tw-flex tw-justify-center tw-align-center tw-py-2 tw-text-white">
                www.claimlink.net
                <q-icon name="launch" class="tw-ml-1 tw-my-auto"></q-icon>
              </ls-anchor>
            </div>
          </div>
          <q-list class="tw-text-lg tw-relative q-dark" separator>
            <q-item>
              <q-item-section>
                Brochure website developed for one of Mackessy Technology’s products which sells salvaged vehicles in an auction format.
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Displays a carousel of current salvage vehicles in auction that pulls data frequently from the platform.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn flat color="tertiary" round icon="launch" type="a" href="https://www.claimlink.net/" target="_blank"/>
        </q-card-actions>
      </q-card>
    </ls-dialog>
    <ls-dialog v-model="showDiscordCheckersModal">
      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/discord-checkers-bot/discord-checkers.png" class="tw-absolute tw-w-[calc(100%-15px)]">
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
          </q-list>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn flat color="tertiary" round icon="launch" type="a" href="https://discord.gg/RnAv9ZwPMY" target="_blank"/>
          <q-btn flat color="tertiary" round icon="lab la-github" type="a" href="https://github.com/LiamSarsfield/checkers-bot" target="_blank"/>
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
import {isEqual, clone} from 'lodash';

// Needed so JSX event handlers can point to the store (which is updated in this event handler's hook)
let _store = null;
export default {
  name: 'PageIndex',
  components: {LsTimeline, LsAnchor, LsDialog, VueTerminal, LsParallax},
  /** https://quasar.dev/quasar-cli/prefetch-feature
   * "The preFetch hook runs only once, when the app boots up, so you can use this opportunity to initialize the Vuex Store here." */
  preFetch({store}) {
    store.registerModule('index', componentLiaison);
    store.commit('index/updateState', {'auxionModal': {show: false}, 'discordCheckersModal': {show: false}, 'claimLinkCheckersModal': {show: false}});
  },
  /** START: Lifecycle Hooks */
  created() {
    _store = this.$store;
    // Select all timeline options by default
    this.selectedTimelineOptions = this.selectTimelineOptions;
  },
  async mounted() {
    let _this = this;

    await _this.$nextTick();
    let vueCommandRef = _this.$refs.vueTerminal;
    let commands = ['whoami', 'htop', 'vmstat'];
    let executionOptions = {terminalOptionsKey: this, typingAnimation: true, typingSpeed: 150};
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
          'htop': () => <span>I have 2 years experience working with PHP (Laravel), MySQL, jQuery/JavaScript and CSS. I have also dabbled with NodeJS. I am
                currently experimenting into Vue, GraphQL and Docker.</span>,
          'vmstat': function() {
            return <span class="">Current portfolio includes:
                <LsAnchor onClick={() => {
                  // Communicate to the Index State that the Auxion, ClaimLink Modal, etc. needs to show when the user clicks the link
                  _store.commit('index/updateState', {auxionModal: {..._store.getters['index/getState'].auxionModal, show: true}});
                }} className="tw-cursor-pointer tw-text-red-600 hover:!tw-text-red-700" underlineGradient={['tw-from-gray-700', 'tw-to-red-900']}>
                  auxion.net (Laravel/MySQL/jQuery/SCSS)</LsAnchor>,
                <LsAnchor onClick={() => {
                  _store.commit('index/updateState',
                    {claimLinkCheckersModal: {..._store.getters['index/getState'].claimLinkCheckersModal, show: true}});
                }} className="tw-cursor-pointer tw-text-orange-500 hover:!tw-text-orange-600" underlineGradient={['tw-from-gray-700', 'tw-to-orange-500']}>
                  claimlink.net (Laravel/MySQL/jQuery/SCSS)</LsAnchor>,
                <LsAnchor onClick={() => {
                  _store.commit('index/updateState', {discordCheckersModal: {..._store.getters['index/getState'].discordCheckersModal, show: true}});
                }} className="tw-cursor-pointer tw-text-yellow-500 hover:!tw-text-yellow-600" underlineGradient={['tw-from-gray-700', 'tw-to-yellow-800']}>
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
          'html': {'label': 'HTML', 'icon': 'fab fa-html5'},
          'javascript': {'label': 'JavaScript', 'icon': 'fab fa-js'},
          'jquery': {'label': 'jQuery', 'icon': 'fab fa-js-square'},
          'vuejs': {'label': 'Vue.js', 'icon': 'fab fa-vuejs'},
          'nodeJS': {'label': 'NodeJS', 'icon': 'fab fa-node'},
          'css': {'label': 'CSS', 'icon': 'fab fa-css3-alt'},
          'php': {'label': 'PHP', 'icon': 'fab fa-php'},
          'laravel': {'label': 'Laravel', 'icon': 'fab fa-laravel'},
          'codeigniter': {'label': 'CodeIgniter', 'icon': 'code'},
          'mysql': {'label': 'MySQL', 'icon': 'fas fa-database'},
          'java': {'label': 'Java', 'icon': 'fab fa-java'},
        },
        'selectedTags': [],
        'timestamps': ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        'timelineEvents': {
          'internetSystemsDevelopment': {
            'label': 'B.S. in Internet Systems Development',
            'tooltip': {'label': 'Limerick Institute Of Technology'},
            'borderColour': 'tw-border-yellow-300',
            'plot': {
              'from': {'value': 2016, 'month': '4'},
              'to': {'value': 2019, 'month': '8'},
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'java', 'mysql'],
          },
          'courseco': {
            'label': 'Full Stack Web Developer',
            'tooltip': {'label': 'CourseCo'},
            'borderColour': 'tw-border-green-400',
            'plot': {
              'from': {'value': 2019, 'month': '3'},
              'to': {'value': 2020, 'month': '3'},
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'mysql'],
          },
          'mtx': {
            'label': 'Software Developer',
            'tooltip': {'label': 'Mackessy Technology'},
            'borderColour': 'tw-border-red-800',
            'plot': {
              'from': {'value': 2020, 'month': '3'},
              'to': {'value': 'now'},
            },
            'tags': ['html', 'javascript', 'jquery', 'vuejs', 'css', 'php', 'laravel', 'mysql'],
          },
          'groupProject': {
            'label': 'Group Project',
            'tooltip': {'label': 'Group Project With My Course', 'github': 'https://github.com/LiamSarsfield/Web-Project'},
            'borderColour': 'tw-border-gray-600',
            'plot': {
              'from': {'value': 2018, 'month': '10'},
              'to': {'value': 2019, 'month': '5'},
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'codeigniter', 'mysql'],
          },
          'checkersBot': {
            'label': 'Checkers Bot',
            'tooltip': {'label': 'Discord Checkers Bot', 'github': 'https://github.com/LiamSarsfield/checkers-bot'},
            'borderColour': 'tw-border-yellow-500',
            'plot': {
              'from': {'value': 2019, 'month': '8'},
              'to': {'value': 2020, 'month': '3'},
            },
            'tags': ['javascript', 'nodeJS'],
          },
          'auxion': {
            'label': 'auxion.net',
            'tooltip': {'label': 'Brochure Website', 'link': 'https://auxion.net/'},
            'borderColour': 'tw-border-red-600',
            'plot': {
              'from': {'value': 2020, 'month': '9'},
              'to': {'value': 2021, 'month': '3'},
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
          },
          'claimlink': {
            'label': 'claimlink.net',
            'tooltip': {'label': 'Brochure Website', 'link': 'https://www.claimlink.net/'},
            'borderColour': 'tw-border-orange-500',
            'plot': {
              'from': {'value': 2021, 'month': '3'},
              'to': {'value': 2021, 'month': '9'},
            },
            'tags': ['html', 'javascript', 'jquery', 'css', 'php', 'laravel', 'mysql'],
          },
          'liamsarsfield': {
            'label': 'liamsarsfield.dev',
            'tooltip': {'label': 'This Website :)', 'github': 'https://github.com/LiamSarsfield/liamsarsfielddev'},
            'borderColour': 'tw-border-blue-600',
            'plot': {
              'from': {'value': 2021, 'month': '9'},
              'to': {'value': 2022, 'month': '2'},
            },
            'tags': ['html', 'javascript', 'vuejs', 'css'],
          },
        },
      },
      selectedTimelineOptions: [],
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
        this.$store.commit('index/updateState', {auxionModal: {...this.indexLiaison.auxionModal, show: newValue}});
      },
    },
    showDiscordCheckersModal: {
      get() {
        return this.indexLiaison.discordCheckersModal.show;
      },
      set(newValue) {
        this.$store.commit('index/updateState', {discordCheckersModal: {...this.indexLiaison.discordCheckersModal, show: newValue}});
      },
    },
    claimLinkCheckersModal: {
      get() {
        return this.indexLiaison.claimLinkCheckersModal.show;
      },
      set(newValue) {
        this.$store.commit('index/updateState', {claimLinkCheckersModal: {...this.indexLiaison.claimLinkCheckersModal, show: newValue}});
      },
    },
    /** END: Modal Computed Properties */
    timelineOptionsKey() {
      return Object.keys(this.timelineOptions.tags);
    },
    selectTimelineOptions() {
      return this.timelineOptionsKey.map((key) => ({value: key, ...this.timelineOptions.tags[key]}));
    },
    allTimelineOptionsSelected: {
      get() {
        return isEqual(clone(this.timelineOptionsKey).sort(), clone(this.timelineOptions.selectedTags).sort());
      },
      set(allTimelineOptionsSelected) {
        this.selectedTimelineOptions = (allTimelineOptionsSelected) ? this.selectTimelineOptions : [];
      },
    },
    timelineOptionDates() {
      let _this = this;
      let timelineEvents = _this.timelineOptions.timelineEvents;

      let timelineOptionDates = {};
      for (let timelineKey in timelineEvents) {
        let timelineEvent = timelineEvents[timelineKey];

        let timelineOptionDate = {};
        let fromDate = new Date(timelineEvent.plot.from.value, Number(timelineEvent.plot.from.month) - 1);
        timelineOptionDate.from = fromDate.toLocaleDateString('en-US',
          {year: 'numeric', month: 'short'});

        if (timelineEvent.plot.to.value === 'now') {
          timelineOptionDate.to = `Currently (${(new Date()).toLocaleDateString('en-US', {year: 'numeric', month: 'short'})})`;
        } else {
          timelineOptionDate.to = (new Date(timelineEvent.plot.to.value, Number(timelineEvent.plot.to.month) - 1)).toLocaleDateString('en-US',
            {year: 'numeric', month: 'short'});
        }

        timelineOptionDates[timelineKey] = timelineOptionDate;
      }

      return timelineOptionDates;
    },
  },
  watch: {
    selectedTimelineOptions(newTimelineOptions) {
      /*
        Need to tell the timelineEvents components which timeline events must be shown.
        We do this via the selectedTags property, however it only selects a 1D array instead of an object which the selectedTimelineOptions gives us
        Convert the object to give us just the keys
       */
      this.timelineOptions.selectedTags = newTimelineOptions.map((key) => key.value);
    },
  },
  methods: {},
};
</script>

<style lang="scss">
</style>
