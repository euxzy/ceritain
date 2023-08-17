<script lang="ts" setup>
  import Swal, { SweetAlertOptions } from 'sweetalert2'

  const props = defineProps(['postId'])
  let postId: string = props?.postId
  watch(props, () => {
    postId = props?.postId
  })

  const emit = defineEmits(['refreshComments'])
  const content: Ref<string> = ref('')

  const { createComment } = postStore()
  const { status, message } = storeToRefs(postStore())

  const formComment: Ref<any> = ref()
  const onFormSubmit = async () => {
    const formData = new FormData(formComment.value)

    await createComment(formData)

    if (status.value) {
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

    if (!status.value) {
      const data: SweetAlertOptions = {
        title: 'Internal Server Error! Mohon coba beberapa saat lagi!'
      }

      if (message.value.includes('Forbidden!')) data.title = 'Mohon login dulu untuk memberikan komentar!'
      if (message.value.includes('content')) data.title = 'Kamu belum menulis komentar apapun!'
      if (message.value.includes('postId')) data.title = 'Sepertinya ada kesalahan, mohon coba beberapa saat lagi!'

      Swal.fire({
        icon: 'info',
        title: data.title,
        customClass: 'drop-shadow-br !rounded-lgm'
      }).then((info) => {
        if (info.isConfirmed) {
          if (message.value.includes('Forbidden!')) navigateTo('/login')
        }
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
        class="outline-none w-full rounded-lg px-4 pt-3 pb-2 mb-4 bg-accent-6 drop-shadow-br"
        v-model="content"
        placeholder="Tulis komentarmu disini..."
      ></textarea>
      <button
        type="button"
        class="text-center max-w-max bg-accent-10 rounded-lg py-2.5 font-bold drop-shadow-br px-4 text-xs transition-all duration-300 hover:-translate-y-1"
        v-on:click="onFormSubmit"
        aria-label="Submit Comment"
      >
        Beri Komentar!
      </button>
    </form>
  </section>
</template>
