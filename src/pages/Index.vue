<template>
  <q-page class="row justify-center">
    <q-card class="col-12 col-md-8 tw-bg-primary">
      <q-card-section>
        <q-expansion-item
          expand-separator
          default-opened
          header-class="!tw-bg-black"
        >
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
                <q-btn @click="clickMe">Click me</q-btn>
                <q-select
                  filled
                  v-model="timelineOptions.selectedTags"
                  multiple
                  :options="Object.keys(this.timelineOptions.tags)"
                  :option-label="(timelineTagKey) => this.timelineOptions.tags[timelineTagKey].label"
                  label="Multiple"
                  style="width: 250px"
                />
                <ls-timeline v-bind="timelineOptions"/>
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
                        :stdin.sync="terminalOptions.stdin"
                        :history.sync="terminalOptions.history"/>
        </q-expansion-item>
      </q-card-section>
    </q-card>
    <ls-dialog v-model="showAuxionModal"
               content-class="about-project-dialog"
    >

      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/auxion/auxion-site.jpeg" class="tw-absolute tw-w-[calc(100%-15px)]">
        </div>
        <q-card-section class="tw-p-0 scroll parallax-about-scroll parallax-scroll-target tw-max-h-[50vh]">
          <div class="tw-h-[300px] tw-flex tw-flex-col">
            <div class="tw-relative tw-group tw-text-4xl tw-mt-auto">
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
    <ls-dialog v-model="showDiscordCheckersModal">
      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/discord-checkers-bot/discord-checkers.png" class="tw-absolute tw-w-[calc(100%-15px)]">
        </div>
        <q-card-section class="tw-p-0 scroll parallax-about-scroll parallax-scroll-target tw-max-h-[50vh]">
          <div class="tw-h-[300px] tw-flex tw-flex-col">
            <div class="tw-relative tw-group tw-text-4xl tw-mt-auto">
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
          </q-list>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn flat color="tertiary" round icon="launch" type="a" href="https://discord.gg/RnAv9ZwPMY" target="_blank"/>
          <q-btn flat color="tertiary" round icon="lab la-github" type="a" href="https://github.com/LiamSarsfield/checkers-bot" target="_blank"/>
        </q-card-actions>
      </q-card>
    </ls-dialog>
    <ls-dialog v-model="claimLinkCheckersModal">
      <q-card class="!tw-w-[1120px] !tw-max-w-[80vw] text-caption">
        <div class="tw-h-[300px] tw-w-full tw-absolute tw-overflow-hidden tw-flex tw-justify-center">
          <img src="/img/modal-showcase/claimlink/claimlink-site-lg.png" class="tw-absolute tw-w-[calc(100%-15px)]">
        </div>
        <q-card-section class="tw-p-0 scroll parallax-about-scroll parallax-scroll-target tw-max-h-[50vh]">
          <div class="tw-h-[300px] tw-flex tw-flex-col">
            <div class="tw-relative tw-group tw-text-4xl tw-mt-auto">
              <div
                class="tw-absolute tw-w-full tw-h-full group-hover:tw-bg-red-900 group-hover:tw-bg-none group-hover:tw-opacity-90 tw-bg-gradient-to-r tw-from-black tw-to-red-900 tw-opacity-70">
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
  </q-page>
</template>

