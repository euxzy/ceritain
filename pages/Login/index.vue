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
          <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
        </div>
        <div class="mx-auto max-w-max text-center text-lg font-medium">
          <p>Ayo login untuk mulai bercerita!</p>
          <p>Belum punya akun? ayo <NuxtLink to="/register">Daftar</NuxtLink></p>
        </div>
      </div>
    </section>

    <FormLogin />
  </section>
</template>
