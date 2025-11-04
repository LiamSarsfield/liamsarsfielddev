<template>
  <div class="vue-terminal-parent terminal-text">
    <vue-command
      class="vue-terminal-command"
      ref="vueCommandRef"
      v-model:commands="commands"
      v-model:query="query"
      title="liamsarsfielddev@index: ~"
      prompt="~liamsarsfielddev@index:#/"
      hide-buttons
    />
  </div>
</template>

<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref } from 'vue';
import VueCommand, { createStdout, type VueCommandInstance } from 'vue-command';
import 'vue-command/dist/vue-command.css';
import VmStat from 'components/terminal/commands/VmStat.vue';

const vueCommandRef = ref<VueCommandInstance | null>(null);
const vmStatStdout = markRaw(VmStat);
const commands = ref({
  whoami: () => {
    return createStdout(
      'Enthusiastic software engineer with experience building secure, scalable, and maintainable software along with full-stack web development.',
    );
  },
  htop: () => {
    return createStdout(
      'I am currently working with GoLang, React/TypeScript and WordPress/WooCommerce integrations. Along with multiple years working with PHP (Laravel), MySQL, jQuery/JavaScript and CSS. I have also dabbled with Vue while experimenting with Node and GraphQL.',
    );
  },
  vmstat: () => {
    return vmStatStdout;
  },
});
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function typeAndRun(query: string, typingSpeed = 100) {
  const api = vueCommandRef.value;
  if (!api) return;

  await nextTick();
  const historyRefs = api.$refs.vueCommandHistoryEntryComponentRefs as Array<{
    $refs: { queryRef: HTMLInputElement };
  }>;
  const queryComponent = historyRefs?.[historyRefs.length - 1];
  const input: HTMLInputElement | undefined = queryComponent?.$refs?.queryRef;
  if (!input) return;

  input.focus({ preventScroll: true });
  input.value = '';
  // Trigger v-model sync so VueCommandQuery sees the emptied prompt
  input.dispatchEvent(new Event('input', { bubbles: true }));

  for (const char of query) {
    input.value += char;
    // Each character goes through the same input handler as real typing
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(typingSpeed);
  }

  const { scrollX, scrollY } = window;
  // When all characters are "typed", simulate hitting Enter
  input.dispatchEvent(
    new KeyboardEvent('keyup', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
    }),
  );

  // Wait for new prompt to mount and focus
  await nextTick();
  // Ensure the scroll position is maintained
  requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY);
  });
}

const query = ref('');

onMounted(async () => {
  await typeAndRun('whoami');
  await typeAndRun('htop');
  await typeAndRun('vmstat');
});
</script>

<style lang="scss">
.terminal-text {
  font-size: 1rem;
  font-weight: 300;
}

.vue-terminal-parent > .vue-command {
  .vue-command__bar {
    background-color: $dark;
    .vue-command__bar__title {
      font-size: 1rem;
      font-family:
        Consolas,
        Monaco,
        Andale Mono,
        Ubuntu Mono,
        monospace;
    }
  }

  .vue-command__query {
    align-items: center;
  }
}
</style>
