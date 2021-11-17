<template>
  <div class="motd">choose A model to play</div>
  <div id="model">
    <router-link class="btn" to="easy">Easy</router-link>
    <router-link class="btn" to="middle">Middle</router-link>
    <router-link class="btn" to="hard">Hard</router-link>
  </div>
</template>
<style lang="scss" scoped>
#model {
  width: 200px;
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
