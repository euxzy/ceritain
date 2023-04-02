<template>
  <section class="container">
    <div class="w-max mx-auto pt-16 pb-8 font-medium text-lg">
      <h1 class="relative font-extrabold text-5xl px-3 w-max mx-auto mb-0.5">
        Cerita 
        <span class="absolute w-5 h-5 pl-0.5 bg-black text-white rounded-full text-xs font-medium flex items-center top-0 -right-1">.in</span>
      </h1>
      <p>Ceritakan semua yang pengen kamu ceritakan!</p>
    </div>

    <PostForm />

    <div class="mt-12">
      <BtnNav />
    </div>

    <div class="mt-12">
      <div class="w-[1024px] mx-auto">
        <div class="flex justify-between flex-wrap gap-y-6">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>

    <Footer />
  </section>
</template>
