<script setup>
import { watchEffect } from 'vue'
import UserCard from './UserCard.vue'
import router from '@/router'

const props = defineProps(['userList'])
watchEffect(() => {
  props.userList.users.map((item) => {
    item.image = new URL(`../assets/images/${item.bild}`, import.meta.url).href
  })
})
</script>

<template>
  <UserCard
    v-for="item in props.userList.users"
    :key="item"
    :user="item"
    @click="router.push('/user/' + item.id)"
  />
</template>
