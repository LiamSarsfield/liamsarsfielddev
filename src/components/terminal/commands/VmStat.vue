<template>
  <span class="vmstat-output">
    Public portfolio includes:
    <LsAnchor
      class="vmstat-link vmstat-link--auxion"
      :underline-gradient="auxionGradient"
      href="https://auxion.net"
    >
      auxion.net (Laravel/MySQL/jQuery/SCSS) </LsAnchor
    >,
    <LsAnchor
      class="vmstat-link vmstat-link--claimlink"
      :underline-gradient="claimLinkGradient"
      href="https://claimlink.net"
    >
      claimlink.net (Laravel/MySQL/jQuery/SCSS) </LsAnchor
    >,
    <LsAnchor
      class="vmstat-link vmstat-link--discord"
      :underline-gradient="discordGradient"
      href="https://github.com/LiamSarsfield/checkers-bot"
    >
      Discord Checkers bot (Node.js/Discord.js) </LsAnchor
    >, and this website (Vue/Quasar Framework).
  </span>
</template>

<script setup lang="ts">
import LsAnchor from 'components/custom/LsAnchor.vue';

const auxionGradient = ['#374151', '#b91c1c'];
const claimLinkGradient = ['#374151', '#c2410c'];
const discordGradient = ['#374151', '#92400e'];
</script>

<style scoped>
.vmstat-output {
  display: inline;
}

.vmstat-link {
  cursor: pointer;
}

.vmstat-link--auxion {
  color: #dc2626;
}

.vmstat-link--claimlink {
  color: #f97316;
}

.vmstat-link--discord {
  color: #facc15;
}

.vmstat-link:hover {
  filter: brightness(1.05);
}
</style>
