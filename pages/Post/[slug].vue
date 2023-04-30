<script lang="ts" setup>
  const route = useRoute()
  const postId = route.params?.slug.toString()
  const postViews: string = 'update-views'

  const { pending: postStatus, data: resPost } = await useGetData().resDetailPost(postId, postViews)
  const post: Ref<any> = ref()
  watch(resPost, () => {
    post.value = resPost.value
  })

  const { pending: statusComment, data: resComments } = await useGetData().resComments(postId)
  const refreshComments = async () => {
    const { pending, data } = await useGetData().resComments(postId)
    watch(data, () => {
      resComments.value = data.value
    })
  }
  const comments: Ref<any> = ref()
  watch(resComments, () => {
    comments.value = resComments.value
  })
</script>
<template>
  <section class="container">
    <div class="pt-16 pb-5">
      <div class="w-72 mx-auto mb-2">
        <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
      </div>
      <div class="max-w-max mx-auto text-center font-medium text-lg leading-tight mb-14">
        <p>Ceritain</p>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </div>

      <NuxtLink
        :to="`/user/${post?.data?.user?.username}`"
        class="block w-20 mx-auto mb-3 rounded-full overflow-hidden drop-shadow-br aspect-square"
      >
        <img
          v-if="post?.data?.user?.profile && post?.data?.user?.profile.photo"
          :src="post?.data?.user?.profile.photo"
          :alt="post?.data?.user?.name"
          class="w-full object-cover aspect-square"
        />
        <img
          v-else
          src="~/assets/images/profile.png"
          :alt="post?.data?.user?.name"
          class="w-full object-cover aspect-square"
        />
      </NuxtLink>
      <p class="max-w-max mx-auto font-semibold text-lg mb-5">
        Cerita dari <NuxtLink :to="`/user/${post?.data?.user?.username}`">{{ post?.data?.user?.name }}</NuxtLink>
      </p>

      <div class="w-11/12 mx-auto">
        <div class="bg-primary border border-black rounded-lgm p-8 drop-shadow-br mb-3">
          <p>{{ post?.data?.content }}</p>
        </div>

        <div class="pt-12 sticky top-0 bg-white pb-8 z-20 drop-shadow-wt">
          <LazyFormComment
            :postId="post?.data?.id"
            @refreshComments="refreshComments"
          />
        </div>

        <div v-if="statusComment">
          <p>Loading...</p>
        </div>
        <div v-else>
          <Comment
            v-for="(item, idx) in comments?.data"
            :key="idx"
            :item="item"
          />
        </div>
      </div>
    </div>

    <Otakuline />
    <Footer />
  </section>
</template>
