<template>
  <q-page class="row justify-center">
    <q-card class="col-8 my-card">
      <q-card-section>
        <div class="text-h6 ">Hey there :) thanks for visiting my site</div>
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
import VueCommand, {createStdout, createStderr, createDummyStdout} from 'vue-command';
import 'vue-command/dist/vue-command.css';
import VueTerminal from "components/VueTerminal";

export default {
  name: 'PageIndex',
  components: {VueTerminal},
  created() {
  },
  mounted() {
    let _this = this;
  },
  data: () => ({
    terminalOptions: {
      /**
       * NOTE: This function will be executed in the VueTerminal component, therefore "this", does NOT refer to the current component but actually VueTerminal
       */
      async onMount() {
        let _this = this;
        let commands = ["whoami", "htop", "vmstat"];
        let executionOptions = {terminalOptionsKey: this, typingAnimation: true, typingSpeed: 150};
        for (let i = 0; i < commands.length; i++) {
          await _this.executeTermCommand(commands[i], executionOptions);
          await _this.sleep(500);
        }
      },
      commands: {
        'whoami': () => createStdout('Enthusiastic web developer with a passion for software development and full-stack web development.'),
        'htop': () => createStdout('I have 2 years experience working with PHP (Kohana/Laravel), MySQL, jQuery/CSS. I have also dabbled with NodeJS. I am currently experimenting into Vue, GraphQL and Docker.'),
        'vmstat': () => createStdout('Current portfolio includes: auxion.net (Laravel/MySQL/jquery/SCSS), Discord checkers bot (NodeJS/Discord API), and this website(Vue/Quasar Framework/Docker).'),
      },
      watch: {},
      history: [],
      title: 'liamsarsfielddev@index: ~',
      prompt: '~liamsarsfielddev@index:#/',
      builtIn: undefined,
      stdin: '',
    },
  }),
}
</script>
