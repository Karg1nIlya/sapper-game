export interface IGrid {
    x: number,
    y: number,
    isMine: boolean,
    neighbours: number,
    isEmpty: boolean,
    isOpen: boolean,
    isBoom: boolean,
    flagIndex: number
}