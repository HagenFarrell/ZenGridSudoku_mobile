
/* 
 * 
 *
 * 
*/

import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GridCell from "./GridCell";
import { boardValues } from "./BoardConstants";

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

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((val, cellIndex) => (
            <View key={rowIndex * 9 + cellIndex} style={styles.region}>
              <GridCell
                key={rowIndex * 9 + cellIndex} // Existing key
                id={rowIndex * 9 + cellIndex}
                initValue={val}
                locked={val !== 0}
              // ... other props
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: boardValues.boardSize,
    height: boardValues.boardSize,

    borderWidth: boardValues.outerWidth,
    borderRadius: boardValues.roundness,
    borderColor: 'black',
    backgroundColor: 'black',

    flex: 0,  // Allow the container to take up available space
    flexDirection: 'column',  // Arrange regions vertically
    flexWrap: 'wrap'  // Wrap rows
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  region: {
    flex: 1,
    borderWidth: boardValues.outerWidth / 2, // Thicker region borders

    // Internal cell layout:
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default SudokuBoard