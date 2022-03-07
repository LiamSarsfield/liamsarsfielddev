<template>
  <q-item :style="styles" :class="classesParsed" dense clickable v-ripple>
    <q-item-section clickable v-ripple><span class="tw-truncate tw-w-full">{{ label }}</span></q-item-section>
    <slot name="tooltip">
      <q-menu fit v-model="menuExpanded">
        <slot name="tooltipHeader" :menuExpanded="menuExpanded" :identifier="identifier">
          <q-bar dense class="tw-p-0">
            <span class="tw-border-0 !tw-border-b-2 tw-border-solid tw-pl-2 tw-w-full tw-inline-block">{{ label }}</span>

            <q-btn flat icon="crop_square"/>
            <q-btn flat icon="close" @click="menuExpanded = false"/>
          </q-bar>
        </slot>
        <q-item class="tw-pb-0">
          <q-item-section>
            <slot name="tooltipContent" :menuExpanded="menuExpanded" :identifier="identifier"/>
          </q-item-section>
        </q-item>
      </q-menu>
    </slot>
  </q-item>
</template>

<script>
export default {
  name: 'LsTimelineEvent',
  /** START: Lifecycle Hooks */
  /** END: Lifecycle Hooks */
  props: {
    /**
     * Unique key passed to every timeline event to differentiate it between the other Timeline Events on the Timeline
     */
    identifier: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    classes: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    borderColour: {
      type: String,
    },
  },
  data() {
    return {
      classDefaults: {
        '!tw-px-1': true,
        'tw-text-lg': true,
        'tw-truncate': true,
        '!tw-relative': true,
      },
      menuExpanded: false,
    };
  },
  mounted() {},
  computed: {
    classesParsed() {
      let _this = this;
      let classes = {...this.classDefaults, ..._this.classes};

      if (_this.borderColour) {
        let borderClasses = {
          '!tw-border-b-2': true,
          'tw-border-0': true,
          'tw-border-solid': true,
        };
        borderClasses[_this.borderColour] = true;

        classes = {
          ...borderClasses,
          ...classes,
        };
      }
      return classes;
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
