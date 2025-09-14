<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar size="44px" class="q-mr-sm">
            <img src="/logos/avatar.jpg" width="44" height="44" alt="Liam Sarsfield's Avatar" />
          </q-avatar>
          <span class="text-subtitle1">Liam Sarsfield</span>
          <q-space />
          <q-btn
            flat
            round
            color="white"
            icon="fab fa-linkedin"
            type="a"
            aria-label="Liam's LinkedIn Page"
            href="https://www.linkedin.com/in/liam-sarsfield-b38448137/"
            target="_blank"
          />
          <q-btn
            flat
            round
            color="white"
            icon="lab la-github"
            type="a"
            aria-label="Liam's GitHub Page"
            href="https://github.com/LiamSarsfield"
            target="_blank"
          />
          <q-btn
            flat
            round
            color="white"
            icon="fas fa-file-pdf"
            type="a"
            aria-label="Liam's CV"
            href="/cv/sarsfield-liam-cv.pdf"
            target="_blank"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  
</template>

<script setup lang="ts">
</script>
