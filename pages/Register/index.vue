<script lang="ts" setup>
  definePageMeta({
    middleware: ['auth']
  })
</script>

<template>
  <section>
    <section class="container">
      <div class="pt-12">
        <div class="w-72 mx-auto mb-2">
          <NuxtImg
            src="images/cats.png"
            class="w-full"
            alt="Ceritain"
            width="288"
            height="auto"
            format="webp"
            loading="lazy"
            densities="x1 x2"
          />
        </div>
        <div class="mx-auto max-w-max text-center text-lg font-medium">
          <p>Ayo buat akun sekarang!</p>
          <p>Sudah punya akun? ayo <NuxtLink to="/login" aria-label="Login">Login</NuxtLink></p>
        </div>
      </div>
    </section>

    <FormRegister />
  </section>
</template>
