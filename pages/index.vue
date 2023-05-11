<script lang="ts" setup>
  import Swal from 'sweetalert2'
  
  const route = useRoute()
  const posts: Ref<Array<any>> = ref([])
  const page: Ref<number> = ref(1)
  const payload: { params: object } = { params: { page: 1 } }
  const isMoreData: Ref<boolean> = ref(true)

  const resProfile = await useGetData().resProfile()  
  const { pending, data: resPosts, error: err } = await useGetData().resPosts(payload)
  const refershNewData = async () => {
    posts.value = []
    const { pending, data } = await useGetData().resPosts(payload)
    watch(data, () => {
      resPosts.value = data.value
    })
    page.value = 1
  }

  watch(resPosts, () => {
    const dataPosts: any = resPosts.value
    const newPosts: Array<object> = dataPosts?.data || []
    if (newPosts.length < 5) isMoreData.value = false
    newPosts.map((item) => {
      posts.value.push(item)
    })
  })

  const loadMore = async () => {
    page.value++
    const payload: { params: object } = { params: { page: page.value } }
    const { pending: morePending, data, error: err } = await useGetData().resPosts(payload)
    resPosts.value = data.value
  }

  watch(route, async () => {
    const postKey: string = route.query?.posts?.toString() || ''
    let order_by = postKey
    if (postKey == 'menarik') order_by = 'most_likes'
    if (postKey == 'populer') order_by = 'most_views'

    if (postKey) {
      posts.value = []
      const payload: {
        params: object
      } = {
        params: {
          page: 1,
          data: 10,
          order_by
        }
      }
      const { pending, data, error: err } = await useGetData().resPosts(payload)
      resPosts.value = data.value
    }
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

    <Hastag />

    <section class="container">
      <p class="text-center text-xl my-5 font-bold">Cerita dari Orang-orang</p>
      <!-- <div 
        v-if="pending"
        class="w-11/12 mx-auto text-center text-2xl"
      >Loading...</div> -->
      <div class="w-11/12 mx-auto">
        <div class="text-center text-2xl" v-if="pending">Loading...</div>
        <PostCard 
          v-for="(post, idx) in posts"
          :key="idx"
          :post="post"
          v-else
        />
      </div>

      <button
        type="button"
        class="border bg-white my-16 font-medium block border-black rounded-lgm px-8 py-1 mx-auto drop-shadow-br transition-all duration-300 hover:-translate-y-1"
        v-on:click="loadMore"
        v-if="isMoreData"
      >
        Load more
      </button>
    </section>

    <Otakuline />

    <Footer />
  </section>
</template>
