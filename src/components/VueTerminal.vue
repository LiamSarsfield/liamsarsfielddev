<template>
  <vue-command class="vue-terminal-child"
               :commands="commands"
               :built-in="builtIn"
               :title="title"
               :prompt="prompt"
               :stdin.sync=stdinBind
               :history.sync="historyBind"
  />
</template>

<script>
import VueCommand, {createStdout, createStderr, createDummyStdout} from 'vue-command';
import 'vue-command/dist/vue-command.css';

export default {
  name: 'VueTerminal',
  components: {VueCommand},
  /** START: Lifecycle Hooks */
  mounted() {
    this.onMount(this);
  },
  /** END: Lifecycle Hooks */
  props: {
    onMount: {
      type: Function,
      default: () => {
      }
    },
    /** START: Vue-Commands data */
    commands: {
      type: Object,
    },
    builtIn: {
      type: Function,
    },
    title: {
      type: String,
    },
    prompt: {
      type: String,
    },
    stdin: {
      type: String,
    },
    history: {
      type: Array,
    }
    /** END: Vue-Commands data */
  },
  data() {
    return {};
  },
  computed: {
    stdinBind: {
      get() {
        return this.stdin;
      },
      set(newValue) {
        this.$emit("update:stdin", newValue);
      }
    },
    historyBind: {
      get() {
        return this.history;
      },
      set(newValue) {
        this.$emit("update:history", newValue);
      }
    }
  },
  watch: {},
  methods: {
    /**
     *
     * @param command
     * @param options
     */
    async executeTermCommand(command, options = {}) {
      let _this = this;
      let defaultOptions = {
        // The key at which all the terminal properties are kept
        terminalOptionsKey: _this,
        typingAnimation: false,
        typingSpeed: 100,
      }
      // Merge the options together
      options = {...defaultOptions, ...options};
      let terminalOptions = options.terminalOptionsKey;

      // Ensure we wait for the page to rerender, the command may not show fully
      await _this.$nextTick();
      if (options.typingAnimation) {
        await _this.typing("stdinBind", command, {dataOptionsKey: terminalOptions, typingSpeed: options.typingSpeed})
      } else {
        terminalOptions.stdinBind = command;
      }
      if (typeof terminalOptions.commands[command] === "function") {
        terminalOptions.history.push(terminalOptions.commands[command]());
      } else {
        terminalOptions.history.push(createStdout(`${command}: command not found`));
      }
      _this.stdinBind = "";

    }
  }

}
</script>

<style lang="scss" scoped>
.vue-terminal-child ::v-deep {
  .term-stdin > input {
    cursor: text !important;
  }
}
</style>
