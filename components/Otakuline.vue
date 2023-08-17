<script lang="ts" setup>
  const { getOtakulinePosts } = postStore()
  const { isOLPostLoaded, otakulinePosts } = storeToRefs(postStore())

  await getOtakulinePosts()
</script>

<template>
  <section class="container">
    <div class="w-11/12 mx-auto text-center my-10">
      <p class="text-xl font-semibold mb-5">News by <a href="https://otakuline.id" target="_blank" aria-label="To Otakuline.id">Otaku Line</a></p>
      <p v-if="!isOLPostLoaded" class="bg-accent-4 rounded-lgm border border-black drop-shadow-br py-1.5 pl-5 overflow-hidden  transition-all duration-300 hover:-translate-y-2">Loading...</p>
      <a
        v-else
        v-for="(item, idx) of otakulinePosts"
        :key="idx"
        :href="item?.link"
        target="_blank"
        class="relative block bg-accent-4 rounded-lgm border border-black drop-shadow-br py-1.5 pl-5 overflow-hidden  transition-all duration-300 hover:-translate-y-2"
        aria-label="To Otakuline.id"
      >
        <div class="absolute w-3 h-3 bg-white border border-black inset-y-0 my-auto left-0 rounded-full translate-x-4 lg:translate-x-7"></div>
        <p
          class="px-4 md:px-8 truncate"
          v-html="item?.title?.rendered"
        >
        </p>
      </a>
    </div>
  </section>
</template>
