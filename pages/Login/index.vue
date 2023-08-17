<script lang="ts" setup>
  definePageMeta({
    middleware: ['auth']
  })
</script>

<template>
  <section>
    <section class="container">
      <div class="pt-24 mb-8">
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
        <div class="mx-auto max-w-max text-center text-lg font-medium">
          <p>Ayo login untuk mulai bercerita!</p>
          <p>Belum punya akun? ayo <NuxtLink to="/register" aria-label="Register">Daftar</NuxtLink></p>
        </div>
      </div>
    </section>

    <FormLogin />
  </section>
</template>
