<script lang="ts" setup>
  import CommentInterface from '~/interfaces/post/comment.interface'

  const props = defineProps(['item'])
  const item: CommentInterface = props.item
</script>
<template>
  <section class="mb-5 rounded-lg px-4 py-2 bg-secondary drop-shadow-br">
    <p class="text-xs mb-1">Dari <NuxtLink :to="`/user/${item?.user?.username}`" class="text-base font-bold">{{ item?.user?.name }}</NuxtLink></p>
    <p>{{ item?.content }}</p>
  </section>
</template>
