<script lang="ts" setup>
  import Swal, { SweetAlertOptions } from 'sweetalert2'
  import StoreInterface from '~~/interfaces/store.interface'

  const props = defineProps(['postId'])
  let postId: string = props?.postId
  watch(props, () => {
    postId = props?.postId
  })

  const emit = defineEmits(['refreshComments'])
  const content: Ref<string> = ref('')

  const formComment: Ref<any> = ref()
  const onFormSubmit = async () => {
    const formData = new FormData(formComment.value)
    const payload: StoreInterface = {
      path: 'api/comment/add',
      formData
    }

    const resComments = await useStoreData(payload).resComment()
    const res: any = resComments.data.value
    const err: any = resComments.error.value?.data || null

    if (res?.status) {
      Swal.fire({
        icon: 'success',
        title: 'Komentarmu telah dikirim!',
        customClass: 'drop-shadow-br !rounded-lgm',
        showConfirmButton: false,
        timer: 900
      })
      content.value = ''
      emit('refreshComments')
    }

    if (err) {
      const data: SweetAlertOptions = {
        title: 'Mohon login dulu untuk memberikan komentar!'
      }

      if (err?.message.includes('content')) data.title = 'Kamu belum menulis komentar apapun!'
      if (err?.message.includes('postId')) data.title = 'Sepertinya ada kesalahan, mohon coba beberapa saat lagi!'

      Swal.fire({
        icon: 'info',
        title: data.title,
        customClass: 'drop-shadow-br !rounded-lgm'
      }).then((info) => {
        if (info.isConfirmed) {
          if (err?.statusCode == 403) navigateTo('/login')
        }
      })
    }

    if (!err && !res) {
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error! Mohon coba beberapa saat lagi!',
        customClass: 'drop-shadow-br !rounded-lgm'
      })
    }
  }
</script>
<template>
  <section>
    <p class="max-w-max mx-auto font-semibold text-lg mb-4">Comment</p>
    <form ref="formComment" class="flex flex-col items-end">
      <input type="text" name="post_id" id="post_id" :value="postId" hidden>
      <textarea 
        name="content" 
        id="content"
        class="outline-none w-full rounded-lg px-4 py-2 mb-4 bg-accent-6 drop-shadow-br"
        v-model="content"
      ></textarea>
      <button
        type="button"
        class="text-center max-w-max bg-accent-10 rounded-lg py-1.5 font-bold drop-shadow-br text-accent-10"
        v-on:click="onFormSubmit"
      >
        Beri Komentar!
      </button>
    </form>
  </section>
</template>
