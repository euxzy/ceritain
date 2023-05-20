<script lang="ts" setup>
  const params = useRoute().params
  const username: string = params?.username.toString() || ''
  const { pending, data: resUser, error } = await useGetData().resUserProfile(username)
  const dataUser: Ref<any> = ref()
  watch(resUser, () => {
    const data: any = resUser.value
    dataUser.value = data?.data
  })

  const isShare: Ref<boolean> = ref(false)
  const postContent: Ref<any> = ref()
  const setShareContent = (post: any) => {
    postContent.value = post
  }

  const posts: Ref<Array<any>> = ref([])
  const page: Ref<number> = ref(1)
  const payload: { params: object } = {
    params: { 
      page: 1,
      posts_by: username
    }
  }
  const isMoreData: Ref<boolean> = ref(true)

  const { pending: isPostPending, data: resPosts, error: errPosts } = await useGetData().resPosts(payload)
  watch(resPosts, () => {
    const dataPosts: any = resPosts.value
    const newPosts: Array<object> = dataPosts?.data || []
    if (newPosts.length < 5 ) isMoreData.value = false
    newPosts.map((item) => {
      posts.value.push(item)
    })
  })

  const loadMore = async () => {
    page.value++
    const payload: { params: object } = {
      params: {
        page: page.value,
        posts_by: username
      }
    }
    const { pending: morePending, data, error: err } = await useGetData().resPosts(payload)
    resPosts.value = data.value
  }
</script>
<template>
  <section>
    <section class="container my-14">
      <div class="bg-white w-full mx-auto sticky top-0 py-4 z-20 mb-4">
        <div class="bg-white w-11/12 mx-auto p-4 border border-black drop-shadow-br rounded-lgm mb-6">
          <div class="flex gap-4 sm:gap-8 items-center mb-4 sm:mb-0">
            <div class="rounded-full border border-black drop-shadow-br w-20 h-20 sm:w-24 sm:h-24 aspect-square overflow-hidden bg-white">
              <img 
                src="~/assets/images/profile.png" 
                alt="Profile" 
                class="w-full object-cover aspect-square"
                v-if="!dataUser?.profile && !dataUser?.profile?.photo">
              <img 
                :src="dataUser?.profile?.photo" 
                :alt="dataUser?.name" 
                class="w-full object-cover aspect-square"
                v-else>
            </div>
            <div class="flex-1">
              <div class="md:flex gap-4 items-baseline mb-2">
                <p class="text-2xl font-bold" v-if="!pending">{{ dataUser?.name }}</p>
                <p class="text-xs">1K followers • 1K following</p>
              </div>
              <p class="text-sm hidden sm:block" v-if="!pending">{{ dataUser?.profile?.bio }}</p>
            </div>
          </div>
          
          <p class="text-sm sm:hidden" v-if="!pending">{{ dataUser?.profile?.bio }}</p>
        </div>

        <p class="font-bold text-lg px-4 md:px-8">Postingan dari {{ dataUser?.name }}</p>
      </div>

      <div class="w-11/12 mx-auto" v-if="!isPostPending">
        <PostCard
          v-for="(post, idx) of posts"
          :key="idx"
          :post="post"
          @share="isShare = true"
          @setShareContent="setShareContent"
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
