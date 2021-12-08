<template>
  <div class="tw-flex tw-flex-col">
    <div class="tw-flex tw-flex-wrap tw-mb-2 tw-gap-y-2">
      <ls-timeline-event v-for="timelineEvent in timelineEventsParsed" :key="timelineEvent.key" v-bind="timelineEvent"/>
    </div>
    <div class="tw-flex">
      <div class="tw-flex-1 tw-flex tw-flex-col" v-for="(timestamp, index) in timestampPlots" :key="index">
        <div class="tw-border-0 !tw-border-t-2 tw-border-solid tw-border-white tw-mt-auto">
          <span :class="{'tw-invisible': !timestamp.isPublicTimestamp}">{{ timestamp.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LsTimelineEvent from 'components/custom/LsTimelineEvent';
import {range, max, min, cloneDeep, has, omit, intersection} from 'lodash';

export default {
  name: 'LsTimeline',
  components: {LsTimelineEvent},
  /** START: Lifecycle Hooks */
  /** END: Lifecycle Hooks */
  props: {
    tags: {
      type: Object,
      default: () => {},
      validator: function(tags) {
        let requiredProps = ['label'];
        for (let [key, tag] of Object.entries(tags)) {
          for (const requiredProp of requiredProps) {
            if (has(tag, requiredProp) === false) {
              return false;
            }
          }
        }
        return true;
      },
    },
    selectedTags: {
      type: [Array, Object],
      default: () => null,
    },
    timestamps: {
      type: Array,
      default: () => [],
      // Timestamps must all be a form of number
      validator: (timestamps) => !timestamps.some(isNaN),
    },
    timelineEvents: {
      type: Object,
      /** Checks if the correct object property values are entered */
      validator: function(timelineEvents) {
        let requiredProps = ['label', 'plot.from.value', 'plot.to.value'];
        for (let [key, timelineEvent] of Object.entries(timelineEvents)) {
          for (const requiredProp of requiredProps) {
            if (has(timelineEvent, requiredProp) === false) {
              return false;
            }
          }
        }
        return true;
      },
    },
    tooltip: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      timelineEventsCloned: {},
      tagsCloned: {},
      selectedTagsCloned: {},
    };
  },
  watch: {
    /** Clone the timelineEvent so the parent's timelineEvent is not changed and One-Way Data Flow is not broken */
    timelineEvents: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.timelineEventsCloned = cloneDeep(newVal);
      },
    },
    tags: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.tagsCloned = cloneDeep(newVal);
      },
    },
    selectedTags: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.selectedTagsCloned = cloneDeep(newVal);
      },
    },
  },
  computed: {
    /**
     * Generates an array of objects between the min and max timestamp value,
     * So the distance between timestamps passed to this component have an equal length
     */
    minTimestamp() {
      return Number(min(this.timestamps));
    },
    maxTimestamp() {
      return Number(max(this.timestamps));
    },
    timestampPlots() {
      const _this = this;
      return (_this.timestamps.length <= 0) ? [] : range(_this.minTimestamp, (_this.maxTimestamp + 1)).map((rangedTimestamp) => ({
        'value': rangedTimestamp,
        // Loose compare the current rangedTimestamp value with the timestamp value to compare if this was generated or not
        'isPublicTimestamp': _this.timestamps.some((timestamp) => timestamp == rangedTimestamp),
      }));
    },
    /**
     * Returns an array that generated the necessary CSS style that's needed to show the timelineEvent
     * @returns {[]}
     */
    timelineEventsParsed() {
      const _this = this;
      let timelineEventsParsed = [];
      let totalAmountMonths = (1 + _this.maxTimestamp - _this.minTimestamp) * 12;
      /** Compares the previous offset to the current iteration's offset in the below loop. If the timelineOffset is less than the prevTotalOffset, we assume
       * we can put the current iteration on the same line as the previous */
      let prevTotalOffset = 100;

      for (let [key, timelineEvent] of Object.entries(_this.timelineEventsCloned)) {
        // Used for the v-for :key
        timelineEvent['key'] = key;

        _this.generateSumTimelineTotalMonths(timelineEvent);

        if (timelineEvent.totalAmountMonths < 1) {
          // There was a logic error with the passed parameters -> Do not show this timeline event
          continue;
        }

        // Get the percentage of months this current timeline event was present
        let timelinePercentage = Math.floor((timelineEvent.totalAmountMonths / totalAmountMonths) * 100);
        let monthsFromBase = ((timelineEvent.plot.from.value - _this.minTimestamp) * 12) + timelineEvent.plot.from.month;
        /** timelineOffset generates the offset % based on the timelineEvent's from value and the minTimestamp entered */
        let timelineOffset = Math.floor((monthsFromBase / totalAmountMonths) * 100);
        let totalOffset = prevTotalOffset;
        prevTotalOffset = timelinePercentage + timelineOffset;
        if (timelineOffset >= totalOffset) {
          timelineOffset -= totalOffset;
        }
        timelineEvent['style'] = {'width': `${timelinePercentage}%`, 'margin-left': `${timelineOffset}%`};

        let cssClasses = ['tw-px-1', 'tw-text-lg', 'tw-truncate'];

        if (timelineEvent?.styleProps.borderColour) {
          cssClasses = cssClasses.concat(['tw-border-0', '!tw-border-b-2', 'tw-border-solid', timelineEvent.styleProps.borderColour]);
        }

        // Convert the array to an object so if we want, we can overwrite the classes that were set from the parsing
        cssClasses = cssClasses.reduce((prevElem, nextElem) => ({...prevElem, [nextElem]: true}), {});

        let timelineHasSelectedTag = (Object.keys(_this.tags).length > 0 && Array.isArray(_this.selectedTags)
          && intersection(timelineEvent.tags, _this.selectedTags).length === 0);
        cssClasses['slide-out'] = timelineHasSelectedTag;
        cssClasses['slide-in'] = !timelineHasSelectedTag;

        timelineEvent['class'] = {...cssClasses, ...timelineEvent?.styleProps.classes ?? {}};

        // START: Generate tooltip props
        let defaultTooltipCssClasses = {'tw-px-2': true, 'tw-py-1 tw-text-sm': true};
        timelineEvent.tooltip.classes = {...defaultTooltipCssClasses, ...timelineEvent?.tooltip.classes ?? {}};

        let defaultTooltipHeaderCssClasses = {};
        if (timelineEvent?.tooltip.headerBorderColour || timelineEvent?.styleProps.borderColour) {
          defaultTooltipHeaderCssClasses = {...defaultTooltipHeaderCssClasses, ...{'tw-border-0': true, '!tw-border-b-2': true, 'tw-border-solid': true}};

          if (timelineEvent?.tooltip?.headerBorderColour) {
            defaultTooltipHeaderCssClasses[timelineEvent.tooltip.headerBorderColour] = true;
          }

          if (timelineEvent?.styleProps?.borderColour) {
            defaultTooltipHeaderCssClasses[timelineEvent.styleProps.borderColour] = true;
          }
        }
        timelineEvent.tooltip.headerClasses = {...defaultTooltipHeaderCssClasses, ...timelineEvent?.tooltip.headerClasses ?? {}};

        let defaultTooltipLabelCssClasses = {'tw-mt-2': true, 'tw-ml-1': true};
        timelineEvent.tooltip.labelClasses = {...defaultTooltipLabelCssClasses, ...timelineEvent?.tooltip?.labelClasses ?? {}};
        timelineEvent.tooltip.showTooltip = false;
        // END: Generate tooltip props

        // Remove the below properties from the object so the v-binding doesn't show them in the HTML
        timelineEventsParsed.push(omit(timelineEvent, ['totalAmountMonths', 'plot', 'styleProps']));
      }
      console.log({timelineEventsParsed});
      return timelineEventsParsed;
    },
  },
  methods: {
    /**
     * In place function that generated the total amount of months and processes the plot points to numbers (if not already)
     * @param timelineEvent
     */
    generateSumTimelineTotalMonths(timelineEvent) {
      timelineEvent.plot.from.value = Number(timelineEvent.plot.from.value);
      timelineEvent.plot.to.value = Number(timelineEvent.plot.to.value);
      let amountMonths = (timelineEvent.plot.to.value - timelineEvent.plot.from.value) * 12;

      // The month property is optional, therefore we check isNaN before assignment
      // If no month was passed -> we assume the event starts at the start of the year
      timelineEvent.plot.from.month = (isNaN(timelineEvent.plot.from.month) ? 0 : Number(timelineEvent.plot.from.month));
      // If no month was passed -> we assume the event ends at the end of the year
      timelineEvent.plot.to.month = (isNaN(timelineEvent.plot.to.month) ? 12 : Number(timelineEvent.plot.to.month));

      amountMonths += 12 - timelineEvent.plot.from.month;
      amountMonths -= 12 - timelineEvent.plot.to.month;

      timelineEvent.plot.from.date = new Date(timelineEvent.plot.from.value, (timelineEvent.plot.from.month - 1));
      timelineEvent.plot.to.date = new Date(timelineEvent.plot.from.value, (timelineEvent.plot.to.month - 1));
      timelineEvent.totalAmountMonths = amountMonths;
    },
  },
};
</script>

<style scoped>

</style>
