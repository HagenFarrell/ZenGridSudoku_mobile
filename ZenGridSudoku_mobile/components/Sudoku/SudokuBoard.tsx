
/* 
 * 
 *
 * 
*/

import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GridCell from "./GridCell";

interface SudokuBoardProps {
  initialState: string; // String length 81, numbers [0, 9]
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ initialState }) => {
  // Mutable board
  const [board, setBoard] = useState<number[][]>([]);

  // [-1, 80]
  // -1 is no selection
  // [0, 80] is the corresponding index (id of GridCell)
  const [selected, setSelected] = useState<number>(-1);

  const toNumber = (char: string): number => parseInt(char, 10);

  // Reset the board to the initialState
  const reset = () => {
    const parsedData = initialState.split("").map(toNumber);

    const grid = [];

    for (let i = 0; i < 9; i++) {
      grid.push(parsedData.slice(i * 9, (i + 1) * 9));
    }

    setBoard(grid);
  }

  // Initializes the board for the mandatory setting
  // of the 'initialState' property
  useEffect(reset, [initialState]);

  // const toGridCell = (val: any) => {
  //   return <GridCell
  //     id={val}
  //     initValue={val}
  //     locked={false}
  //   />
  // }

  // const asRow = (row: any) => {
  //   return row.map(toGridCell)
  // }

  return (
    <View style={styles.container}>
      <Text>{board}</Text>
    </View>
  )
};

// 27 * 14
// Some board controls
export const boardValues = {
  roundness: 10,
  boardSize: Dimensions.get('screen').width * 0.97,
  outerWidth: 6
};

const styles = StyleSheet.create({
  container: {
    width: boardValues.boardSize,
    height: boardValues.boardSize,

    borderWidth: boardValues.outerWidth,
    borderRadius: boardValues.roundness,
    borderColor: 'black',

    flex: 0,
    flexWrap: "wrap",
    flexDirection: "row"
  }
})

export default SudokuBoard