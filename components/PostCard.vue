<script lang="ts" setup>
  import Swal, { SweetAlertOptions } from 'sweetalert2'
  import DetailPostInterface from '~/interfaces/post/detail.interface'

  const props = defineProps(['post'])
  const post: DetailPostInterface = props.post

  const emit = defineEmits(['share', 'setShareContent'])

  const postId: string = post?.id || ''

  watch(post, () => {
    post._count = post._count
    post.userLikes = post.userLikes
  })

  const { postLikes } = postStore()
  const { status, message, likePost } = storeToRefs(postStore())

  const onLikeClick = async () => {
    await postLikes(postId)

    if (status.value) {
      post._count = likePost.value?._count
      post.userLikes = likePost.value?.userLikes
    }

    if (!status.value) {
      const data: SweetAlertOptions = {
        title: 'Oopss!!! Sepertinya ada kesalahan. Mohon coba beberapa saat lagi!'
      }

      if (message.value == 'Forbidden!') data.title = 'Mohon login untuk memberikan like!'

      Swal.fire({
        icon: 'warning',
        title: data.title,
        customClass: 'drop-shadow-br !rounded-lgm'
      }).then(info => {
        if (info.isConfirmed || info.dismiss) {
          if (message.value == 'Forbidden!') navigateTo('/login')
        }
      })
    }
  }

  const onShareClick = () => {
    emit('setShareContent', post)
    emit('share')
  }
</script>

<template>
  <div class="mb-5 text-lg">
    <div class="bg-primary border border-black rounded-lgm px-6 pt-3 pb-12 drop-shadow-br relative">
      <NuxtLink :to="`/post/${post?.id}`" class="absolute block w-full h-full top-0 left-0"></NuxtLink>

      <p class="relative text-xs mb-4 max-w-max">Dari <NuxtLink :to="`/user/${post?.user?.username}`" class="text-lg font-medium">{{ post?.user?.name }}</NuxtLink></p>

      <p class="mb-1">{{ post?.content }}</p>

      <div class="absolute w-max flex gap-[10px] justify-end right-6 bottom-4">
        <button
          type="button"
          v-on:click="onLikeClick"
          class="group relative rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300"
          :class="post?.userLikes.length > 0 ? 'bg-accent-5' : 'bg-white'"
        >
          <span 
            class="absolute -top-7 w-max -left-[80%] text-xs bg-white px-2 py-0.5 rounded-lgm border border-black opacity-0 transition-all duration-300 group-hover:opacity-100 select-none"
          >
            {{ post?._count?.userLikes }} Likes
          </span>
          <img src="~/assets/images/icons/favorite.svg" alt="">
        </button>
        <NuxtLink 
          :to="`/post/${post?.id}`"
          class="group bg-accent-7 relative rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300"
        >
          <span
            class="absolute -top-7 w-max -left-[150%] text-xs bg-white px-2 py-0.5 rounded-lgm border border-black opacity-0 transition-all duration-300 group-hover:opacity-100 select-none"
          >
            {{ post?._count?.comments }} Comments
          </span>
          <img src="~/assets/images/icons/topic.svg" alt="">
        </NuxtLink>
        <div class="group relative bg-white rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300" @click="onShareClick">
          <span
            class="absolute -top-7 w-max -left-4 text-xs bg-white px-2 py-0.5 rounded-lgm border border-black opacity-0 transition-all duration-300 group-hover:opacity-100 select-none"
          >
            Share
          </span>
          <img src="~/assets/images/icons/share.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
