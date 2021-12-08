<template>
  <div :style="styles" :class="classes">
    {{ label }}
    <q-tooltip anchor="bottom left" self="center start" :offset="[0, 30]" v-if="Object.keys(tooltipParsed).length !== 0"
               @before-hide="beforeTooltipHides" transition-show="scale" transition-hide="scale"
               v-model="showTooltip" content-style="pointer-events: auto !important;">
      <div :class="tooltipParsed.classes" class="tw-bg-secondary"
           @mouseenter="hoveringTooltip = true" @mouseleave="showTooltip = false; hoveringTooltip = false;">
        <div :class="tooltipParsed.headerClasses">
          {{ label }}
        </div>
        <div :class="tooltipParsed.labelClasses">
          {{ tooltipParsed.label }}
        </div>
      </div>
    </q-tooltip>
  </div>
</template>

<script>
import {cloneDeep} from 'lodash';

export default {
  name: 'LsTimelineEvent',
  /** START: Lifecycle Hooks */
  /** END: Lifecycle Hooks */
  props: {
    label: {
      type: String,
      required: true,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    classes: {
      type: Object,
      default: () => {},
    },
    tooltip: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tooltipCloned: {},
      showTooltip: false,
      hoveringTooltip: false,
      beforeTooltipHidesTriggered: false,
    };
  },
  watch: {
    tooltip: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.tooltipCloned = cloneDeep(newVal);
      },
    },
  },
  computed: {
    tooltipParsed() {
      const _this = this;
      let tooltipParsed = _this.tooltipCloned;

      let defaultTooltipClasses = {};
      tooltipParsed.classes = {...defaultTooltipClasses, ...tooltipParsed.classes};

      let defaultTooltipHeaderClasses = {};
      tooltipParsed.headerClasses = {...defaultTooltipHeaderClasses, ...tooltipParsed.headerClasses};


      let defaultTooltipLabelClasses = {};
      tooltipParsed.labelClasses = {...defaultTooltipLabelClasses, ...tooltipParsed.labelClasses};

      return tooltipParsed;
    }
  },
  methods: {
    /** Gets triggered when either we set the showTooltip to false or the user hovers outside the timelineEvent element
     * @param evt */
    async beforeTooltipHides(evt) {
      if (this.beforeTooltipHidesTriggered === false) {
        // First set the tooltip to show so the animation doesn't trigger
        this.showTooltip = true;

        /**
         * Todo: I don't like this approach as it doesn't fix the core problem, but it's workable for now
         * We need to wait a small amount of time to check if the user switched from the timeline Element to the hovering toolTip.
         */
        await this.sleep(20);

        if (!this.hoveringTooltip) {
          /** If the user is NOT hovering hover the tooltip. We can safely hide the tooltip.
           Mark the beforeTooltipHidesTriggered as true to prevent infinite recursion */
          this.showTooltip = false;
          this.beforeTooltipHidesTriggered = true;
        }
      } else {
        this.beforeTooltipHidesTriggered = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
