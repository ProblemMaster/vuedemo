<script setup>
import UserCard from '@/components/UserCard.vue'
import userData from '@/assets/data/users.json'
import kjell from '@/assets/images/kjell.png'
import UsersList from '@/components/UsersList.vue'
import { ref } from 'vue'

document.title = 'Users'

const users = ref(userData)
</script>

<template>
  <div class="users">
    <h1>Användarsida</h1>
  </div>

  <UserCard :user="{ id: 1, namn: 'Kjell', image: kjell }" />
  <UsersList :user-list="users" />
</template>

<style scoped></style>
