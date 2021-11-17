export { setRandomArray, setEmptyArray, searchNearBy };
// 输入矩阵阶数n，mines个地雷和初始坐标x0,y0
function setRandomArray(n, mines, x0, y0) {
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
function setEmptyArray(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n).fill(0);
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      arr[i][j] = {
        clicked: 0,
        isMine: 0,
        marked: 0,
        styles: { color: "white" },
        gg: 0,
      };
    }
  }
  return arr;
}

function searchNearBy(arr, x, y) {
  // 深度优先搜索遍历
  let result = arr[x - 1][y].isMine + arr[x - 1][y].isMine;
  return result;
}
