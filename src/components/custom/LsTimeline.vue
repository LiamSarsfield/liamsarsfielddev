<template>
  <div class="tw-flex tw-flex-col tw-overflow-x-auto">
    <div class="tw-min-w-[800px]">
      <q-list class="tw-flex tw-flex-wrap tw-mb-2 tw-gap-y-2" dense>
        <ls-timeline-event v-for="timelineEvent in timelineEventsParsed" :key="timelineEvent.key"
          :identifier="timelineEvent.key" :label="timelineEvent.label" :styles="timelineEvent.style"
          :classes="timelineEvent.class" :border-colour="timelineEvent.borderColour">
          <template v-slot:tooltipHeader="tooltipHeaderObj">
            <slot name="timelineEventTooltipHeader" :tooltipHeaderObj="tooltipHeaderObj" />
          </template>
          <template v-slot:tooltipContent="tooltipContent">
            <slot name="timelineEventTooltipContent" :tooltipContent="tooltipContent" />
          </template>
        </ls-timeline-event>
      </q-list>
      <div class="tw-flex">
        <div v-for="(timestamp, index) in timestampPlots" :key="index" class="tw-flex tw-flex-col"
          :style="{ 'width': `${(Math.floor((timestamp.numMonths / totalAmountMonths) * 100, 2) * 100).toFixed(2)}%` }">
          <div class="tw-border-0 !tw-border-t-2 tw-border-solid tw-border-white tw-mt-auto tw-flex"
            :class="{ 'tw-justify-end': timestamp.isPresent }">
            <span :class="{ 'tw-invisible': !timestamp.isPublicTimestamp }">{{ timestamp.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LsTimelineEvent from 'components/custom/LsTimelineEvent';
import { cloneDeep, has, intersection, max, min, range, last, round } from 'lodash';
import { date } from 'quasar';

export default {
  name: 'LsTimeline',
  components: { LsTimelineEvent },
  /** START: Lifecycle Hooks */
  /** END: Lifecycle Hooks */
  props: {
    tags: {
      type: Object,
      default: () => ({}),
      validator: function (tags) {
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
      type: Array,
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
      validator: function (timelineEvents) {
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
      handler(newVal) {
        this.timelineEventsCloned = cloneDeep(newVal);
      },
    },
    tags: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.tagsCloned = cloneDeep(newVal);
      },
    },
    selectedTags: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.selectedTagsCloned = cloneDeep(newVal);
      },
    },
  },
  computed: {
    /**
     * @returns Date
     */
    minTimestamp() {
      return this.timestampPlots && this.timestampPlots[0];
    },
    /**
     * @returns Date
     */
    maxTimestamp() {
      return last(this.timestampPlots);
    },
    totalAmountMonths() {
      return date.getDateDiff(this.maxTimestamp?.endDate, this.minTimestamp?.startDate, 'months') + 1;
    },
    totalDuration() {
      return this.maxTimestamp?.endDate.valueOf() - this.minTimestamp?.startDate.valueOf();
    },
    /**
     * Generates an array of objects between the min and max timestamp value,
     * So the distance between timestamps passed to this component have an equal length
     */
    timestampPlots() {
      const _this = this;
      if (_this.timestamps.length === 0) {
        return [];
      }

      let now = new Date();
      let minTimestampPlot = parseInt(min(this.timestamps));
      let maxTimestampPlot = parseInt(max(this.timestamps)) + 1;
      let testLs = range(minTimestampPlot, maxTimestampPlot).map((rangedTimestamp) => {
        let startDate = new Date(rangedTimestamp, 0);
        let timestampPlot = {
          'value': rangedTimestamp,
          // Loose compare the current rangedTimestamp value with the timestamp value to compare if this was generated or not
          'isPublicTimestamp': _this.timestamps.some((timestamp) => timestamp == rangedTimestamp),
          'isPresent': false,
          'startDate': startDate,
        };

        if (now.getFullYear() === rangedTimestamp) {
          timestampPlot.endDate = now;
          timestampPlot.numMonths = now.getMonth() + 1;
        } else {
          timestampPlot.endDate = new Date(rangedTimestamp, 12, 0);
          timestampPlot.numMonths = 12;
        }

        return timestampPlot;
      });
      return testLs;
    },
    /**
     * Returns an array that generated the necessary CSS style that's needed to show the timelineEvent
     * @returns {[]}
     */
    timelineEventsParsed() {
      const _this = this;
      let timelineEventsParsed = [];

      /**
       * Compares the previous offset to the current iteration's offset in the below loop. If the timelineOffsetFloored is less than the prevTimelineTotalWidth, we assume
       * we can put the current iteration on the same line as the previous
       */
      let prevTimelineTotalWidth = 100;

      let tags = _this.tags;
      let tagKeys = Object.keys(tags);
      let selectedTags = _this.selectedTags;

      for (let [key, timelineEvent] of Object.entries(_this.timelineEventsCloned)) {
        // Used for the v-for :key
        timelineEvent['key'] = key;

        timelineEvent.plot.to.date = (timelineEvent.plot.to.value == 'now') ? new Date() : new Date(timelineEvent.plot.to.value, timelineEvent.plot.to.month ?? 12, 0);
        timelineEvent.plot.to.unix = timelineEvent.plot.to.date.valueOf();

        timelineEvent.plot.from.date = new Date(timelineEvent.plot.from.value, (timelineEvent.plot.from.month - 1));
        timelineEvent.plot.from.unix = timelineEvent.plot.from.date.valueOf();

        timelineEvent.totalDuration = timelineEvent.plot.to.unix - timelineEvent.plot.from.unix;

        timelineEvent.durationFromBase = timelineEvent.plot.from.unix - this.minTimestamp?.startDate.valueOf();

        if (timelineEvent.totalDuration < 1) {
          // There was a logic error with the passed parameters -> Do not show this timeline event
          continue;
        }

        // The timeline must have at least one selected tag in order to appear on the timeline
        let timelineHasASelectedTag = (tagKeys.length > 0 && intersection(timelineEvent.tags, selectedTags).length !== 0);

        let timelineWidth = round((timelineEvent.totalDuration / _this.totalDuration) * 100, 2);

        /** timelineOffset generates the offset % based on the timelineEvent's from value and the minTimestamp entered */
        let timelineOffset = round(((timelineEvent.durationFromBase) / _this.totalDuration) * 100, 2);

        let thisTimelineTotalWidth = timelineWidth + timelineOffset;

        if (timelineOffset >= prevTimelineTotalWidth) {
          /**
           * If the total space taken of the previous timeline is less than the offset of this timeline,
           * Both timelines can exist on the same line. Therefore, this timeline's offset can be reduced
           */
          timelineOffset = timelineOffset - prevTimelineTotalWidth;
        }

        timelineEvent['style'] = { 'width': `${timelineWidth}%`, 'margin-left': `${timelineOffset}%` };
        timelineEvent['class'] = { 'tw-hidden': !timelineHasASelectedTag };

        if (timelineHasASelectedTag) {
          // The total amount of space this timelineEvent takes up is assigned the prevTimelineTotalWidth
          prevTimelineTotalWidth = thisTimelineTotalWidth;
        }

        // Remove the below properties from the object so the v-binding doesn't show them in the HTML
        timelineEventsParsed.push(timelineEvent);
      }

      return timelineEventsParsed;
    },
  },
  methods: {},
};
</script>

<style scoped>

</style>
