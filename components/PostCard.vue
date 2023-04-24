<script lang="ts" setup>
  import Swal, { SweetAlertOptions } from 'sweetalert2'
  import StoreInterface from '~~/interfaces/store.interface'

  const props = defineProps(['post'])
  const post = props.post

  const postId: string = post?.id || ''
  const payload: StoreInterface = {
    path: `api/${postId}/like`
  }

  watch(post, () => {
    post._count = post._count
    post.userLikes = post.userLikes
  })

  const onLikeClick = async () => {
    const resLikePost = await useStoreData(payload).resLikePost()
    const { error: err, data: resData } = resLikePost
    const errData: any = err.value?.data || null
    const data: any = resData.value || null

    if (data) {
      post._count = data?.data._count
      post.userLikes = data?.data.userLikes
    }

    if (errData) {
      const data: SweetAlertOptions = {
        title: 'Oopss!!! Sepertinya ada kesalahan. Mohon coba beberapa saat lagi!'
      }

      if (errData?.message == 'Forbidden!') data.title = 'Mohon login untuk memberikan like!'

      Swal.fire({
        icon: 'warning',
        title: data.title,
        customClass: 'drop-shadow-br !rounded-lgm'
      }).then(info => {
        if (info.isConfirmed || info.dismiss) {
          if (errData?.message == 'Forbidden!') navigateTo('/login')
        }
      })
    }

    if (!data && !errData) {
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error! Mohon coba beberapa saat lagi!',
        customClass: 'drop-shadow-br !rounded-lgm'
      })
    }
  }
</script>

<template>
  <div class="mb-5 text-lg">
    <div class="bg-primary border border-black rounded-lgm px-6 pt-3 pb-12 drop-shadow-br relative">
      <NuxtLink :to="`/post/${post?.id}`" class="absolute block w-full h-full top-0 left-0"></NuxtLink>

      <p class="text-xs mb-4">Dari <span class="text-lg font-medium">{{ post?.user?.name }}</span></p>

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
        <div class="bg-white rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <img src="~/assets/images/icons/share.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
