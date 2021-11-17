<template>
  <div id="topbar">
    <router-link to="/" class="btn">Back</router-link>
    <div class="motd" v-show="seen">click to start</div>
    <div class="btn" @click="reset">Reset</div>
  </div>
  <div id="info">
    <div>
      Click times:<span>{{ clickTimes }}</span>
    </div>
    <div>
      Marked:<span>{{ marks }}</span>
    </div>
    <div>
      Mines Left:<span>{{ minesLeft }}</span>
    </div>
  </div>
  <!-- 扫雷窗口 -->
  <div id="window">
    <div class="columns" v-for="(itemY, Yindex) in blocks" :key="Yindex">
      <div
        class="rowBlocks"
        v-for="(itemX, Xindex) in itemY"
        :key="Xindex"
        :style="this.blocks[Xindex][Yindex].styles"
        @click.right="mark(Xindex, Yindex)"
        @click.left="open(Xindex, Yindex)"
      >
        <span v-show="0">{{ this.blocks[Xindex][Yindex].isMine }}</span>
        <span v-show="this.blocks[Xindex][Yindex].gg">💣</span>
        <span v-show="this.blocks[Xindex][Yindex].marked">🚩</span>
      </div>
    </div>
  </div>
</template>
<script>
import { setRandomArray, setEmptyArray, searchNearBy } from "../utils/setArray";
export default {
  data() {
    return {
      start: 0,
      seen: true,
      clickTimes: 0,
      marks: 0,
      minesLeft: 10 - this.marks,
      blocks: [],
    };
  },
  methods: {
    open(x, y) {
      // 第一次点开时创建地雷
      if (this.clickTimes == 0) {
        this.setMines(x, y);
        this.seen = false;
        this.start = 1;
      }
      this.clickTimes++;
      // 点到地雷就GG
      if (this.blocks[x][y].isMine == 1) {
        this.GG();
        return;
      }
      // 被点开了
      console.log("running");
      searchNearBy(this.blocks, x, y);
    },
    mark(x, y) {
      event.preventDefault();
      // 只有游戏开始了才能标记地雷
      if (this.start == 1) {
        this.clickTimes++;
        if (this.blocks[x][y].marked == 0 && this.marks < 10) {
          this.blocks[x][y].marked = 1;
          this.blocks[x][y].styles = { background: "#d1ebeb" };
          this.marks++;
        } else if (this.blocks[x][y].marked == 1) {
          this.blocks[x][y].marked = 0;
          this.blocks[x][y].styles = {};
          this.marks--;
        } else {
          console.log("err");
        }
      }
    },
    setMines(x, y) {
      // 9x9的方格定义10个雷
      let minesArr = setRandomArray(9, 10, x, y);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.blocks[i][j].isMine = minesArr[i][j];
          if (minesArr[i][j] == 1) {
            this.blocks[i][j].styles = { color: "red" };
          }
        }
      }
    },
    GG() {
      alert("GAME OVER");
      this.reset();
    },
    reset() {
      // 初始化
      this.seen = true;
      this.clickTimes = 0;
      this.minesLeft = 10;
      this.marked = 0;
      this.blocks = setEmptyArray(9);
    },
  },
  created() {
    this.reset();
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
  text-align: center;
  display: flex;
  justify-content: space-between;
  background: var(--block-color);
  margin: 20px auto;
  padding: 0 20px;
  div {
    color: var(--block-font-color);
    width: 150px;
    span {
      padding-left: 5px;
      font-size: 150%;
    }
  }
}
// 展示游戏界面
#window {
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  width: calc(25 * 9px);
  margin: 10px auto;
  .columns {
    display: flex;
    align-items: center;
    .rowBlocks {
      width: 24px;
      height: 23px;
      background: var(--block-color);
      border: 1px solid var(--base-color);
      text-align: center;
    }
    .rowBlocks:hover {
      background: var(--base-color);
      cursor: pointer;
    }
  }
}
</style>