<script>
import componentLiaison from 'src/store/componentLiaison';
import VueTerminal from 'components/terminal/VueTerminal';
import LsParallax from 'components/custom/LsParallax';
import LsDialog from 'components/custom/LsDialog';
import LsAnchor from 'components/custom/LsAnchor';
import LsTimeline from 'components/custom/LsTimeline';
import {merge} from 'lodash';

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
  },
  /** END: Lifecycle Hooks */
  data() {
    return {
      terminalOptions: {
        /**
         * NOTE: onMount function will be executed in the VueTerminal component, therefore "this", does NOT refer to the current component but actually VueTerminal
         */
        async onMount() {
          const _this = this;
          let commands = ['whoami', 'htop', 'vmstat'];
          let executionOptions = {terminalOptionsKey: this, typingAnimation: false, typingSpeed: 150};
          for (let i = 0; i < commands.length; i++) {
            await _this.executeTermCommand(commands[i], executionOptions);
            await _this.sleep(500);
          }
        },
        commands: {
          // _this in the below objects refers to the VueTerminal Vue Instance
          'whoami': () =>
            function(h) {
              return <span>Enthusiastic web developer with a passion for software development and full-stack web development.</span>;
            },
          'htop': () =>
            function(h) {
              return <span>I have 2 years experience working with PHP (Laravel), MySQL, jQuery/JavaScript and CSS. I have also dabbled with NodeJS. I am
                currently experimenting into Vue, GraphQL and Docker.</span>;
            },
          'vmstat': () =>
            function(h) {
              const _this = this;
              return <span class="">Current portfolio includes:
                <LsAnchor v-on:click={() => {
                  // Communicate to the Index State that the Auxion, ClaimLink Modal, etc. needs to show when the user clicks the link
                  _this.$store.commit('index/updateState', {auxionModal: {...this.$store.getters['index/getState'].auxionModal, show: true}});
                }} className="tw-cursor-pointer tw-text-red-600 hover:!tw-text-red-700" underlineGradient={['tw-from-gray-700', 'tw-to-red-900']}>
                  auxion.net (Laravel/MySQL/jQuery/SCSS)
                </LsAnchor>, <LsAnchor v-on:click={() => {
                  _this.$store.commit('index/updateState',
                    {claimLinkCheckersModal: {...this.$store.getters['index/getState'].claimLinkCheckersModal, show: true}});
                }} className="tw-cursor-pointer tw-text-yellow-500 hover:!tw-text-yellow-600" underlineGradient={['tw-from-gray-700', 'tw-to-yellow-800']}>
                  claimlink.net (Laravel/MySQL/jQuery/SCSS)
                </LsAnchor>, <LsAnchor v-on:click={() => {
                  _this.$store.commit('index/updateState', {discordCheckersModal: {...this.$store.getters['index/getState'].discordCheckersModal, show: true}});
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
          'html': {'label': 'HTML'},
          'javascript': {'label': 'JavaScript'},
          'jquery': {'label': 'jQuery'},
          'vuejs': {'label': 'Vue.js'},
          'css': {'label': 'CSS'},
          'nodeJS': {'label': 'NodeJS'},
          'php': {'label': 'PHP'},
          'laravel': {'label': 'Laravel'},
          'codeigniter': {'label': 'CodeIgniter'},
          'mysql': {'label': 'MySQL'},
          'java': {'label': 'Java'},
        },
        'selectedTags': [],
        'timestamps': ['2016', '2017', '2018', '2019', '2020', '2021'],
        'timelineEvents': {
          'internetSystemsDevelopment': {
            'label': 'B.S. in Internet Systems Development', 'tooltip': {'label': 'Limerick Institute Of Technology'},
            'styleProps': {'borderColour': 'tw-border-yellow-300'},
            'plot': {
              'from': {'value': 2016, 'month': '4'},
              'to': {'value': 2019, 'month': '8'},
            },
            'tags': ['html', 'javascript'],
          },
          'courseco': {
            'label': 'Full Stack Web Developer', 'tooltip': {'label': 'CourseCo'},
            'styleProps': {'borderColour': 'tw-border-green-400'},
            'plot': {
              'from': {'value': 2019, 'month': '3'},
              'to': {'value': 2020, 'month': '3'},
            },
          },
          'mtx': {
            'label': 'Software Developer', 'tooltip': {'label': 'Mackessy Technology'},
            'styleProps': {'borderColour': 'tw-border-red-800'},
            'plot': {
              'from': {'value': 2020, 'month': '3'},
              'to': {'value': 2021},
            },
          },
          'groupProject': {
            'label': 'Group Project', 'tooltip': {'label': 'Web Project Tooltip'},
            'styleProps': {'borderColour': 'tw-border-gray-600'},
            'plot': {
              'from': {'value': 2018, 'month': '10'},
              'to': {'value': 2019, 'month': '5'},
            },
          },
          'checkersBot': {
            'label': 'Checkers Bot', 'tooltip': {'label': 'Discord Checkers Bot'},
            'styleProps': {'borderColour': 'tw-border-teal-900'},
            'plot': {
              'from': {'value': 2019, 'month': '8'},
              'to': {'value': 2020, 'month': '3'},
            },
          },
          'auxion': {
            'label': 'auxion.net', 'tooltip': {'label': 'Web Project Tooltip'},
            'styleProps': {'borderColour': 'tw-border-red-600'},
            'plot': {
              'from': {'value': 2020, 'month': '9'},
              'to': {'value': 2021, 'month': '3'},
            },
          },
          'claimlink': {
            'label': 'claimlink', 'tooltip': {'label': 'Web Project Tooltip'},
            'styleProps': {'borderColour': 'tw-border-blue-600'},
            'plot': {
              'from': {'value': 2021, 'month': '3'},
              'to': {'value': 2021, 'month': '9'},
            },
          },
        },
      },
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
  },
  methods: {
    clickMe() {
      /** "Vue cannot detect property addition or deletion", instead use the $set function
       * https://vuejs.org/v2/guide/reactivity.html#For-Objects */
      this.$set(this.timelineOptions.timelineEvents.internetSystemsDevelopment.styleProps, 'classes',
        merge(this.timelineOptions.timelineEvents.internetSystemsDevelopment.styleProps.classes, {'slide-out': true}));
    },
  },
};
</script>

<style lang="scss">
</style>
