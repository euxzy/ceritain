<template>
  <section>
    <ul class="w-[1024px] mx-auto flex justify-center gap-5">
      <li class="relative w-max">
        <div class="absolute w-full min-h-[calc(100%_+_4px)] top-0 left-0 rounded-xl bg-black"></div>
        <NuxtLink 
          :to="{ name: 'index' }"
          class="inline-block relative bg-accent-4 rounded-lg py-2 w-52 font-semibold text-center border border-black border-b-0 hover:bg-white hover:text-accent-4 transition-all duration-300"
        >Cerita hari ini</NuxtLink>
      </li>
      <li class="relative w-max">
        <div class="absolute w-full min-h-[calc(100%_+_4px)] top-0 left-0 rounded-xl bg-black"></div>
        <NuxtLink 
          :to="{ name: 'index' }"
          class="inline-block relative bg-accent-2 rounded-lg py-2 w-52 font-semibold text-center border border-black border-b-0 hover:bg-white hover:text-accent-2 transition-all duration-300"
        >Paling menarik</NuxtLink>
      </li>
      <li class="relative w-max">
        <div class="absolute w-full min-h-[calc(100%_+_4px)] top-0 left-0 rounded-xl bg-black"></div>
        <NuxtLink 
          :to="{ name: 'index' }"
          class="inline-block relative bg-accent-3 rounded-lg py-2 w-52 font-semibold text-center border border-black border-b-0 hover:bg-white transition-all duration-300"
        >Banyak dilihat</NuxtLink>
      </li>
    </ul>
  </section>
</template>
