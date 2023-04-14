<script lang="ts" setup>
  const props = defineProps(['post'])
  const post = props.post
</script>

<template>
  <div class="mb-5 text-lg">
    <div class="bg-primary border border-black rounded-lgm px-6 pt-3 pb-4 drop-shadow-br">
      <p class="text-xs mb-4">Dari <span class="text-lg font-medium">{{ post?.user?.name }}</span></p>

      <p class="mb-1">{{ post?.content }}</p>

      <div class="flex gap-[10px] justify-end">
        <div class="bg-accent-5 rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <img src="~/assets/images/icons/favorite.svg" alt="">
        </div>
        <div class="bg-accent-7 rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <img src="~/assets/images/icons/topic.svg" alt="">
        </div>
        <div class="bg-white rounded-full w-max p-1 border border-black drop-shadow-rd cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <img src="~/assets/images/icons/share.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
