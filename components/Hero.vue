<template>
  <section class="container">
    <div class="pt-24">
      <div class="w-72 mx-auto mb-2">
        <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
      </div>
      <div class="w-max mx-auto text-center font-medium text-lg leading-tight">
        <p>Ceritain</p>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </div>
      <div class="flex justify-center gap-[14px] mt-14">
        <NuxtLink to="/login" class="bg-accent-2 py-0.5 px-6 rounded-lgm border border-black drop-shadow-br">Login</NuxtLink>
        <NuxtLink to="/register" class="bg-accent-9 py-0.5 px-[22px] rounded-lgm border border-black drop-shadow-br">Daftar</NuxtLink>
      </div>
    </div>
  </section>
</template>
