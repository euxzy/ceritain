<script lang="ts" setup>
  import Swal from 'sweetalert2'
  import StoreInterface from '~~/interfaces/store.interface'

  const route = useRoute()
  const codeParams: string = route.params?.code.toString()

  const payload: StoreInterface = {
    path: 'api/auth/verify',
    params: {
      code: codeParams
    }
  }

  const resVerifyEmail = await useStoreData(payload).resVerifyEmail()
  const res: any = resVerifyEmail.data.value
  const err: any = resVerifyEmail.error.value?.data || null
  
  if (res?.status) {
    Swal.fire({
      icon: 'success',
      title: 'Verifikasi emailmu berhasil! segera login untuk mulai bercerita.',
      customClass: 'drop-shadow-br !rounded-lgm'
    }).then((info) => {
      if (info.isConfirmed || info.dismiss) navigateTo('/login')
    })
  }

  if (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oopss! verifikasi emailmu gagal!',
      customClass: 'drop-shadow-br !rounded-lgm'
    }).then((info) => {
      if (info.isConfirmed || info.dismiss) navigateTo('/')
    })
  }

  if (!err && !res) {
    Swal.fire({
      icon: 'error',
      title: 'Internal Server Error! Mohon coba beberapa saat lagi!',
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
