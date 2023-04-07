<script lang="ts" setup>
  const resOtakuline = await useGetData().resOtakuLine()
  const news: any = resOtakuline.data.value
</script>

<template>
  <section class="container">
    <div class="w-11/12 mx-auto text-center my-10">
      <p class="text-xl font-semibold mb-5">News by <a href="https://otakuline.id" target="_blank">Otaku Line</a></p>
      <a 
        v-for="(item, idx) of news"
        :key="idx"
        :href="item?.link"
        target="_blank"
        class="relative block bg-accent-4 rounded-lgm border border-black drop-shadow-br py-1.5 pl-5 overflow-hidden  transition-all duration-300 hover:-translate-y-2"
      >
        <div class="absolute w-3 h-3 bg-white border border-black inset-y-0 my-auto left-0 rounded-full translate-x-4 lg:translate-x-7"></div>
        <p
          class="px-10 md:px-0"
          v-html="item?.title?.rendered"
        >
        </p>
      </a>
    </div>
  </section>
</template>
