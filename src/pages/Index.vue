<template>
  <q-page class="row justify-center">
    <q-card class="col-8 my-card">
      <q-card-section>
        <div class="text-h6">Hey there :) thanks for visiting my site</div>
      </q-card-section>
      <q-separator dark inset/>
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
               ref="projectDialog"
               content-class="about-project-dialog"
               :has-parallax="true"
    >
      <q-card class="my-card" style="width: 920px; max-width: 80vw;">
        <q-card-section ref="projectDialogScroll"
                        class="q-pt-none scroll parallax-scroll parallax-about-scroll"
                        style="max-height: 50vh">
          <div class="text-caption text-grey">
            <div class="tw-mr-[-15px] tw-ml-[-15px] tw-mt-[-3vw]">
              <ls-parallax :height="300"
                           class="parallax-about"
                           scale="0.375"
                           scroll-target=".parallax-about-scroll">
                <template>
                  <div
                    class="tw-absolute tw-bottom-0 tw-w-full tw-py-2 tw-text-center tw-text-gray-200 tw-text-4xl">
                    <div class="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-gradient-to-r tw-from-black tw-to-red-900 tw-opacity-70">
                    </div>
                    <span class="tw-relative">
                      auxion.net
                      <q-icon name="link"></q-icon>
                    </span>
                  </div>
                </template>
                <template v-slot:media>
                  <img src="img/auxion-site.jpeg" class="parallax-about-img">
                </template>
              </ls-parallax>
            </div>
            <q-list class="tw-mr-[-15px] tw-ml-[-15px]" separator>
              <q-item>
                <q-item-section>
                  Brochure website developed for one of Mackessy Technology’s products which provides daily auctions on
                  salvaged vehicles.
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  Displays a carousel of current salvage vehicles in auction that pulls data frequently from the
                  platform.
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <ls-parallax :height="220" scale="0.55" class="parallax-about" scroll-target=".parallax-about-scroll">
                    <template>
                      <div
                        class="tw-absolute tw-bottom-0 tw-w-full tw-py-2 tw-text-center tw-text-gray-200 tw-text-xl tw-bg-black tw-bg-opacity-70">
                        Salvage Agents can register for the platform using an online registration form.
                      </div>
                    </template>
                    <template v-slot:media>
                      <img class="parallax-img-about" src="img/auxion-site-registration.png">
                    </template>
                  </ls-parallax>
                </q-item-section>
              </q-item>
            </q-list>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
            labore.

          </div>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve"/>
          <q-btn v-close-popup flat color="primary" round icon="event"/>
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
  components: {LsDialog, VueTerminal, LsParallax},
  preFetch({store}) {
    store.registerModule('index', componentLiaison);
    store.commit('index/updateState', {'showAuxionModal': false});
  },
  created() {
  },
  mounted() {
    let _this = this;
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
              let _this = this;
              return <span v-on:click={() => {
                // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                _this.$store.commit('index/updateState', {showAuxionModal: true});
              }}>Enthusiastic web developer with a passion for software development and full-stack web development.</span>;
            },
          'htop': () =>
            function(h) {
              let _this = this;
              return <span v-on:click={() => {
                // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                _this.$store.commit('index/updateState', {showAuxionModal: true});
              }}>I have 2 years experience working with PHP (Kohana/Laravel), MySQL, jQuery/CSS. I have also dabbled with NodeJS. I am currently experimenting into Vue, GraphQL and Docker.</span>;
            },
          'vmstat': () =>
            function(h) {
              let _this = this;
              return <span class="">Current portfolio includes:
                <LsAnchor  v-on:click={() => {
                  // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                  _this.$store.commit('index/updateState', {showAuxionModal: true});
                }} className="tw-cursor-pointer tw-text-lg tw-text-green-400 hover:!tw-text-blue-400" underlineGradient={['tw-from-green-400',
                  'tw-to-blue-500']}>
                  auxion.net (Laravel/MySQL/jquery/SCSS)
                </LsAnchor>
                <a v-on:click={() => {
                  // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                  _this.$store.commit('index/updateState', {showAuxionModal: true});
                }}
                   class="tw-text-lg tw-text-green-400 tw-cursor-pointer tw-group tw-relative tw-transition hover:!tw-text-blue-400">
                auxion.net (Laravel/MySQL/jquery/SCSS)
                <span
                  class="tw-w-0 tw-h-[1px] group-hover:tw-w-full tw-bg-gradient-to-r tw-from-green-400 tw-to-blue-500 tw-ease-in-out tw-transition-bg-width tw-duration-500 tw-absolute tw-bottom-0 tw-left-0"
                ></span></a>, Discord checkers bot (NodeJS/Discord API), and this website(Vue/Quasar Framework/Docker).</span>;
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
        return this.indexLiaison.showAuxionModal;
      },
      set(newValue) {
        this.$store.commit('index/updateState', {showAuxionModal: newValue});
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss">

</style>
