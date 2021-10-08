<template>
  <div class="vue-terminal-parent tw-text-base tw-font-light" :style="cssVars">
    <vue-command class="vue-terminal-command"
                 :commands="commands"
                 :built-in="builtIn"
                 :title="title"
                 :prompt="prompt"
                 :stdin.sync=stdinBind
                 :history.sync="historyBind"
    >
      <div class="tw-flex tw-justify-center tw-border-0 tw-border-b-[1px] tw-border-solid tw-border-gray-800 tw-bg-primary tw-bg-opacity-30 tw-py-2"
           slot="bar">
        {{ title }}
      </div>
      <span class="term-ps" slot="prompt">
      {{ prompt }}
      </span>
    </vue-command>
  </div>
</template>

<script>
import VueCommand, {createStdout} from 'vue-command';

export default {
  name: 'VueTerminal',
  components: {VueCommand},
  /** START: Lifecycle Hooks */
  mounted() {},
  /** END: Lifecycle Hooks */
  props: {
    /** START: Vue-Commands data */
    commands: {
      /**
       * Each property in the commands Object must either be a rendered component object
       * OR an on-the-fly anonymous component (with JSX) which will be a function with a parameter 'h' (for JSX)
       */
      type: Object,
    },
    /**
     * We can customise the VueTerminal with this object
     * We will convert the styles data variables to CSS variables, where we can use them if they exist, otherwise we can set defaults using SCSS variables
     */
    styles: {
      backgroundColor: {
        type: String,
      },
    },
    /** START: Properties used in vue-command */
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
    },
    /** END: Properties used in vue-command */
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
        this.$emit('update:stdin', newValue);
      },
    },
    historyBind: {
      get() {
        return this.history;
      },
      set(newValue) {
        this.$emit('update:history', newValue);
      },
    },
    cssVars() {
      let cssVars = {};
      for (let cssProp in this.styles) {
        cssVars[`--${cssProp}`] = this.styles[cssProp];
      }
      return cssVars;
    },
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
      };
      // Merge the options together
      options = {...defaultOptions, ...options};
      let terminalOptions = options.terminalOptionsKey;

      if (options.typingAnimation) {
        await _this.typing('stdinBind', command, {dataOptionsKey: terminalOptions, typingSpeed: options.typingSpeed});
      } else {
        _this.stdinBind = command;
      }
      // Ensure we wait for the page to rerender, otherwise the command may not show fully
      await _this.$nextTick();

      if (typeof terminalOptions.commands[command] === 'function') {
        /*
         * We know the command exists, we can execute it
         * However, we render the command's response either through an existing component or an anonymous component.
         * Existing components are an object, whereas an anonymous component we assume will be a function, which we will make into an object
         */
        let terminalCommand = terminalOptions.commands[command]();
        terminalCommand = (typeof terminalCommand === 'function') ? {render: terminalCommand} : terminalCommand;
        terminalOptions.history.push(terminalCommand);
      } else {
        terminalOptions.history.push(createStdout(`${command}: command not found`));
      }
      _this.stdinBind = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-terminal-command::v-deep {
  font-family: 'Roboto Mono', monospace;
  background-color: var(--q-color-dark, $dark);
  word-break: break-word;


  .term-std {
    padding: 8px;

    .term-stdin-container {
      display: flex;

      .term-ps {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        margin-right: 0.25rem;
      }

      .term-stdin {
        min-width: 0;

        & > input {
          cursor: text;
          color: $white;
          background-color: transparent;
          border: 0;
          width: 100%;

          &:focus-visible {
            outline: 0;
          }

          &[disabled] {
            cursor: default !important;
          }
        }
      }
    }
  }
}
</style>
