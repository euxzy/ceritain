<script lang="ts" setup>
  import DetailPostInterface from '~/interfaces/post/detail.interface'

  const emit = defineEmits(['share'])
  const props = defineProps(['postContent', 'setShareContent'])
  const origin = window.location.origin || 'https://ceritain.otakuline.id'
  const postContent: DetailPostInterface = props.postContent

  interface SharingInterface {
    url?: string
    title?: string
    quote?: string
    hashtags: string
    description: string
    networks: Array<{
      name: string
      icon: string
      color: string
    }>
  }

  const sharingOptions: Ref<SharingInterface> = ref({
    url: 'https://ceritain.otakuline.id',
    title: 'Ayo mulai ceritakan kisahmu di Ceritain!',
    quote: '',
    hashtags: 'ceritain,otakuline',
    description: 'Ayo mulai ceritakan kisahmu di Ceritain!',
    networks: [
      {
        name: 'facebook',
        icon: 'ic:baseline-facebook',
        color: 'text-accent-2'
      },
      {
        name: 'twitter',
        icon: 'ri:twitter-fill',
        color: 'text-accent-1'
      },
      {
        name: 'whatsapp',
        icon: 'ic:baseline-whatsapp',
        color: 'text-accent-9'
      },
      {
        name: 'telegram',
        icon: 'ic:baseline-telegram',
        color: 'text-accent-2'
      },
    ]
  })

  if (postContent) {
    sharingOptions.value.url = `${origin}/post/${postContent.id}`
    sharingOptions.value.title = postContent.content
    sharingOptions.value.quote = postContent.content
  }
</script>
<template>
  <section class="fixed inset-0 m-auto w-full h-screen flex justify-center items-center z-50">
    <div class="absolute top-0 left-0 w-full h-full" @click="emit('share')"></div>
    <div class="relative bg-accent-7 w-max rounded-lgm p-6 pt-4 border border-black drop-shadow-br">
      <h2 class="text-center mb-4 font-bold text-xl">Bagikan Cerita Ini!</h2>
      <div class="flex gap-3 md:gap-4">
        <ShareNetwork
          v-for="network of sharingOptions.networks"
          :network="network.name"
          :url="sharingOptions.url"
          :title="sharingOptions.title"
          :description="sharingOptions.description"
          :quote="sharingOptions.quote"
          :hashtags="sharingOptions?.hashtags"
          class="inline-block text-4xl sm:text-6xl bg-white rounded-lgm py-1 px-2 md:py-2 hover:drop-shadow-br hover:-translate-x-1 hover:-translate-y-1 border border-transparent hover:border-black transition-all duration-200"
        >
          <Icon :name="network.icon" :class="network.color" />
        </ShareNetwork>
      </div>
    </div>
  </section>
</template>
