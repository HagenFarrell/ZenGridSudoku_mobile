
// Make sure it's divisible by 3 twice
const size: number = 378

export const values = {
    gridSize: size,    // 27 * 13
    clusterSize: size / 3,
    cellSize: size / 9,
    outerWidth: 10,
    innerWidth: 2,
    fontSize: 20
} as const;
