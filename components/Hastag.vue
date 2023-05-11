<template>
  <section class="container font-semibold mt-12 mb-16">
    <h2 class="mx-auto w-max mb-5 text-xl">#Tagar</h2>
    <ul class="w-11/12 mx-auto flex justify-start md:justify-between flex-wrap gap-3">
      <li class="w-max">
        <NuxtLink 
          :to="{ name: 'index' }"
          class="inline-block bg-accent-5 rounded-lg py-2 px-5 md:px-8 text-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300"
        >Cerita hari ini</NuxtLink>
      </li>
      <li class="w-max">
        <NuxtLink 
          :to="{ name: 'index', query: { posts: 'menarik' } }"
          class="inline-block bg-accent-1 rounded-lg py-2 px-5 md:px-8 text-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300"
        >Paling menarik</NuxtLink>
      </li>
      <li class="w-max">
        <NuxtLink 
          :to="{ name: 'index', query: { posts: 'populer' } }"
          class="inline-block bg-accent-8 rounded-lg py-2 px-5 md:px-8 text-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300"
        >Banyak dilihat</NuxtLink>
      </li>
      <li class="w-max">
        <NuxtLink 
          :to="{ name: 'index' }"
          class="inline-block bg-accent-4 rounded-lg py-2 px-5 md:px-8 text-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300"
        >Mr</NuxtLink>
      </li>
    </ul>
  </section>
</template>
