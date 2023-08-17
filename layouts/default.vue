<script lang="ts" setup>
import { seoContent } from '~/utils/constants/baseSEO'

useServerSeoMeta({
  title: seoContent.title,
  ogTitle: seoContent.title,
  description: seoContent.description,
  ogDescription: seoContent.description,
})

useHead({
  meta: [
    {
      name: 'keywords',
      content: seoContent.keywords,
    },
  ]
})
</script>

<template>
  <section>
    <slot />

    <Navbar />
  </section>
</template>
