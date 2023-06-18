<script lang="ts" setup>
  import Swal from 'sweetalert2'

  const route = useRoute()
  const { verify } = authStore()
  const { status } = storeToRefs(authStore())
  const codeParams: string = route.params?.code.toString()

  await verify(codeParams)
  
  if (status.value) {
    Swal.fire({
      icon: 'success',
      title: 'Verifikasi emailmu berhasil! segera login untuk mulai bercerita.',
      customClass: 'drop-shadow-br !rounded-lgm'
    }).then((info) => {
      if (info.isConfirmed || info.dismiss) navigateTo('/login')
    })
  }

  if (!status.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oopss! verifikasi emailmu gagal!',
      customClass: 'drop-shadow-br !rounded-lgm'
    }).then((info) => {
      if (info.isConfirmed || info.dismiss) navigateTo('/')
    })
  }
</script>

<template>
  <section class="container h-screen flex justify-center items-center">
    <div class="mb-8">
      <div class="w-96 mx-auto mb-2">
        <img class="w-full" src="~/assets/images/cats.png" alt="Ceritain">
      </div>
      <div class="mx-auto max-w-max text-center text-lg font-medium">
        <p>Mohon tunggu hingga verifikasi berhasil!</p>
      </div>
    </div>
  </section>
</template>
