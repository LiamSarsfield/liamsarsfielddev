<template>
  <q-page class="row justify-center">
    <q-card class="col-8 my-card">
      <q-card-section>
        <div class="text-h6">Hey there :) thanks for visiting my site</div>
        <q-dialog v-model="showAuxionModal">
          <q-card class="my-card" style="width: 920px; max-width: 80vw;">
            <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
              <div class="text-caption text-grey">
                <div class="tw-mr-[-15px] tw-ml-[-15px] tw-100">
                  <q-img src="img/auxion-site.png" class="tw-w-full">
                    <div class="absolute-bottom text-subtitle1 text-center !tw-bg-opacity-80 !tw-bg-teal-900">
                      <a href="https://auxion.net/" target="_blank" class="tw-no-underline tw-group tw-relative tw-transition hover:!tw-text-blue-300 tw-text-lg tw-text-white tw-cursor-pointer">
                        www.auxion.net
                        <span class="group-hover:tw-w-full tw-w-0 tw-h-[1px] tw-bg-gradient-to-r tw-from-green-400 tw-to-blue-500 tw-ease-in-out tw-transition-bg-width tw-duration-500 tw-absolute tw-bottom-0 tw-left-0"></span>
                      </a>
                    </div>
                  </q-img>
                </div>
                <q-list class="tw-mr-[-15px] tw-ml-[-15px]" separator>
                  <q-item>
                    <q-item-section>
                      Brochure website developed for one of Mackessy Technology’s products which provides daily auctions on salvaged vehicles.
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      Displays a carousel of current salvage vehicles in auction that pulls data frequently from the platform.
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      Uses jQuery parsed with Laravel Webpack to provide a modern UX on mobile and desktop.
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-parallax :height="300"
                          src="img/auxion-site-registration.png">
                      </q-parallax>
                      Salvage Agents can register for the platform using an online registration form.
                    </q-item-section>
                  </q-item>
                </q-list>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
              </div>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Reserve"/>
              <q-btn v-close-popup flat color="primary" round icon="event"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
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
  </q-page>
</template>

<script>
import {QBtn} from 'quasar';
import componentLiaison from 'src/store/componentLiaison';
import VueCommand, {createStdout, createStderr, createDummyStdout} from 'vue-command';
import VueTerminal from "components/terminal/VueTerminal";

export default {
  name: 'PageIndex',
  components: {VueTerminal},
  preFetch({store}) {
    store.registerModule('index', componentLiaison)
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
            let commands = ["whoami", "htop", "vmstat"];
            let executionOptions = {terminalOptionsKey: this, typingAnimation: false, typingSpeed: 150};
            for (let i = 0; i < commands.length; i++) {
              await _this.executeTermCommand(commands[i], executionOptions);
              await _this.sleep(500);
            }
          },
          commands: {
            // _this in the below objects refers to the VueTerminal Vue Instance
            'whoami': () =>
                function (h) {
                  let _this = this;
                  return <span v-on:click={() => {
                    // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                    _this.$store.commit('index/updateState', {showAuxionModal: true});
                  }}>Enthusiastic web developer with a passion for software development and full-stack web development.</span>
                },
            'htop': () =>
                function (h) {
                  let _this = this;
                  return <span v-on:click={() => {
                    // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                    _this.$store.commit('index/updateState', {showAuxionModal: true});
                  }}>I have 2 years experience working with PHP (Kohana/Laravel), MySQL, jQuery/CSS. I have also dabbled with NodeJS. I am currently experimenting into Vue, GraphQL and Docker.</span>
                },
            'vmstat': () =>
                function (h) {
                  let _this = this;
                  return <span class="">Current portfolio includes: <a v-on:click={() => {
                    // Communicate to the Index Component that the Auxion Modal needs to show when the user clicks the link
                    _this.$store.commit('index/updateState', {showAuxionModal: true});
                  }} class="tw-group tw-relative tw-transition hover:!tw-text-blue-400 tw-text-lg tw-text-green-400 tw-cursor-pointer">auxion.net (Laravel/MySQL/jquery/SCSS)<span
                      class="group-hover:tw-w-full tw-w-0 tw-h-[1px] tw-bg-gradient-to-r tw-from-green-400 tw-to-blue-500 tw-ease-in-out tw-transition-bg-width tw-duration-500 tw-absolute tw-bottom-0 tw-left-0"
                  ></span></a>, Discord checkers bot (NodeJS/Discord API), and this website(Vue/Quasar Framework/Docker).</span>
                },
          },
          styles: {
            backgroundColor: 'red'
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
      }
    }
  },
  methods: {}
}
</script>

<style>
</style>
