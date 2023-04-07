<script lang="ts" setup>
  const { baseApi } = useAppConfig()

  const usernameLabel: Ref = ref()
  const passwordLabel: Ref = ref()

  const username: Ref<string> = ref('')
  const password: Ref<string> = ref('')

  watch([username, password], () => {
    const classLists: Array<string> = ['!-translate-y-6', '!border-black']
    const elLists: Array<{ el: Ref, label: Ref }> = [
      { el: username, label: usernameLabel },
      { el: password, label: passwordLabel },
    ]

    elLists.map(({ el,label }) => {
      if (el.value != '') classLists.forEach((item) => label?.value?.classList.add(item))
      else classLists.forEach((item) => label?.value?.classList.remove(item))
    })
  })

  const formLogin: Ref = ref()
  const onLogin = async () => {
    const formData: FormData = new FormData(formLogin.value)

    const user = await useFetch('api/auth/login', {
      baseURL: baseApi,
      method: 'POST',
      body: formData
    })

    const res: any = user.data.value
    const token = res?.data?.token

    if (token) localStorage.setItem('token', token)
  }
</script>

<template>
  <section class="container">
    <form ref="formLogin" class="mt-5">
      <div class="w-96 flex flex-col gap-6 mx-auto">
        <div class="relative">
          <input 
            type="text" 
            name="username" 
            id="username"
            v-model="username"
            class="peer relative w-full bg-secondary border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br"
          />
          <label 
            ref="usernameLabel"
            for="username"
            class="card-border inset-x-0 mt-3 mx-auto w-max bg-secondary peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm">Isi nicknamemu</label>
        </div>
        <div class="relative">
          <input 
            type="password" 
            name="password" 
            id="password"
            v-model="password"
            class="peer relative w-full bg-secondary border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-transparent drop-shadow-br"
          />
          <label 
            ref="passwordLabel"
            for="password"
            class="card-border inset-x-0 mt-3 mx-auto w-max bg-secondary peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm">Isi passwordmu</label>
        </div>
        <div class="relative">
          <button
            type="button"
            class="relative w-full border px-6 py-[10px] bg-accent-9 font-semibold border-black rounded-lgm hover:bg-secondary transition-all duration-300 drop-shadow-br"
            v-on:click="onLogin"
          >login!</button>
        </div>
      </div>
    </form>
  </section>
</template>