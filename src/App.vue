<template>
  <router-view></router-view>
</template>

<style lang="scss">
@media (prefers-color-scheme: dark) {
  :root {
    --back-ground-color: #000000;
    --base-color: #0a2525;
    --block-font-color: #ffffff;
    --block-color: #476b6b;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --back-ground-color: #ffffff;
    --base-color: #d1ebeb;
    --block-font-color: #ffffff;
    --block-color: #61a1a1;
  }
}
body {
  background: var(--back-ground-color);
}
#app {
  background: var(--base-color);
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.btn {
  text-decoration: none;
  color: var(--block-font-color);
  padding: 5px 10px;
  background: var(--block-color);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.btn:hover {
  cursor: pointer;
  animation: showInfo 0.5s;
  animation-fill-mode: forwards;
  @keyframes showInfo {
    from {
    }
    to {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
  }
}
</style>
