<script lang="ts" setup>
  import Swal from 'sweetalert2'

  const resProfile = await useGetData().resProfile()

  const { pending, data: resPosts, error: err } = await useGetData().resPosts()
  const refershNewData = async () => {
    const { pending, data } = await useGetData().resPosts()
    watch(data, () => {
      resPosts.value = data.value
    })
  }

  const posts: Ref<any> = ref([])
  watch(resPosts, () => {
    posts.value = resPosts.value
  })

  if (!resPosts.value && !err) {
    Swal.fire({
      icon: 'error',
      title: 'Internal Server Error! Mohon coba beberapa saat lagi!',
      customClass: 'drop-shadow-br !rounded-lgm'
    })
  }
</script>

<template>
  <section>
    <LazyHero :resProfile="resProfile" />

    <LazyPostForm 
      :resProfile="resProfile"
      @refershNewData="refershNewData"
    />

    <section class="container">
      <p class="text-center text-xl my-5 font-bold">Cerita dari Orang-orang</p>
      <div 
        v-if="pending"
        class="w-11/12 mx-auto text-center text-2xl"
      >Loading...</div>
      <div class="w-11/12 mx-auto" v-else>
        <PostCard 
          v-for="(post, idx) in posts?.data"
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
