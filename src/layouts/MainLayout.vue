<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="tw-bg-secondary">
      <q-toolbar>
        <q-toolbar-title class="tw-flex tw-items-center">
          <q-avatar size="44px" class="tw-mr-2">
            <img src="logos/avatar.jpg" width="44px" height="44px" alt="Liam Sarsfield's Avatar">
          </q-avatar>
          Liam Sarsfield
          <span class="tw-ml-auto">
            <q-btn flat round icon="fab fa-linkedin" type="a" alt="Liam's LinkedIn Page"
                   href="https://www.linkedin.com/in/liam-sarsfield-b38448137/" target="_blank"/>
            <q-btn flat round icon="lab la-github" type="a" alt="Liam's GitHub Page"
                   href="https://github.com/LiamSarsfield" target="_blank"/>
            <q-btn flat round icon="fas fa-file-pdf" type="a" alt="Liam's CV"
                   href="/cv/sarsfield-liam-cv.pdf" target="_blank"/>
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>
