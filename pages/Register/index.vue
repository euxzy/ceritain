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
          <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
        </div>
        <div class="mx-auto max-w-max text-center text-lg font-medium">
          <p>Ayo buat akun sekarang!</p>
          <p>Sudah punya akun? ayo <NuxtLink to="/login">Login</NuxtLink></p>
        </div>
      </div>
    </section>

    <FormRegistrer />
  </section>
</template>
