<template>
  <div id="container">
    <header>MineSweeper</header>
    <hr />
    <router-view></router-view>
  </div>
  <footer>© 2021 Xav1erSue，All rights reserved.</footer>
</template>

<style lang="scss">
// 全局配色
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
  margin: 0 auto;
  min-width: 460px;
  max-width: 600px;
}
#app {
  background: var(--base-color);
  margin: 0 auto;
}
header {
  text-align: center;
  color: var(--block-color);
  font-size: 200%;
}
#container {
  padding: 20px;
}
hr {
  border: 1px solid var(--block-color);
  margin-bottom: 20px;
}
footer {
  text-align: center;
  background: var(--block-color);
  padding: 5px 0;
  margin-top: 20px;
  margin-bottom: 0;
  color: var(--base-color);
}
// 已下为项目顶层样式
.motd {
  margin: 0 auto;
  text-align: center;
  padding: 5px 0;
  color: var(--block-color);
}
.btn {
  text-decoration: none;
  text-align: center;
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
