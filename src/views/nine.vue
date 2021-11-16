<template>
  <div id="topbar">
    <router-link to="/" class="btn">Back</router-link>
    <div class="btn" @click="reset">Reset</div>
  </div>
  <div id="info">
    <div>
      Click times:<span>{{ clickTimes }}</span>
    </div>
    <div>
      Marked:<span>{{ marked }}</span>
    </div>
    <div>
      Mines Left:<span>{{ minesLeft }}</span>
    </div>
  </div>
  <div id="window">
    <div class="columns" v-for="columnIndex of 9" :key="columnIndex">
      <div
        class="rowBlocks"
        v-for="rowIndex of 9"
        :key="rowIndex"
        @click="clickEvent($event)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clickTimes: 0,
      marked: 0,
      minesLeft: 10,
    };
  },
  methods: {
    clickEvent(e) {
      // 获取传入
      e.target.style.background = "red";
    },
    setMines() {},
    reset() {
      alert("on Coding!");
    },
  },
};
</script>
<style lang="scss" scoped>
// 顶栏
#topbar {
  display: flex;
  justify-content: space-between;
}
// 显示游戏信息
#info {
  display: flex;
  justify-content: space-evenly;
  background: var(--block-color);
  margin: 20px auto;
  div {
    color: var(--block-font-color);
    span {
      padding: 5px;
      font-size: 150%;
    }
  }
}
// 展示游戏界面
#window {
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  width: calc(20 * 9px);
  margin: 10px auto;
  .columns {
    margin: 0 auto;
    display: flex;
    align-items: center;
    .rowBlocks {
      width: 19px;
      height: 18px;
      background: var(--block-color);
      border: 1px solid var(--base-color);
    }
    .rowBlocks:hover {
      background: var(--base-color);
      cursor: pointer;
    }
  }
}
</style>
