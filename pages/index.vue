<script lang="ts" setup>
  const resPosts = await useGetData().resPosts()
  const resProfile = await useGetData().resProfile()

  const { data: response } = resPosts

  const res: any = response.value
  const posts: Array<object> = res?.data || []
</script>

<template>
  <section>
    <Hero :resProfile="resProfile" />

    <PostForm :resProfile="resProfile" />

    <section class="container">
      <p class="text-center text-xl my-5 font-bold">Cerita dari Orang-orang</p>
      <div class="w-11/12 mx-auto">
        <PostCard 
          v-for="(post, idx) in posts"
          :key="idx"
          :post="post"
        />
      </div>

      <button type="button" class="border bg-white my-16 font-medium block border-black rounded-lgm px-8 py-1 mx-auto drop-shadow-br transition-all duration-300 hover:-translate-y-1">Load more</button>
    </section>

    <Otakuline />

    <Footer />
  </section>
</template>
