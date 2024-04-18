
/* 
 * 
 * This element has the interactable properties of our SudokuGrid
 * 
*/

import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { boardValues } from './SudokuBoard';
import { TouchableOpacity } from 'react-native-gesture-handler';

// properties are single use passed in
interface GridCellProps {
  id: number;               // integer [0, 80]
  initValue: number;        // integer [0, 9]
  locked: boolean;          // givens locked
}

// Colors
enum Highlight {
  Selected = "lime",
  Matching = "green",
  Invalid = "red",
  Locked = "silver",
  Unlocked = "white"
}

enum Edge {
  TL, T, TR,
  L, C, R,
  BL, B, BR
}

const GridCell: React.FC<GridCellProps> = ({ id, initValue, locked }) => {
  // value modifiable via callbacks
  const [value, setValue] = useState<number>(initValue);

  // highlight modifiable via callbacks
  const [highlight, setHighlight] = useState<Highlight>(
    locked ? Highlight.Locked : Highlight.Unlocked
  );

  const test = () => {
    setHighlight(
      (highlight == Highlight.Selected)
      ? (locked ? Highlight.Locked : Highlight.Unlocked)
      : Highlight.Selected
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: highlight }]}
      onPress={test}
    >
      <Text style={styles.text}>
        {value === 0 ? '' : value}
      </Text>
    </TouchableOpacity>
  )
};

// Some cell controls
const cellValues = {
  cellSize: boardValues.boardSize / 9,
  innerWidth: boardValues.outerWidth / 3,
  test: 21
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
    fontSize: cellValues.test,
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