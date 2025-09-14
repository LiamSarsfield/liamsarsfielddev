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
            <slot name="timelineEventTooltipHeader" :tooltipHeaderObj="tooltipHeaderObj" />
          </template>
          <template #tooltipContent="tooltipContent">
            <slot name="timelineEventTooltipContent" :tooltipContent="tooltipContent" />
          </template>
        </LsTimelineEvent>
      </q-list>

      <div class="timeline-ticks">
        <div
          v-for="(timestamp, index) in timestampPlots"
          :key="index"
          class="tick-segment"
          :style="{
            width: `${(Math.floor((timestamp.numMonths / totalAmountMonths) * 100, 2) * 100).toFixed(2)}%`,
          }"
        >
          <div class="tick-line" :class="{ 'justify-end': timestamp.isPresent }">
            <span :class="{ invisible: !timestamp.isPublicTimestamp }">{{ timestamp.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LsTimelineEvent from 'components/custom/LsTimelineEvent.vue'
import { cloneDeep, has, intersection, max, min, range, last, round } from 'lodash'
import { date } from 'quasar'

export default {
  name: 'LsTimeline',
  components: { LsTimelineEvent },
  props: {
    tags: {
      type: Object,
      default: () => ({}),
      validator: function (tags) {
        const requiredProps = ['label']
        for (const [, tag] of Object.entries(tags)) {
          for (const requiredProp of requiredProps) {
            if (has(tag, requiredProp) === false) return false
          }
        }
        return true
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
      validator: function (timelineEvents) {
        const requiredProps = ['label', 'plot.from.value', 'plot.to.value']
        for (const [, timelineEvent] of Object.entries(timelineEvents)) {
          for (const requiredProp of requiredProps) {
            if (has(timelineEvent, requiredProp) === false) return false
          }
        }
        return true
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
    }
  },
  watch: {
    timelineEvents: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.timelineEventsCloned = cloneDeep(newVal)
      },
    },
    tags: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.tagsCloned = cloneDeep(newVal)
      },
    },
  },
  computed: {
    minTimestamp() {
      return this.timestampPlots && this.timestampPlots[0]
    },
    maxTimestamp() {
      return last(this.timestampPlots)
    },
    totalAmountMonths() {
      return (
        date.getDateDiff(this.maxTimestamp?.endDate, this.minTimestamp?.startDate, 'months') + 1
      )
    },
    totalDuration() {
      return this.maxTimestamp?.endDate.valueOf() - this.minTimestamp?.startDate.valueOf()
    },
    timestampPlots() {
      if (this.timestamps.length === 0) return []

      const now = new Date()
      const minTimestampPlot = parseInt(min(this.timestamps))
      const maxTimestampPlot = parseInt(max(this.timestamps)) + 1
      return range(minTimestampPlot, maxTimestampPlot).map((rangedTimestamp) => {
        const startDate = new Date(rangedTimestamp, 0)
        const timestampPlot = {
          value: rangedTimestamp,
          isPublicTimestamp: this.timestamps.some((t) => t == rangedTimestamp),
          isPresent: false,
          startDate,
        }

        if (now.getFullYear() === rangedTimestamp) {
          timestampPlot.endDate = now
          timestampPlot.numMonths = now.getMonth() + 1
        } else {
          timestampPlot.endDate = new Date(rangedTimestamp, 12, 0)
          timestampPlot.numMonths = 12
        }

        return timestampPlot
      })
    },
    timelineEventsParsed() {
      const timelineEventsParsed = []

      const tags = this.tags
      const tagKeys = Object.keys(tags)
      const selectedTags = this.selectedTags

      let prevEvent = null

      for (const [key, timelineEvent] of Object.entries(this.timelineEventsCloned)) {
        const event = { ...timelineEvent }
        event.key = key

        event.plot.to.date =
          event.plot.to.value == 'now'
            ? new Date()
            : new Date(event.plot.to.value, event.plot.to.month ?? 12, 0)
        event.plot.to.unix = event.plot.to.date.valueOf()

        event.plot.from.date = new Date(event.plot.from.value, event.plot.from.month - 1)
        event.plot.from.unix = event.plot.from.date.valueOf()

        event.totalDuration = event.plot.to.unix - event.plot.from.unix
        event.durationFromBase = event.plot.from.unix - this.minTimestamp?.startDate.valueOf()
        if (event.totalDuration < 1) continue

        const timelineHasASelectedTag =
          tagKeys.length > 0 && intersection(event.tags, selectedTags).length !== 0

        event.width = round((event.totalDuration / this.totalDuration) * 100, 1)
        event.offset = round((event.durationFromBase / this.totalDuration) * 100, 1)
        event.totalOffset = event.width + event.offset

        if (prevEvent?.plot?.to?.unix > event?.plot?.from?.unix) {
          prevEvent.style['margin-right'] = `${round(100 - prevEvent.totalOffset, 1)}%`
          prevEvent.totalOffset = 100
        }

        if (!isNaN(prevEvent?.totalOffset) && event.offset >= prevEvent.totalOffset) {
          event.offset = event.offset - prevEvent.totalOffset
        }

        event.style = { width: `${event.width}%`, 'margin-left': `${Math.floor(event.offset)}%` }
        event.class = { hidden: !timelineHasASelectedTag }

        if (timelineHasASelectedTag) prevEvent = event
        timelineEventsParsed.push(event)
      }

      return timelineEventsParsed
    },
  },
}
</script>

<style scoped>
.timeline-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  margin-bottom: 8px;
}
.timeline-ticks {
  display: flex;
}
.tick-segment {
  display: flex;
  flex-direction: column;
}
.tick-line {
  display: flex;
  border-top: 2px solid rgba(255, 255, 255, 1);
  margin-top: auto;
}
.justify-end {
  justify-content: flex-end;
}
.invisible {
  visibility: hidden;
}
.hidden {
  display: none !important;
}
</style>
