<script lang="ts" setup>
  import Swal from 'sweetalert2'
  
  const route = useRoute()
  const posts: Ref<Array<any>> = ref([])
  const page: Ref<number> = ref(1)
  const payload: { params: object } = { params: { page: 1 } }
  const isMoreData: Ref<boolean> = ref(true)

  const resProfile = await useGetData().resProfile()  
  const { pending, data: resPosts, error: err } = await useGetData().resPosts(payload)
  const refreshNewData = async () => {
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
    let order_by: string = postKey

    if (postKey == 'menarik') order_by = 'most_likes'
    if (postKey == 'populer') order_by = 'most_views'
    const data: number = order_by == 'most_likes' || order_by == 'most_views' ? 10 : 5

    posts.value = []
    const payload: {
      params: object
    } = {
      params: {
        page: 1,
        data,
        order_by
      }
    }
    const { pending, data: resData, error: err } = await useGetData().resPosts(payload)
    resPosts.value = resData.value
    if (order_by == 'most_likes' || order_by == 'most_views') isMoreData.value = false
    else isMoreData.value = true
    page.value = 1
  })

  const isShare: Ref<boolean> = ref(false)
  const postContent: Ref<any> = ref()
  const setShareContent = (post: any) => {
    postContent.value = post
  }

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
      @refreshNewData="refreshNewData"
    />

    <Hashtag />

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
          @share="isShare = true"
          @setShareContent="setShareContent"
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

    <Transition
      enter-active-class="duration-300"
      enter-from-class="transform opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-6"
    >
      <ModalShare 
        v-if="isShare"
        :postContent="postContent"
        :setShareContent="setShareContent"
        @share="isShare = false"
      />
    </Transition>
  </section>
</template>
