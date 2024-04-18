import { Dimensions } from "react-native";

export const boardValues = {
    roundness: 10,
    boardSize: Dimensions.get('screen').width * 0.97,
    outerWidth: 6
};

export const cellValues = {
    cellSize: boardValues.boardSize / 9,
    innerWidth: boardValues.outerWidth / 3,
    fontSize: 20
};