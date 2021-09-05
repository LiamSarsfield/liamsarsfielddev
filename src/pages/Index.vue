<template>
  <q-page class="row justify-center">
    <q-card class="col-12 col-md-8 tw-bg-primary">
      <q-card-section>
        <vue-terminal :on-mount="terminalOptions.onMount"
                      :commands="terminalOptions.commands"

                      :built-in="terminalOptions.builtIn"
                      :title="terminalOptions.title"
                      :prompt="terminalOptions.prompt"
                      :stdin.sync="terminalOptions.stdin"
                      :history.sync="terminalOptions.history"/>
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
          <img src="/img/modal-showcase/discord-checkers-bot/welcome.png" class="tw-absolute tw-w-[calc(100%-15px)]">
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
  </q-page>
</template>

<script>
import componentLiaison from 'src/store/componentLiaison';
import VueTerminal from 'components/terminal/VueTerminal';
import LsParallax from 'components/custom/LsParallax';
import LsDialog from 'components/custom/LsDialog';
import LsAnchor from 'components/custom/LsAnchor';

export default {
  name: 'PageIndex',
  components: {LsAnchor, LsDialog, VueTerminal, LsParallax},
  preFetch({store}) {
    store.registerModule('index', componentLiaison);
    store.commit('index/updateState', {'auxionModal': {show: false}, 'discordCheckersModal': {show: false}});
  },
  created() {
  },
  data: () => ({
      terminalOptions: {
        /**
         * NOTE: onMount function will be executed in the VueTerminal component, therefore "this", does NOT refer to the current component but actually VueTerminal
         */
        async onMount() {
          let _this = this;
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
              let _this = this;
              return <span class="">Current portfolio includes:
                <LsAnchor v-on:click={() => {
                  // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                  _this.$store.commit('index/updateState', {auxionModal: {...this.$store.getters['index/getState'].auxionModal, show: true}});
                }} className="tw-cursor-pointer tw-text-red-600 hover:!tw-text-red-700" underlineGradient={['tw-from-gray-700', 'tw-to-red-900']}>
                  auxion.net (Laravel/MySQL/jQuery/SCSS)
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
    }
  ),
  computed: {
    indexLiaison() {
      return this.$store.getters['index/getState'];
    },
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
  },
  methods: {},
};
</script>

<style lang="scss">

</style>
