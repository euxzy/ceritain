<script lang="ts" setup>
  const { isLogged } = storeToRefs(userStore())
</script>

<template>
  <section class="container">
    <div class="pt-8 md:pt-24">
      <div class="w-72 mx-auto mb-2">
        <NuxtImg
          class="w-full"
          src="images/cats.png"
          alt="Ceritain"
          width="288"
          height="auto"
          format="webp"
          loading="lazy"
          densities="x1 x2"
        />
      </div>
      <div class="max-w-max mx-auto text-center font-medium text-lg leading-tight">
        <p>Ceritain</p>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </div>
      <div class="flex justify-center gap-[14px] mt-14 mb-16" v-if="!isLogged">
        <NuxtLink to="/login" class="bg-accent-2 py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-secondary" aria-label="Login">Login</NuxtLink>
        <NuxtLink to="/register" class="bg-accent-9 py-0.5 px-[22px] rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-secondary" aria-label="Register">Daftar</NuxtLink>
      </div>
    </div>
  </section>
</template>
