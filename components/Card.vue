<script lang="ts" setup>
  const props = defineProps(['post'])
  const post = props.post
</script>

<template>
  <div class="w-[32%]">
    <div class="bg-primary border-2 border-secondary rounded-lg px-6 pt-7 text-slate-700">
      <p class="mb-7">{{ post?.body }}</p>

      <div class="w-full h-[1px] bg-slate-700"></div>

      <p class="w-full text-end font-semibold pt-3 pb-4">{{ post?.user?.name }}</p>
    </div>
  </div>
</template>
