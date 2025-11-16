<template>
  <div class="column" style="overflow-x: auto">
    <div style="min-width: 800px">
      <q-list class="timeline-list" dense>
        <LsTimelineEvent
          v-for="timelineEvent in timelineEventsParsed"
          :key="timelineEvent.key"
          :identifier="timelineEvent.key"
          :label="timelineEvent.label"
          :styles="timelineEvent.style"
          :classes="timelineEvent.class"
          :border-colour="timelineEvent.borderColour"
        >
          <template #tooltipHeader="tooltipHeaderObj">
            <slot name="timelineEventTooltipHeader" v-bind="tooltipHeaderObj" />
          </template>
          <template #tooltipContent="tooltipContent">
            <slot name="timelineEventTooltipContent" v-bind="tooltipContent" />
          </template>
        </LsTimelineEvent>
      </q-list>
      <div class="row no-wrap">
        <div
          v-for="(timestamp, index) in timestampPlots"
          :key="index"
          :style="{ width: computeTimestampWidth(timestamp.numMonths) }"
        >
          <div class="tick-line" :class="{ 'justify-end': timestamp.isPresent }">
            <span :class="{ invisible: !timestamp.isPublicTimestamp }">{{ timestamp.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { date } from 'quasar';
import { cloneDeep, has, intersection, last, max, min, range, round } from 'lodash';

import LsTimelineEvent from './LsTimelineEvent.vue';

defineOptions({
  name: 'LsTimeline',
});

const props = defineProps({
  tags: {
    type: Object,
    default: () => ({}),
    validator(tags) {
      const requiredProps = ['label'];
      for (const tag of Object.values(tags)) {
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
    validator: (timestamps) => !timestamps.some(isNaN),
  },
  timelineEvents: {
    type: Object,
    validator(timelineEvents) {
      const requiredProps = ['label', 'plot.from.value', 'plot.to.value'];
      for (const timelineEvent of Object.values(timelineEvents)) {
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
});

const selectedTagsList = computed(() =>
  Array.isArray(props.selectedTags) ? props.selectedTags : [],
);
const tagsMap = computed(() => props.tags ?? {});

const timestampPlots = computed(() => {
  if (!Array.isArray(props.timestamps) || props.timestamps.length === 0) {
    return [];
  }

  const now = new Date();
  const minTimestampPlot = parseInt(min(props.timestamps));
  const maxTimestampPlot = parseInt(max(props.timestamps)) + 1;

  return range(minTimestampPlot, maxTimestampPlot).map((rangedTimestamp) => {
    const startDate = new Date(rangedTimestamp, 0);
    const timestampPlot = {
      value: rangedTimestamp,
      isPublicTimestamp: props.timestamps.some((timestamp) => timestamp == rangedTimestamp),
      isPresent: false,
      startDate,
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
});

const minTimestamp = computed(() => timestampPlots.value && timestampPlots.value[0]);
const maxTimestamp = computed(() => last(timestampPlots.value));

const totalAmountMonths = computed(() => {
  const end = maxTimestamp.value?.endDate;
  const start = minTimestamp.value?.startDate;

  if (!end || !start) {
    return 0;
  }

  return date.getDateDiff(end, start, 'months') + 1;
});

const totalDuration = computed(() => {
  const endValue = maxTimestamp.value?.endDate?.valueOf();
  const startValue = minTimestamp.value?.startDate?.valueOf();

  if (!Number.isFinite(endValue) || !Number.isFinite(startValue)) {
    return 0;
  }

  return endValue - startValue;
});

const computeTimestampWidth = (numMonths) => {
  const monthsValue = Number(numMonths);
  const totalMonths = totalAmountMonths.value;

  if (!Number.isFinite(monthsValue) || monthsValue <= 0) {
    return '0%';
  }

  if (!Number.isFinite(totalMonths) || totalMonths <= 0) {
    return '0%';
  }

  const width = (monthsValue / totalMonths) * 100;
  return `${width.toFixed(2)}%`;
};

// TODO(refactor): This computed currently normalizes events, handles overlap,
//   calculates layout offsets, and filters by tag selection in one block.
//   Splitting these steps into dedicated helpers (or a composable) would make
//   the timeline rendering logic easier to follow and test.
const timelineEventsParsed = computed(() => {
  const events = [];
  const tags = tagsMap.value;
  const tagKeys = Object.keys(tags);
  const selectedTags = selectedTagsList.value;
  const totalDurationValue = totalDuration.value;
  const baseStartDate = minTimestamp.value?.startDate?.valueOf();

  let prevTimeline = null;

  for (const [key, timelineEvent] of Object.entries(props.timelineEvents ?? {})) {
    const parsedEvent = cloneDeep(timelineEvent);
    parsedEvent.key = key;

    const toMonth = parsedEvent.plot.to.month ?? 12;
    parsedEvent.plot.to.date =
      parsedEvent.plot.to.value == 'now'
        ? new Date()
        : new Date(parsedEvent.plot.to.value, toMonth, 0);
    parsedEvent.plot.to.unix = parsedEvent.plot.to.date.valueOf();

    parsedEvent.plot.from.date = new Date(
      parsedEvent.plot.from.value,
      parsedEvent.plot.from.month - 1,
    );
    parsedEvent.plot.from.unix = parsedEvent.plot.from.date.valueOf();

    parsedEvent.totalDuration = parsedEvent.plot.to.unix - parsedEvent.plot.from.unix;

    parsedEvent.durationFromBase = Number.isFinite(baseStartDate)
      ? parsedEvent.plot.from.unix - baseStartDate
      : 0;

    if (parsedEvent.totalDuration < 1) {
      continue;
    }

    const timelineHasASelectedTag =
      tagKeys.length > 0 && intersection(parsedEvent.tags, selectedTags).length !== 0;

    if (!Number.isFinite(totalDurationValue) || totalDurationValue <= 0) {
      parsedEvent.width = 0;
      parsedEvent.offset = 0;
      parsedEvent.totalOffset = 0;
      parsedEvent.style = { width: '0%', 'margin-left': '0%' };
      parsedEvent.class = { hidden: !timelineHasASelectedTag };

      if (timelineHasASelectedTag) {
        prevTimeline = parsedEvent;
      }

      events.push(parsedEvent);
      continue;
    }

    parsedEvent.width = round((parsedEvent.totalDuration / totalDurationValue) * 100, 1);

    parsedEvent.offset = round((parsedEvent.durationFromBase / totalDurationValue) * 100, 2);
    parsedEvent.totalOffset = parsedEvent.width + parsedEvent.offset;

    if (prevTimeline?.plot?.to?.unix > parsedEvent.plot.from.unix) {
      prevTimeline.style['margin-right'] = `${round(100 - prevTimeline.totalOffset, 1)}%`;
      prevTimeline.totalOffset = 100;
    }

    const previousTotalOffset = prevTimeline?.totalOffset;
    const prevEndDate = prevTimeline?.plot?.to?.date;
    const monthsBetween = prevEndDate
      ? Math.abs(date.getDateDiff(parsedEvent.plot.from.date, prevEndDate, 'months'))
      : Infinity;

    if (prevEndDate && monthsBetween <= 1.5 && Number.isFinite(previousTotalOffset)) {
      parsedEvent.offset = Math.max(parsedEvent.offset - previousTotalOffset, 0);
    } else if (
      previousTotalOffset !== undefined &&
      Number.isFinite(previousTotalOffset) &&
      parsedEvent.offset >= previousTotalOffset
    ) {
      parsedEvent.offset = parsedEvent.offset - previousTotalOffset;
    }

    parsedEvent.style = {
      width: `${parsedEvent.width}%`,
      'margin-left': `${Math.floor(parsedEvent.offset)}%`,
    };
    parsedEvent.class = { hidden: !timelineHasASelectedTag, ...(parsedEvent.class ?? {}) };

    if (timelineHasASelectedTag) {
      prevTimeline = parsedEvent;
    }

    events.push(parsedEvent);
  }

  return events;
});
</script>

<style scoped>
.timeline-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  margin-bottom: 8px;
}

.tick-line {
  border-top: 2px solid rgba(255, 255, 255, 1);
  margin-top: auto;
}
</style>
