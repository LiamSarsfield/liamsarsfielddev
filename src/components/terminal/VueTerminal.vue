<template>
  <div class="vue-terminal-parent tw-text-base tw-font-light" :style="cssVars">
    <vue-command class="vue-terminal-command"
                 :commands="commands"
                 :built-in="builtIn"
                 :title="title"
                 :prompt="prompt"
                 v-model:stdin=stdinBind
                 v-model:history="historyBind"
    >
      <template v-slot:bar>
        <div class="tw-flex tw-justify-center tw-border-0 tw-border-b-[1px] tw-border-solid tw-border-gray-800 tw-bg-primary tw-bg-opacity-30 tw-py-2">
          {{ title }}
        </div>
      </template>
      <template v-slot:prompt>
        <span class="term-ps">
      {{ prompt }}
      </span>
      </template>
    </vue-command>
  </div>
</template>

<script>
import VueCommand, {createStdout} from 'vue-command';
import { markRaw } from 'vue';

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
      },
    },
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
      const _this = this;
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

      let terminalCommand;
      if (typeof terminalOptions.commands[command] === 'function') {
        /*
         * We know the command exists, we can execute it
         * However, we render the command's response either through an existing component or an anonymous component.
         * Existing components are an object, whereas an anonymous component we assume will be a function, which we will make into an object
         */
        terminalCommand = terminalOptions.commands[command]();
        terminalCommand = (typeof terminalCommand === 'function') ? {render: terminalCommand} : terminalCommand;
      } else {
        terminalCommand = createStdout(`${command}: command not found`);
      }
      // Vue-command uses anonymous components executing commands
      terminalOptions.history.push(markRaw(terminalCommand));
      _this.stdinBind = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-terminal-command:deep() {
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
