<template>
  <div class="vue-terminal-parent tw-text-base tw-font-light" :style="cssVars">
    <vue-command class="vue-terminal-command"
                 :commands="commands"
                 :built-in="builtIn"
                 :title="title"
                 :prompt="prompt"
                 v-model:is-in-progress="isInProgress"
                 v-model:stdin=stdinBind
                 v-model:history="historyBind"
                 @execute="onExecute"
                 ref="vueCommandRef"
                 :scroll-stdin-into-view="false"
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
import VueCommand from 'vue-command';

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
    return {
      isInProgress: false,
      executingCommand: null,
    };
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
  watch: {
    isInProgress(newVal) {
      if (newVal === true) {
        this.executingCommand = this.stdinBind;
      } else {
        this.executingCommand = null;
      }
    },
  },
  methods: {
    /**
     *
     * @param command
     * @param options
     */
    async executeTermCommand(command, options = {}) {
      const _this = this;
      let defaultOptions = {
        typingAnimation: false,
        typingSpeed: 100,
      };
      // Merge the options together
      options = {...defaultOptions, ...options};
      if (options.typingAnimation) {
        await _this.typing('stdinBind', command, {dataOptionsKey: _this, typingSpeed: options.typingSpeed});
      } else {
        _this.stdinBind = command;
      }
      // Ensure we wait for the page to rerender, otherwise the command may not show fully
      await _this.$nextTick();

      let vueCommandRef = _this.$refs.vueCommandRef;
      await vueCommandRef.handle(command);
    },
    async onExecute() {
      let _this = this;
      await _this.$nextTick();
      await _this.$refs.vueCommandRef.terminate();

      if (_this.history[_this.history.length - 1].type) {
        // If the last executed component has a type property, we assume it's a JSX generated component
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-terminal-parent:deep(.vue-terminal-command) {
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
