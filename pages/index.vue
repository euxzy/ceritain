<script lang="ts" setup>
  const { baseApi } = useAppConfig()

  const { data: response } = await useFetch('api/post', {
    method: 'GET',
    baseURL: baseApi
  })

  const res: any = response.value
  const posts: Array<object> = res?.data || []
</script>

<template>
  <section>
    <Hero />
  </section>
</template>
