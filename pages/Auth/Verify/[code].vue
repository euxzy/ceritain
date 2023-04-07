<script lang="ts" setup>
import StoreInterface from '~~/interfaces/store.interface';

  const route = useRoute()
  const codeParams: string = route.params?.code.toString()

  onMounted(async () => {
    const payload: StoreInterface = {
      path: 'api/auth/verify',
      params: {
        code: codeParams
      }
    }

    const resVerifyEmail = await useStoreData(payload).resVerifyEmail()
    navigateTo('/login')
  })
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
