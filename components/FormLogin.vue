<script lang="ts" setup>
  import Swal, { SweetAlertOptions } from 'sweetalert2'
  import StoreInterface from '~~/interfaces/store.interface'

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

  const isSubmited: Ref<boolean> = ref(false)
  const formLogin: Ref = ref()
  const onLogin = async () => {
    isSubmited.value = true
    const formData: FormData = new FormData(formLogin.value)

    const payload: StoreInterface = {
      path: 'api/auth/login',
      formData
    }

    const resLogin = await useStoreData(payload).resLogin()
    const res: any = resLogin.data.value
    const token: string = res?.data?.token || ''
    const err: any = resLogin.error.value?.data || null

    if (err) {
      const data: SweetAlertOptions = {
        icon: 'error',
        title: 'Oopss! jangan lupa isi username sama password!',
        confirmButtonText: 'OK'
      }
      if (err?.statusCode == 404) {
        data.title = 'Oopss! usernamemu belum terdaftar!'
        data.icon = 'warning'
        data.confirmButtonText = 'Daftar sekarang!'
      } else if (err?.statusCode == 401 && err?.message.includes('wrong!')) {
        data.title = 'Oopss! username atau passwordmu salah!'
      } else if (err?.statusCode == 401 && err?.message.includes('verify')) {
        data.title = 'Oopss! mohon verifikasi email terlebih dahulu!'
        data.icon = 'warning'
      }

      Swal.fire({
        position: 'center',
        icon: data.icon,
        title: data.title,
        confirmButtonText: data.confirmButtonText,
        customClass: 'drop-shadow-br !rounded-lgm'
      }).then((info) => {
        if (info.isConfirmed) {
          if (err?.statusCode == 404) navigateTo('/register')
        }
      })
    }

    if (token) {
      localStorage.setItem('token', token)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login berhasil!',
        customClass: 'drop-shadow-br !rounded-lgm',
        showConfirmButton: false
      })
      navigateTo('/')
    }

    if (!err && !token) {
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error! Mohon coba beberapa saat lagi!',
        customClass: 'drop-shadow-br !rounded-lgm'
      })
    }

    isSubmited.value = false
  }
</script>

<template>
  <section class="container">
    <form ref="formLogin" class="mt-5">
      <div class="w-11/12 md:w-96 flex flex-col gap-6 mx-auto">
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
            :disabled="isSubmited"
          >login!</button>
        </div>
      </div>
    </form>
  </section>
</template>
