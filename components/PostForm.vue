<template>
  <div>
    <form action="" class="w-[1024px] mx-auto">
      <div class="relative w-full mb-4">
        <div class="absolute w-full min-h-[calc(100%_-_2.8px)] top-0 left-0 rounded-xl bg-black"></div>
        <textarea 
        name="body"
        id="body"
        placeholder="Tulis ceritamu"
        rows="1"
        class="peer relative w-full border-2 px-6 py-4 border-secondary border-b-0 rounded-lg outline-none placeholder:text-transparent"></textarea>
        <label for="body" class="card-border mt-4 peer-hover:-translate-y-7 peer-focus:-translate-y-7">Tulis ceritamu</label>
      </div>
      <div class="w-full flex justify-between gap-4">
        <div class="relative w-72">
          <div class="absolute w-full h-[calc(100%_+_4px)] top-0 left-0 rounded-xl bg-black"></div>
          <input 
            type="text" 
            name="tags" 
            id="tags"
            class="peer relative w-full border-2 px-6 py-[10px] border-secondary border-b-0 rounded-lg outline-none placeholder:text-transparent"
          />
          <label for="tags" class="card-border mt-3 peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm">Masukan tagar</label>
        </div>
        <div class="relative flex-1">
          <div class="absolute w-full h-[calc(100%_+_4px)] top-0 left-0 rounded-xl bg-black"></div>
          <input 
            type="text" 
            name="username" 
            id="username"
            class="peer relative w-full border-2 px-6 py-[10px] border-secondary border-b-0 rounded-lg outline-none placeholder:text-transparent"
          />
          <label for="username" class="card-border mt-3 peer-hover:-translate-y-6 peer-focus:-translate-y-6 text-sm">Isi nicknamemu</label>
        </div>
        <div class="relative w-72">
          <div class="absolute w-full h-[calc(100%_+_4px)] top-0 left-0 rounded-xl bg-black"></div>
          <button
            class="relative w-full border-2 px-6 py-[10px] bg-accent-1 text-white border-secondary border-b-0 rounded-lg hover:bg-white hover:text-accent-1 transition-all duration-300"
          >Bagikan Ceritamu!</button>
        </div>
      </div>
    </form>
  </div>
</template>
