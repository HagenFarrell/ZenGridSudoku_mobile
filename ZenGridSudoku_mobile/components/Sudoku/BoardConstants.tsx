import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('screen').width
const percent = 0.90

export const board = {
    // Boarder roundness
    roundness: 10,

    // Box dimensions
    boardSize: screenWidth * percent,
    clusterSize: screenWidth * percent / 3.01,
    cellSize: screenWidth * percent / 9.05,

    // Boarder thickness
    outerWidth: 4,
    clusterWidth: 2,
    cellWidth: 1,

    fontSize: 24
};