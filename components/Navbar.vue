<script lang="ts" setup>
  import Swal from 'sweetalert2'
  import StoreInterface from '~~/interfaces/store.interface'

  const { pending, data: resData, error } = await useGetData().resProfile()
  const dataUser: Ref<any> = ref(null)

  interface NavigationInterface {
    title: string
    icon: string
    to: string
  }

  const initialNavs: Array<NavigationInterface> = [
    { title: 'home', to: '/', icon: 'ic:round-home' },
    { title: 'profile', to: `/user/${dataUser.value?.username}`, icon: 'ic:round-account-circle' },
    { title: 'login', to: '/login', icon: 'ic:round-log-in' },
    { title: 'logout', to: '', icon: 'ic:round-log-out' },
    { title: 'close', to: '', icon: 'ic:round-close' },
  ]

  const navItems: Ref<Array<NavigationInterface>> = ref([])
  watchEffect(() => {
    const data: any = resData.value
    dataUser.value = data?.data || null

    if (dataUser.value?.username) {
      navItems.value = initialNavs.filter((item) => {
        if (item.title != 'login') return item
      })
    } else {
      navItems.value = initialNavs.filter((item) => {
        if (item.title != 'profile' && item.title != 'logout') return item
      })
    }
    
    navItems.value.map((item) => {
      if (item.title == 'profile') item.to = `/user/${dataUser.value?.username}`
      return item
    })
  })

  const onLogout = async () => {
    Swal.fire({
      icon: 'question',
      title: 'Yakin ingin logout?',
      showCancelButton: true,
      cancelButtonAriaLabel: 'Tidak',
      customClass: 'drop-shadow-br !rounded-lgm'
    }).then(async (res) => {
      if (res.isConfirmed) {
        const payload: StoreInterface = { path: 'api/auth/logout' }
        await useStoreData(payload).resLogout()

        localStorage.removeItem('token')
        reloadNuxtApp({
          path: '/',
          force: true,
          ttl: 500
        })
      }
    })
  }

  const isShowMenu: Ref<boolean> = ref(false)
  const onMenuClick = async (param: string) => {
    if (param == 'open' || param == 'close') return isShowMenu.value = !isShowMenu.value
    if (param == 'logout') await onLogout()
    return
  }
</script>
<template>
  <nav class="fixed bottom-8 right-4 sm:right-12 z-50">
    <Transition
      enter-active-class="duration-300 delay-100"
      enter-from-class="transform opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-6"
    >
      <button
        v-if="!isShowMenu"
        type="button"
        class="text-3xl sm:text-4xl bg-accent-3 py-1.5 sm:py-2 px-2.5 rounded-lgm border border-black drop-shadow-br absolute bottom-0 right-0"
        @click="onMenuClick('open')"
      >
        <Icon name="ic:round-menu" />
      </button>
    </Transition>

    <Transition
      enter-active-class="duration-300 delay-100"
      enter-from-class="transform opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-6"
    >
      <div class="flex gap-3" v-if="isShowMenu">
        <NuxtLink
          v-for="navItem of navItems"
          :key="navItem.title"
          :to="navItem.to"
          class="text-3xl sm:text-4xl bg-accent-3 py-1.5 sm:py-2 px-2.5 rounded-lgm border border-black drop-shadow-br cursor-pointer"
          @click="onMenuClick(navItem.title)"
        >
          <Icon :name="navItem.icon" />
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>
