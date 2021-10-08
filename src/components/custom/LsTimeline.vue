<template>
  <div class="tw-flex tw-flex-col">
    <div class="tw-flex tw-flex-wrap tw-mb-2 tw-gap-y-2">
      <div v-for="timelineEvent in timelineEventsParsed" :key="timelineEvent.key" :style="timelineEvent.style" :class="timelineEvent.class">
        {{ timelineEvent.label }}
        <q-tooltip anchor="bottom left" self="center start" :offset="[0, 30]">
          <div :class="timelineEvent.tooltip.class" class="tw-bg-secondary">
            <div :class="timelineEvent.tooltip.headerClass">
              {{ timelineEvent.label }}
            </div>
            <div v-show="timelineEvent.tooltip" :class="timelineEvent.tooltip.labelClass">
              {{ timelineEvent.tooltip.label }}
            </div>
          </div>
        </q-tooltip>
      </div>
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
import {range, max, min} from 'lodash';

export default {
  name: 'LsTimeline',
  /** START: Lifecycle Hooks */
  /** END: Lifecycle Hooks */
  props: {
    timestamps: {
      type: Array,
      default: () => [],
      validator: (timestamps) => !timestamps.some(isNaN),
    },
    /**
     *
     */
    timelineEvents: {
      type: Object,
      default: () => ({}),
    },
    tooltip: {
      type: Boolean,
      default: () => true,
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
      let _this = this;
      return (_this.timestamps.length <= 0) ? [] : range(_this.minTimestamp, (_this.maxTimestamp + 1)).map((rangedTimestamp) => ({
        'value': rangedTimestamp,
        // Loose compare the current rangedTimestamp value with the timestamp value to compare if this was generated or not
        'isPublicTimestamp': _this.timestamps.some((timestamp) => timestamp == rangedTimestamp),
      }));
    },
    timelineEventsSorted() {
      let _this = this;
      return Object.keys(_this.timelineEvents).map((key) => ({'key': key, ..._this.timelineEvents[key]})).sort((firstEl, secondEl) => {
        _this.generateSumTimelineTotalMonths(firstEl);
        _this.generateSumTimelineTotalMonths(secondEl);
        if (firstEl.plot.from.date.getTime() < secondEl.plot.from.date.getTime()) {
          // firstEl is less than second El
          return -1;
        } else if (firstEl.plot.from.date.getTime() > secondEl.plot.from.date.getTime()) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    /**
     * Returns an array that generated the necessary CSS style that's needed to show the timelineEvent
     * @returns {[]}
     */
    timelineEventsParsed() {
      let _this = this;
      let timelineEventsParsed = [];
      let totalAmountMonths = (1 + _this.maxTimestamp - _this.minTimestamp) * 12;
      /** Compares the previous offset to the current iteration's offset in the below loop. If the timelineOffset is less than the prevTotalOffset, we assume
       * we can put the current iteration on the same line as the previous */
      let prevTotalOffset = 100;

      for (let [key, timelineEvent] of Object.entries(_this.timelineEvents)) {
        _this.generateSumTimelineTotalMonths(timelineEvent);

        let cssStyles;
        if (timelineEvent.totalAmountMonths > 0) {
          // Get the percentage of months this current timeline event was present
          let timelinePercentage = Math.floor((timelineEvent.totalAmountMonths / totalAmountMonths) * 100);

          let monthsFromBase = ((timelineEvent.plot.from.value - _this.minTimestamp) * 12) + timelineEvent.plot.from.month;
          /** timelineOffset generates the offset % based on the timelineEvent's from value and the minTimestamp entered */
          let timelineOffset = Math.floor((monthsFromBase / totalAmountMonths) * 100);
          let totalOffset = prevTotalOffset;
          prevTotalOffset = timelinePercentage + timelineOffset;
          debugger;
          if (timelineOffset >= totalOffset) {
            timelineOffset -= totalOffset;
          }

          cssStyles = {'width': `${timelinePercentage}%`, 'margin-left': `${timelineOffset}%`};
        } else {
          // There was a logic error with the passed parameters -> Do not show the timeline event
          cssStyles = {'display': 'none'};
        }

        let cssClasses = ['tw-pl-1', 'tw-text-lg', 'tw-whitespace-nowrap'];
        if (timelineEvent?.styleProps.borderColour) {
          cssClasses = cssClasses.concat(['tw-border-0', '!tw-border-b-2', 'tw-border-solid', timelineEvent.styleProps.borderColour]);
        }

        // Convert the array to an object so if we want, we can overwrite the classes that were set from the parsing
        cssClasses = cssClasses.reduce((prevElem, nextElem) => ({...prevElem, [nextElem]: true}), {});
        cssClasses = {...cssClasses, ...timelineEvent?.styleProps.classes ?? {}};

        // START: Generate tooltip styles
        let tooltipCssClasses = ['tw-px-2', 'tw-py-1 tw-text-sm'];
        let tooltipHeaderCssClasses = [];
        let tooltipLabelCssClasses = ['tw-mt-2', 'tw-ml-1'];
        if (timelineEvent?.tooltip.headerBorderColour) {
          tooltipHeaderCssClasses = tooltipHeaderCssClasses.
            concat(['tw-border-0', '!tw-border-b-2', 'tw-border-solid', timelineEvent.tooltip.headerBorderColour]);
        } else if (timelineEvent?.styleProps.borderColour) {
          tooltipHeaderCssClasses = tooltipHeaderCssClasses.concat(['tw-border-0', '!tw-border-b-2', 'tw-border-solid', timelineEvent.styleProps.borderColour]);
        }

        // The class properties can be overwritten from the passed timelineEvent object by converting the array to an object and merging the passed props
        tooltipCssClasses = tooltipCssClasses.reduce((prevElem, nextElem) => ({...prevElem, [nextElem]: true}), {});
        timelineEvent.tooltip.class = {...tooltipCssClasses, ...timelineEvent?.tooltip.classes ?? {}};

        tooltipHeaderCssClasses = tooltipHeaderCssClasses.reduce((prevElem, nextElem) => ({...prevElem, [nextElem]: true}), {});
        timelineEvent.tooltip.headerClass = {...tooltipHeaderCssClasses, ...timelineEvent?.tooltip.headerClassProps ?? {}};

        tooltipLabelCssClasses = tooltipLabelCssClasses.reduce((prevElem, nextElem) => ({...prevElem, [nextElem]: true}), {});
        timelineEvent.tooltip.labelClass = {...tooltipLabelCssClasses, ...timelineEvent?.tooltip.labelClassProps ?? {}};
        // END: Generate tooltip styles

        timelineEventsParsed.push({'key': key, 'style': cssStyles, 'class': cssClasses, ...timelineEvent});
      }
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
