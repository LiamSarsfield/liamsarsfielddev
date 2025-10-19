// src/types/vue-command.d.ts
declare module 'vue-command' {
  import type { Component } from 'vue';

  export interface VueCommandInstance {
    $refs: {
      vueCommandHistoryEntryComponentRefs: Array<{
        $refs: {
          queryRef: HTMLInputElement;
        };
      }>;
    };
  }

  export function createStdout(initialOutput?: string): Stdout;

  const VueCommand: Component;

  export default VueCommand;
}
