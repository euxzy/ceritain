<script lang="ts" setup>
  const resPosts: Ref<any> = ref(await useGetData().resPosts())
  const resProfile = await useGetData().resProfile()

  const { data: response } = resPosts.value
  const res: Ref<any> = ref(response)
  const posts: Ref<Array<object>> = ref(res.value?.data || [])

  const isLoaded: Ref<boolean> = ref(true)
  const refershNewData = async () => {
    isLoaded.value = false
    resPosts.value = await useGetData().resPosts()
    res.value = resPosts.value.data
    posts.value = res.value?.data
    isLoaded.value = true
  }
</script>

<template>
  <section>
    <Hero :resProfile="resProfile" />

    <PostForm 
      :resProfile="resProfile"
      @refershNewData="refershNewData"
    />

    <section class="container">
      <p class="text-center text-xl my-5 font-bold">Cerita dari Orang-orang</p>
      <div class="w-11/12 mx-auto" v-if="isLoaded">
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
