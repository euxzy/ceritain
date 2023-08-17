<script lang="ts" setup>
  import Croppie from 'croppie'

  const nameLabel: Ref<any> = ref(null)
  const bioLabel: Ref<any> = ref(null)

  const name: Ref<string> = ref('')
  const bio: Ref<string> = ref('')

  watch([name, bio], () => {
    const classLists: Array<string> = ['!-translate-y-6', '!border-black']
    const elLists: Array<{ el: Ref<string>, label: Ref<any> }> = [
      { el: name, label: nameLabel },
      { el: bio, label: bioLabel },
    ]

    elLists.map(({ el, label }) => {
      if (el.value != '') classLists.forEach((item) => label.value?.classList.add(item))
      else classLists.forEach((item) => label.value?.classList.remove(item))
    })
  })

  const emit = defineEmits(['isUpdate'])

  const dragover = (evt: any) => {
    evt.preventDefault()
  }

  // const aaa = document.createElement('div')
  const profileImg: Ref<HTMLElement> = ref(document.createElement('input'))
  const drop = (evt: any) => {
    evt.preventDefault()
    // console.log(evt['dataTransfer']['files'])
    // console.log(profileImg.value)
    // const test = new Croppie(profileImg.value, {
    //   // enableExif
    // })
    // console.log(test)
  }
</script>
<template>
  <section class="fixed inset-0 m-auto w-full h-screen flex justify-center items-center z-50">
    <div class="absolute w-full h-full inset-0 m-0 bg-accent-10/50" @click="emit('isUpdate')"></div>
    <div class="container relative">
      <div class="absolute w-full h-full inset-0 m-0" @click="emit('isUpdate')"></div>
      <div class="relative bg-accent-6 w-11/12 md:w-2/3 mx-auto p-6 rounded-lgm border border-black drop-shadow-br">
        <p class="max-w-max mx-auto text-xl font-bold mb-4">Edit Profile</p>
        <form>
          <div>
            <div class="relative mb-6">
              <input
                type="text"
                name="name"
                id="name"
                v-model="name"
                class="peer relative w-full bg-secondary border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br"
              >
              <label 
                ref="nameLabel"
                for="name"
                class="card-border mt-3 bg-secondary peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm ml-4 inset-x-0 w-max">Masukan namamu</label>
            </div>
            <div class="relative mb-6">
              <input
                type="text"
                name="bio"
                id="bio"
                v-model="bio"
                class="peer relative w-full bg-secondary border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br"
              >
              <label 
                ref="bioLabel"
                for="bio"
                class="card-border mt-3 bg-secondary peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm ml-4 inset-x-0 w-max">Deskripsikan dirimu</label>
            </div>
            <div
              @dragover="dragover"
              @drop="drop"
            >
              <input ref="profileImg" type="file" name="photo" id="photo" class="hidden" accept="image/*">
              <label
                for="photo"
                class="block w-full p-4 bg-secondary border border-black drop-shadow-br rounded-lgm"
              >
                <div class="w-full">
                  <div class="mx-auto max-w-max">
                    <Icon name="ic:round-upload" class="text-6xl md:text-9xl text-accent-3/60" />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
