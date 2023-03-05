import { produce } from 'immer';
import { IGrid } from '../models/models';

// Генерация случайных позиций мин
export const generateRandomMines = (data: IGrid[][] = [], height: number = 0, width: number = 0, mines: Number = 0, i: number, j: number) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isMine && (randomX!==i && randomY!==j)) {
      data[randomX][randomY].isMine = true;
      minesPlanted += 1;
    }
  }
  return data;
};

// Получение соседей клетки
export const getNeighbors = (i = 0, j = 0, data:IGrid[][] = [], height = 0, width = 0) => {
  const neighbors:any[] = [];
  const surroundings = [
    [-1, -1], 
    [-1, 0], 
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push(data[newX][newY]);
    }
  });

  return neighbors;
};

// Генерация соседей
export const generateNeighbors = (data: IGrid[][] = [], height = 0, width = 0, i: number, j: number) => {
  const dataCopy: IGrid[][] = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let mines = 0;
      const area = getNeighbors(data[i][j].x, data[i][j].y, data, height, width);
      area.map(value => {
        if (value.isMine) {
          return (mines += 1);
        }
        return 0;
      });
      if (!mines) {
        dataCopy[i][j].isEmpty = true;
      }
      dataCopy[i][j].neighbours = mines;
    }
  }
  if(dataCopy[i][j].neighbours === 0) {
    showEmptyCells(16,16,i,j,dataCopy)
  }
  return dataCopy;
};

export const newInitBoard = (i: number, j: number) => {
  const width = 16, height = 16, mines = 40;
  const array2D: IGrid[][] = Array(width)
    .fill(0)
    .map((_, indexH) =>
      Array(height)
        .fill(null)
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isMine: false,
          neighbours: 0,
          isEmpty: false,
          isOpen: false,
          isBoom: false,
          flagIndex: 0 // 0 - пустая ячейка, 1 - флажок, 2 - вопросительный знак
        }))
    );
  array2D[i][j].isOpen = true
  const arrayWithMines = generateRandomMines(array2D, height, width, mines, i, j);
  return generateNeighbors(arrayWithMines, height, width, i, j);
};

// Инициализация поля
export const initBoard = (width: number, height:number, mines:number) => {
  const array2D: IGrid[][] = Array(width)
    .fill(0)
    .map((_, indexH) =>
      Array(height)
        .fill(null)
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isMine: false,
          neighbours: 0,
          isEmpty: false,
          isOpen: false,
          isBoom: false,
          flagIndex: 0 // 0 - пустая ячейка, 1 - флажок, 2 - вопросительный знак
        }))
    );
  return array2D;
};

// Показ пустых ячеек
export const showEmptyCells = (height: number, width: number, x: number, y: number, data:IGrid[][]) => {
  const neighbors = getNeighbors(x, y, data, height, width);

  neighbors.map(cell => {
    if (!cell.isOpen && (cell.isEmpty || !cell.isMine) && cell.flagIndex === 0) {
      Object.assign(data[cell.x][cell.y], { isOpen: true });
      if (cell.isEmpty) {
        showEmptyCells(height, width, cell.x, cell.y, data);
      }
    }
    return null;
  });

  return data;
};

// Раскрытие игрового поля при поражении
export const showGridLose = (data: IGrid[][], i: number, j: number) => {
  return produce(data, draft =>
    draft.map((row, _i) =>
      row.map((cell,_j) => {
        if(_i===i && _j===j) {
          return { ...cell, isOpen: true, isBoom: true }
        }
        return { ...cell, isOpen: true };
      })
    )
  );
};

export const showGrid = (data:IGrid[][]) => {
  return produce(data, draft =>
    draft.map((row, i) =>
      row.map((cell, j) => {
        return { ...cell, isOpen: true, flagIndex: data[i][j].flagIndex };
      })
    )
  );
};

// Раскрытие игрового поля при победе
export const showGridWin = (data:IGrid[][]) => {
  return produce(data, draft =>
    draft.map(row =>
      row.map(cell => {
        if (cell.isMine) {
          return { ...cell, isOpen: false, flagIndex: 1 };
        }
        return { ...cell, isOpen: true };
      })
    )
  );
};
