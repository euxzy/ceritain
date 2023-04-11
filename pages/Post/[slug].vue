<template>
  <section class="container">
    <div class="pt-20 flex justify-between">
      <div class="w-[52%]">
        <div class="z-20 relative">
          <div class="w-72 mx-auto -mb-[9.3px]">
            <img class="w-full drop-shadow-wt" src="~/assets/images/cats.png" alt="Ceritain">
          </div>
        </div>
        <div class="w-full z-10 relative">
          <PostCard />

          <p class="mt-10 mb-2 font-bold text-lg ms-1">Ayo Tulis Komentarmu</p>
          <FormComment />
        </div>
      </div>
      <div class="w-[46%]">
        <p class="mb-2 font-bold text-xl">Komentar kalian</p>
        <div class="bg-white rounded-lgm drop-shadow-br border border-black p-4 max-h-[75vh] overflow-y-scroll">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  </section>
</template>
