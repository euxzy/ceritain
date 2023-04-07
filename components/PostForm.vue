<script lang="ts" setup>
  import StoreInterface from '~~/interfaces/store.interface'

  const props = defineProps(['resProfile'])
  const resProfile = props.resProfile
  const dataUser: any = resProfile.data.value || null

  const storyLabel: Ref = ref()
  const usernameLabel: Ref = ref()
  const tagsLabel: Ref = ref()

  const story: Ref<string> = ref('')
  const username: Ref<string> = ref(dataUser?.data.username || '')
  const tags: Ref<string> = ref('')

  watch([story, username, tags], () => {
    const classLists: Array<string> = ['!-translate-y-6', '!border-black']

    if (story.value != '') classLists.forEach((item) => storyLabel?.value?.classList.add(item))
    else classLists.forEach((item) => storyLabel?.value?.classList.remove(item))

    if (username.value != '') classLists.forEach((item) => usernameLabel?.value?.classList.add(item))
    else classLists.forEach((item) => usernameLabel?.value?.classList.remove(item))

    if (tags.value != '') classLists.forEach((item) => tagsLabel?.value?.classList.add(item))
    else classLists.forEach((item) => tagsLabel?.value?.classList.remove(item))
  })

  const formPost: Ref = ref()
  const onFormSubmit = async () => {    
    const formData = new FormData(formPost.value)

    const payload: StoreInterface = {
      path: 'api/post/add',
      formData
    }

    const resStrorePost = await useStoreData(payload).resStorePost()

    setTimeout(() => {
      location.reload()
    }, 100)
  }
</script>

<template>
  <section class="container">
    <p class="mt-8 mx-auto max-w-max text-xl font-semibold">Submit Ceritamu!</p>
    <form ref="formPost" class="w-11/12 mx-auto mt-5 mb-10 flex flex-col justify-between gap-5 md:flex-row">
      <div class="relative flex-1">
        <textarea 
          name="body"
          id="body"
          placeholder="Tulis ceritamu"
          v-model="story"
          class="peer relative w-full border px-6 py-4 bg-accent-6 border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br h-full"></textarea>
        <label 
          ref="storyLabel"
          for="body" 
          class="card-border mx-3 mt-3 bg-accent-6 peer-hover:-translate-y-6 peer-focus:-translate-y-6">Tulis ceritamu</label>
      </div>
      <div class="lg:w-80 flex flex-col gap-7">
        <div class="relative">
          <input 
            type="text" 
            name="tags" 
            id="tags"
            v-model="tags"
            class="peer relative w-full bg-secondary border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br"
          />
          <label 
            ref="tagsLabel"
            for="tags"
            class="card-border mt-3 bg-secondary peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm mx-auto inset-x-0 w-max">Masukan tagar</label>
        </div>
        <div class="relative">
          <input 
            type="text" 
            name="username" 
            id="username"
            v-model="username"
            class="peer relative w-full bg-secondary border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br"
            :disabled="dataUser?.status"
          />
          <label 
            ref="usernameLabel"
            for="username"
            :class="dataUser?.data?.username ? '!-translate-y-6 !border-black' : ''"
            class="card-border inset-x-0 mt-3 mx-auto w-max bg-secondary peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm">Isi nicknamemu</label>
        </div>
        <div class="relative">
          <button
            type="button"
            class="relative w-full border px-6 py-[10px] bg-accent-2 font-semibold border-black rounded-lgm hover:bg-secondary transition-all duration-300 drop-shadow-br"
            v-on:click="onFormSubmit"
          >Bagikan Ceritamu!</button>
        </div>
      </div>
    </form>
  </section>
</template>
