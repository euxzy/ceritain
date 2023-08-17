<script lang="ts" setup>
  import DetailPostInterface from '~/interfaces/post/detail.interface'
  
  const route = useRoute()
  const posts: Ref<Array<DetailPostInterface>> = ref([])
  const page: Ref<number> = ref(1)
  const payload: object = { page: 1 }
  const isMoreData: Ref<boolean> = ref(true)

  const isPostsLoaded: Ref<boolean> = ref(false)
  const { getListPost } = postStore()
  const { listPosts, status } = storeToRefs(postStore())

  await getListPost(payload)
  if (status) {
    posts.value = listPosts.value
    isPostsLoaded.value = true
  }
 
  const refreshNewData = async () => {
    isPostsLoaded.value = false
    posts.value = []
    await getListPost(payload)

    page.value = 1
  }

  watch(listPosts, () => {
    const newPosts: Array<DetailPostInterface> = listPosts.value || []
    if (newPosts.length < 5) isMoreData.value = false
    newPosts.map((item) => {
      posts.value.push(item)
    })

    isPostsLoaded.value = true
  })

  const loadMore = async () => {
    page.value++
    const payload: object = { page: page.value }

    await getListPost(payload)
  }

  watch(route, async () => {
    const postKey: string = route.query?.posts?.toString() || ''
    let order_by: string = postKey

    if (postKey == 'menarik') order_by = 'most_likes'
    if (postKey == 'populer') order_by = 'most_views'
    const data: number = order_by == 'most_likes' || order_by == 'most_views' ? 10 : 5

    posts.value = []
    const payload: object = {
        page: 1,
        data,
        order_by,
    }

    await getListPost(payload)

    if (order_by == 'most_likes' || order_by == 'most_views') isMoreData.value = false
    else isMoreData.value = true
    page.value = 1
  })

  const isShare: Ref<boolean> = ref(false)
  const postContent: Ref<any> = ref()
  const setShareContent = (post: any) => {
    postContent.value = post
  }
</script>

<template>
  <section>
    <LazyHero />

    <LazyPostForm
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
        <div class="text-center text-2xl" v-if="!isPostsLoaded">Loading...</div>
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
        aria-label="Load More"
      >
        Load more
      </button>
    </section>

    <Otakuline />

    <TheFooter />

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
