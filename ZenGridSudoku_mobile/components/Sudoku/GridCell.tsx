
/* 
 * 
 * This element has the interactable properties of our SudokuGrid
 * 
*/

import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { boardValues } from './SudokuGrid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

interface GridCellProps {
  id: number;               // identifier [0, 80]
  initValue: number;        // integer clamped between 0 and 9
  locked: boolean;          // puzzle hints are locked
}

enum CellHighlights {
  Selected = "lime",
  Matching = "green",
  Invalid = "red",
  Locked = "silver",
  Unlocked = "white"
}

const GridCell: React.FC<GridCellProps> = ({ id, initValue, locked }) => {
  const [value, setValue] = useState(initValue);
  const [highlight, setHighlight] = useState(locked ? CellHighlights.Locked : CellHighlights.Unlocked);

  const test = () => {
    setHighlight(
      (highlight == CellHighlights.Selected) ? CellHighlights.Locked : CellHighlights.Selected
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: highlight }]}
      onPress={test}
    >
      <View>
        <Text style={styles.text}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

// Some cell controls
const cellValues = {
  cellSize: boardValues.boardSize / 9,
  innerWidth: boardValues.outerWidth / 3,
  fontSize: 20
};

const styles = StyleSheet.create({
  container: {
    width: cellValues.cellSize,
    height: cellValues.cellSize,
    borderWidth: cellValues.innerWidth,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: cellValues.fontSize,
  },
});

export default GridCell;

/*
 * Values [1, 9] are normal states
 *
 * A cell takes on a value of 0 as unset and rendering nothing
 * When 0 it also ommits itself from board validation
 * 
*/