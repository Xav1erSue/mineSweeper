<template>
  <div id="topbar">
    <router-link to="/" class="btn">Back</router-link>
    <div class="motd" v-show="seenMotd">click to start</div>
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
      Blocks Left:<span>{{ blocksLeft }}</span>
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
        <span v-show="this.blocks[Xindex][Yindex].shown">{{
          this.blocks[Xindex][Yindex].minesNearBy
        }}</span>
        <span v-show="this.blocks[Xindex][Yindex].isMine && this.gg">💣</span>
        <span v-show="this.blocks[Xindex][Yindex].marked && !this.gg">🚩</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  setRandomMines,
  setEmptyArray,
  computeNearBy,
  judgeColor,
} from "../utils/setArray";
export default {
  data() {
    return {
      n: 20,
      blocksLeft: 400,
      start: 0, // 标记游戏是否正在进行
      seenMotd: true, // 标记motd是否显示
      clickTimes: 0, // 记录点击次数
      marks: 0, // 记录标记个数
      blocks: [], // 每个方格独立信息
      gg: 0, // 标记游戏是否结束
      // 样式
      styles: [
        {
          // 点开空白:styles[0]
          background: "#eee",
          "box-shadow":
            "rgb(204, 21n, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          "--cursor-situation": "default",
        },
        {
          // 标记:styles[1]
          background: "#2E8B57",
        },
        {
          // 点到炸弹:styles[2]
          background: "#DC143C",
        },
      ],
    };
  },
  methods: {
    open(x, y) {
      // 1. 第一次点开：生成地雷
      if (this.start == 0 && this.gg == 0) {
        this.setMines(x, y);
        this.seenMotd = false;
        this.start = 1;
        // 当前格子一定没有被点击过
        this.chainOpen(x, y);
        return;
      }
      // 只有游戏处于开始状态才能进行点击操作
      if (this.start == 1) {
        // 2. 点到没有被标记的地雷：GG
        if (this.blocks[x][y].isMine == 1 && this.blocks[x][y].clickAble == 1) {
          this.blocks[x][y].styles = this.styles[2];
          this.gg = 1;
          this.start = 0;
          alert("GAME OVER");
        }
        // 点到空白
        if (this.blocks[x][y].isMine != 1 && this.blocks[x][y].clickAble == 1) {
          this.chainOpen(x, y);
          this.clickTimes++;
        }
        if (this.blocksLeft == 60) {
          this.gg = 1;
          this.start = 0;
          alert("you win!");
        }
      }
    },
    // 专注于打开单个格子，其他的你别管
    openBlankBlock(x, y) {
      if (this.blocks[x][y].clickAble != 0) {
        this.blocks[x][y].clickAble = 0;
        this.blocks[x][y].styles = this.styles[0];
        this.blocksLeft--;
      }
    },
    showEdge(x, y) {
      if (this.blocks[x][y].clickAble != 0) {
        this.blocks[x][y].clickAble = 0;
        this.blocks[x][y].styles = this.styles[0];
        this.blocks[x][y].shown = 1;
        this.blocks[x][y].styles.color = judgeColor(
          this.blocks[x][y].minesNearBy
        );
        this.blocksLeft--;
      }
    },
    mark(x, y) {
      event.preventDefault();
      // 只有游戏开始了才能标记地雷
      if (this.start == 1) {
        if (
          this.blocks[x][y].marked == 0 &&
          this.marks < 60 &&
          this.blocks[x][y].clickAble == 1
        ) {
          // 没有被标记，标记数量少于60：标记该方块
          this.blocks[x][y].marked = 1;
          this.blocks[x][y].clickAble = 0;
          this.blocks[x][y].styles = this.styles[1];
          this.marks++;
          this.clickTimes++;
        } else if (this.blocks[x][y].marked == 1) {
          // 被标记：取消标记
          this.blocks[x][y].marked = 0;
          this.blocks[x][y].clickAble = 1;
          this.blocks[x][y].styles = {};
          this.marks--;
          this.clickTimes++;
        }
      }
    },
    setMines(x, y) {
      // nxn的方格定义60个雷
      let minesArr = setRandomMines(this.n, 60, x, y);
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.n; j++) {
          this.blocks[i][j].isMine = minesArr[i][j];
          if (minesArr[i][j] == 1) {
            this.blocks[i][j].styles = { color: "red" };
          }
        }
      }
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.n; j++) {
          if (this.blocks[i][j].isMine != 1) {
            this.blocks[i][j].minesNearBy = computeNearBy(
              this.blocks,
              i,
              j,
              this.n
            );
          } else {
            this.blocks[i][j].minesNearBy = -1;
          }
        }
      }
    },
    // 对每一次点击都做连锁判定
    chainOpen(x, y) {
      // 点击的单个元素不为0，则执行以下代码
      if (this.blocks[x][y].minesNearBy > 0) {
        this.openBlankBlock(x, y);
        this.blocks[x][y].shown = 1;
        this.blocks[x][y].styles.color = judgeColor(
          this.blocks[x][y].minesNearBy
        );
      }
      // 点击的单个元素为0，则执行以下代码
      else {
        // 调用深度优先搜索
        this.dfs(x, y);
        for (let i = 0; i < this.n; i++) {
          for (let j = 0; j < this.n; j++) {
            this.blocks[i][j].tempFlag = 0;
          }
        }
      }
    },
    // 深度优先搜索
    dfs(x, y) {
      this.openBlankBlock(x, y);
      let directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (let i = 0; i < 4; i++) {
        let tx = x + directions[i][0];
        let ty = y + directions[i][1];
        // 越界了直接跳过该轮
        if (tx < 0 || tx >= this.n || ty < 0 || ty >= this.n) continue;
        // 如果这个格子也为0
        if (
          this.blocks[tx][ty].minesNearBy == 0 &&
          this.blocks[tx][ty].tempFlag == 0
        ) {
          // 把这个格子标记为0
          this.blocks[tx][ty].tempFlag = 1;
          this.dfs(tx, ty);
        }
      }
      directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      for (let i = 0; i < 8; i++) {
        let tx = x + directions[i][0];
        let ty = y + directions[i][1];
        // 越界了直接跳过该轮
        if (tx < 0 || tx >= this.n || ty < 0 || ty >= this.n) continue;
        // 如果当前格子不为0，则把它标记出来
        if (this.blocks[tx][ty].minesNearBy != 0) {
          this.showEdge(tx, ty);
        }
      }
      return;
    },
    reset() {
      // 初始化
      this.blocksLeft = 400;
      this.start = 0;
      this.gg = 0;
      this.seenMotd = true;
      this.clickTimes = 0;
      this.marks = 0;
      this.marked = 0;
      this.blocks = setEmptyArray(this.n);
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
  --cursor-situation: pointer;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  width: calc(25 * 20px);
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
      cursor: var(--cursor-situation);
    }
  }
}
</style>
