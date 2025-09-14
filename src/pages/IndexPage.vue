<template>
  <q-page class="row justify-center q-pa-md">
    <q-card class="col-12 col-sm-10 col-md-8 bg-primary text-white">
      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="code" />
            </q-item-section>
            <q-item-section class="text-h6">About Me</q-item-section>
          </template>
          <div class="q-pa-md">
            <p class="q-mb-sm text-body1">
              Hi, I'm Liam — a software engineer with experience across frontend and backend.
            </p>
            <p class="text-body2 q-mb-none">
              This section will be expanded with more details shortly.
            </p>
          </div>
        </q-expansion-item>
      </q-card-section>

      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="timeline" />
            </q-item-section>
            <q-item-section class="text-h6">Experience</q-item-section>
          </template>
          <div class="q-pa-md">
            <q-card flat bordered class="q-mb-md">
              <q-card-section class="row items-center">
                <q-icon name="work_outline" class="q-mr-sm" />
                <div class="text-subtitle1">Selected Roles</div>
                <q-space />
                <div class="text-caption">
                  <q-icon name="schedule" class="q-mr-xs" size="xs" />
                  Timeline overview
                </div>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item>
                  <q-item-section>
                    Working with HTML, CSS, TypeScript/JavaScript, React, Go, PHP, PostgreSQL.
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Experience integrating Google Cloud Platform tools (Pub/Sub, GKE, BigQuery,
                    Cloud Tracing) with Terraform.
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Led product initiatives including Stripe integrations and WooCommerce gateway
                    development.
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
            <div class="text-caption text-grey-7">
              More detailed timeline will be migrated in a later step.
            </div>
          </div>
        </q-expansion-item>
      </q-card-section>

      <q-card-section>
        <q-expansion-item expand-separator default-opened header-class="bg-black text-white">
          <template #header>
            <q-item-section avatar>
              <q-icon name="integration_instructions" />
            </q-item-section>
            <q-item-section class="text-h6">Side Projects</q-item-section>
          </template>
          <div class="q-pa-md">
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-subtitle2">liamsarsfield.dev</div>
                <div class="text-caption">Personal website</div>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item>
                  <q-item-section>
                    Originally written in Vue 2 and migrated to Vue 3.
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> Uses Quasar Framework. </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Hosted on Google Cloud using Google Kubernetes Engine.
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
// No Tailwind; using Quasar grid/utilities and components
</script>

<style scoped></style>
