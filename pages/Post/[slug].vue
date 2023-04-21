<template>
  <section class="container">
    <div class="pt-16 pb-20">
      <div class="w-72 mx-auto mb-2">
        <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
      </div>
      <div class="max-w-max mx-auto text-center font-medium text-lg leading-tight mb-14">
        <p>Ceritain</p>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </div>

      <div class="w-20 mx-auto mb-3 rounded-full overflow-hidden drop-shadow-br">
        <img src="~/assets/images/profile.png" alt="Profile" />
      </div>
      <p class="max-w-max mx-auto font-semibold text-lg mb-5">Cerita dari Yura Yuvenil</p>

      <div class="w-11/12 mx-auto">
        <div class="bg-primary border border-black rounded-lgm p-8 drop-shadow-br mb-12">
          <p>Bersyukur adalah salah satu konsep yang gak bisa kuterima mentah-mentah karena sering kali jadi alasan bos-bos untuk menenangkan karyawannya bahwa gak naek gaji gak masalah yang penting udah digaji. Bangsad</p>
        </div>

        <FormComment />
      </div>

    </div>

    <Otakuline />
    <Footer />
  </section>
</template>
