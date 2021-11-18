export { setRandomMines, setEmptyArray, computeNearBy };

// 输入矩阵阶数n，mines个地雷和初始坐标x0,y0
function setRandomMines(n, mines, x0, y0) {
  // 创建初始值为空的n*n矩阵数组
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n).fill(0);
  }
  while (mines > 0) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    // 当前位置没有被设置过且不是第一次点击的坐标是创建地雷
    if (arr[x][y] != 1 && x != x0 && y != y0) {
      arr[x][y] = 1;
      mines--;
    }
  }
  return arr;
}

// 初始化数组
function setEmptyArray(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n).fill(0);
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      arr[i][j] = {
        tempFlag: 0, // 下面遍历时用到的标记变量
        minesNearbBy: 0, // 记录该方块周围八个格子的地雷数
        isMine: 0, // 记录该方块是否是地雷
        marked: 0, // 记录该方块是否被标记
        clickAble: 1, //记录方块是否可以点击
      };
    }
  }
  return arr;
}

// 计算周围地雷数
function computeNearBy(arr, x, y, n) {
  // 周围最多存在八个格子
  let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    let tx = x + directions[i][0];
    let ty = y + directions[i][1];
    if (tx < 0 || tx >= n || ty < 0 || ty >= n) continue;
    if (arr[tx][ty].isMine == 1) sum++;
  }
  return sum;
}
