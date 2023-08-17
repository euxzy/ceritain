<script lang="ts" setup>
  import DetailPostInterface from '~/interfaces/post/detail.interface'

  const params = useRoute().params
  const username: string = params?.username.toString() || ''
  const isPostsLoaded: Ref<boolean> = ref(false)

  const { getUserDetail } = userStore()
  const { userDetail, isDetailLoaded } = storeToRefs(userStore())
  const { getListPost } = postStore()
  const { listPosts, status } = storeToRefs(postStore())

  await getUserDetail(username)

  const isShare: Ref<boolean> = ref(false)
  const postContent: Ref<DetailPostInterface> = ref({})
  const setShareContent = (post: DetailPostInterface) => {
    postContent.value = post
  }

  const posts: Ref<Array<DetailPostInterface>> = ref([])
  const page: Ref<number> = ref(1)
  const payload: object = {
    page: 1,
    posts_by: username
  }
  const isMoreData: Ref<boolean> = ref(true)

  await getListPost(payload)
  if (status) {
    posts.value = listPosts.value
    isPostsLoaded.value = true

    if (listPosts.value.length < 5) isMoreData.value = false
  }

  watch(listPosts, () => {
    const newPosts: Array<DetailPostInterface> = listPosts.value || []
    if (newPosts.length < 5 ) isMoreData.value = false
    newPosts.map((item) => {
      posts.value.push(item)
    })
  })

  const loadMore = async () => {
    page.value++
    const payload: object = {
      page: page.value,
      posts_by: username
    }
    
    await getListPost(payload)
  }

  const isShowUpdate: Ref<boolean> = ref(false)
</script>
<template>
  <section>
    <section class="container my-14">
      <div class="bg-white w-full mx-auto sticky top-0 py-4 z-20 mb-4">
        <div class="bg-white w-11/12 mx-auto p-4 border border-black drop-shadow-br rounded-lgm mb-6">
          <div class="flex gap-4 sm:gap-8 items-center mb-4 sm:mb-0">
            <div class="rounded-full border border-black drop-shadow-br w-20 h-20 sm:w-24 sm:h-24 aspect-square overflow-hidden bg-white">
              <NuxtImg 
                v-if="!userDetail?.profile && !userDetail?.profile?.photo"
                src="images/profile.png" 
                alt="Profile" 
                class="w-full object-cover aspect-square"
                width="96"
                height="96"
                format="webp"
                loading="lazy"
                densities="x1 x2"
              />
              <NuxtImg 
                v-else
                :src="userDetail?.profile?.photo" 
                :alt="userDetail?.name" 
                class="w-full object-cover aspect-square"
                width="96"
                height="96"
                format="webp"
                loading="lazy"
                densities="x1 x2"
              />
            </div>
            <div class="flex-1">
              <div class="md:flex gap-4 items-baseline mb-2">
                <p class="text-2xl font-bold" v-if="!isDetailLoaded">{{ userDetail?.name }}</p>
                <p class="text-xs">1K followers • 1K following</p>
                <!-- <div>
                  <button
                    type="button"
                    class="rounded-lgm text-xs font-bold bg-accent-3 px-2 py-1 border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300"
                    @click="isShowUpdate = true"
                  >
                    Edit profile
                  </button>
                </div> -->
              </div>
              <p class="text-sm hidden sm:block" v-if="!isDetailLoaded">{{ userDetail?.profile?.bio }}</p>
            </div>
          </div>
          
          <p class="text-sm sm:hidden" v-if="!isDetailLoaded">{{ userDetail?.profile?.bio }}</p>
        </div>

        <p class="font-bold text-lg px-4 md:px-8">Postingan dari {{ userDetail?.name }}</p>
      </div>

      <div class="w-11/12 mx-auto" v-if="isPostsLoaded">
        <PostCard
          v-for="(post, idx) of posts"
          :key="idx"
          :post="post"
          @share="isShare = true"
          @setShareContent="setShareContent"
        />
      </div>

      <button
        v-if="isMoreData"
        type="button"
        class="border bg-white my-16 font-medium block border-black rounded-lgm px-8 py-1 mx-auto drop-shadow-br transition-all duration-300 hover:-translate-y-1"
        @click="loadMore"
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

    <Transition
      enter-active-class="duration-300"
      enter-from-class="transform opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-6"
    >
      <ModalEditProfile
        v-if="isShowUpdate"
        @isUpdate="isShowUpdate = false"
      />
    </Transition>
  </section>
</template>
