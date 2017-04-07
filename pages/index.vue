<template>
  <section class="container">

    <nuxt-link class="button" :to="{ name: 'users'}">
      Users
    </nuxt-link>
    <nuxt-link class="button" :to="{ name: 'users-id', params: {id: 1}}">
      Usuário individual
    </nuxt-link>
  </section>
</template>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
