<script lang="ts" setup>
  const route = useRoute()
  const param = route.params?.slug.toString()

  const { pending: postStatus, data: resPost } = await useGetData().resDetailPost(param)
  const post: Ref<any> = ref()
  watch(resPost, () => {
    post.value = resPost.value
  })

  const { pending: statusComment, data: resComments } = await useGetData().resComments(param)
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

      <div class="w-20 mx-auto mb-3 rounded-full overflow-hidden drop-shadow-br">
        <img src="~/assets/images/profile.png" alt="Profile" />
      </div>
      <p class="max-w-max mx-auto font-semibold text-lg mb-5">Cerita dari {{ post?.data?.user?.name }}</p>

      <div class="w-11/12 mx-auto">
        <div class="bg-primary border border-black rounded-lgm p-8 drop-shadow-br mb-3">
          <p>{{ post?.data?.content }}</p>
        </div>

        <div class="pt-12 sticky top-0 bg-white pb-8 z-20 drop-shadow-wt">
          <LazyFormComment :postId="post?.data?.id" />
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
