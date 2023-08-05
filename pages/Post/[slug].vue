<script lang="ts" setup>
  const route = useRoute()
  const postId: string = route.params?.slug.toString() || ''

  const { getDetailPost, getComments } = postStore()
  const { detailPost, listComments, isCommentLoaded } = storeToRefs(postStore())

  await getDetailPost(postId)
  await getComments(postId)

  const refreshComments = async () => await getComments(postId)
</script>
<template>
  <section class="container">
    <div class="pt-8 md:pt-16 pb-5">
      <div class="w-72 mx-auto mb-2">
        <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
      </div>
      <div class="max-w-max mx-auto text-center font-medium text-lg leading-tight mb-14">
        <p>Ceritain</p>
        <p>Ceritakan semua yang pengen kamu ceritakan!</p>
      </div>

      <NuxtLink
        :to="`/user/${detailPost?.user?.username}`"
        class="block w-20 mx-auto mb-3 rounded-full overflow-hidden drop-shadow-br aspect-square"
      >
        <img
          v-if="detailPost?.user?.profile && detailPost?.user?.profile.photo"
          :src="detailPost?.user?.profile.photo"
          :alt="detailPost?.user?.name"
          class="w-full object-cover aspect-square"
        />
        <img
          v-else
          src="~/assets/images/profile.png"
          :alt="detailPost?.user?.name"
          class="w-full object-cover aspect-square"
        />
      </NuxtLink>
      <p class="max-w-max mx-auto font-semibold text-lg mb-5">
        Cerita dari <NuxtLink :to="`/user/${detailPost?.user?.username}`">{{ detailPost?.user?.name }}</NuxtLink>
      </p>

      <div class="w-11/12 mx-auto">
        <div class="bg-primary border border-black rounded-lgm p-8 drop-shadow-br mb-3">
          <p class="break-words">{{ detailPost?.content }}</p>
        </div>

        <div class="pt-12 sticky top-0 bg-white pb-8 z-20 drop-shadow-wt">
          <LazyFormComment
            :postId="detailPost?.id"
            @refreshComments="refreshComments"
          />
        </div>

        <div v-if="!isCommentLoaded">
          <p>Loading...</p>
        </div>
        <div v-else>
          <Comment
            v-for="(item, idx) in listComments"
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
