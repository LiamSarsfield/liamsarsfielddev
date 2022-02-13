<template>
  <div :style="styles" :class="classes" @mouseenter="showTooltip = true;" @mouseleave="onTimelineEventLeave">
    {{ label }}
    <q-tooltip anchor="bottom left" self="center start" :offset="[0, 30]" v-if="Object.keys(tooltipParsed).length !== 0"
               transition-show="scale" transition-hide="scale" v-model="showTooltip" :no-parent-event="true">
      <div :class="tooltipParsed.classes" class="tw-bg-secondary" style="pointer-events: auto !important;"
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
    async onTimelineEventLeave(evt) {
      /**
       * Todo: I don't like this approach as it doesn't fix the core problem, but it's workable for now
       * We need to wait a small amount of time to check if the user switched from the timeline Element to the hovering toolTip.
       */
      await this.sleep(50);

      if (!this.hoveringTooltip) {
        // If the user is NOT hovering over the tooltip. We can safely hide the tooltip.
        this.showTooltip = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
