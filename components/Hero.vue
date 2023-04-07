<script lang="ts" setup>
  const { resProfile } = await useGetData()
  const dataUser: any = resProfile.data.value || null
</script>

<template>
  <section class="container">
    <div class="pt-24">
      <div class="w-72 mx-auto mb-2">
        <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
      </div>
      <div class="max-w-max mx-auto text-center font-medium text-lg leading-tight">
        <p>Ceritain</p>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </div>
      <div class="flex justify-center gap-[14px] mt-14 mb-16" v-if="!dataUser?.status">
        <NuxtLink to="/login" class="bg-accent-2 py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-secondary">Login</NuxtLink>
        <NuxtLink to="/register" class="bg-accent-9 py-0.5 px-[22px] rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-secondary">Daftar</NuxtLink>
      </div>
    </div>
  </section>
</template>
