<template>
  <div id="motd">choose A model to play</div>
  <div id="model">
    <router-link class="btn" to="9*9">9×9</router-link>
    <router-link class="btn" to="10*10">10×10</router-link>
    <router-link class="btn" to="15*15">15×15</router-link>
  </div>
</template>
<style lang="scss" scoped>
#motd {
  text-align: center;
  padding: 10px 0;
  color: var(--block-color);
}
#model {
  width: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
