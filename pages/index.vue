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

    <PostForm />

    <section class="container">
      <p class="text-center text-xl my-5 font-bold">Cerita dari Orang-orang</p>
      <div>
        <PostCard 
          v-for="(post, idx) in posts"
          :key="idx"
          :post="post"
        />
      </div>
    </section>
  </section>
</template>
