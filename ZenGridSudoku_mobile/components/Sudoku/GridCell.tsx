
/* 
 * 
 * This element has the interactable properties of our SudokuGrid
 * 
*/

import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { board } from './BoardConstants';

// properties are single use passed in
interface GridCellProps {
  id: number;               // integer [0, 80]
  init: number;        // integer [0, 9]
  locked: boolean;          // givens locked
}

// Colors - matches website
enum Highlight {
  SelectedUnlocked = "#b1ffcb",
  SelectedLocked = "#43a363",
  Locked = "silver",
  Unlocked = "white"
}

const GridCell: React.FC<GridCellProps> = ({ id, init, locked }) => {
  const [value, setValue] = useState<number>(0);
  const [highlight, setHighlight] = useState<Highlight>(
    locked ? Highlight.Locked : Highlight.Unlocked
  );

  // Re-render upon initialization of a new board
  useEffect(() => setValue(init), [init])

  // Callbacks

  // Handlers

  const select = () => {
    if (locked) {
      setHighlight(
        (highlight == Highlight.Locked) ? Highlight.SelectedLocked : Highlight.Locked
      );
    }
    else {
      setHighlight(
        (highlight == Highlight.Unlocked) ? Highlight.SelectedUnlocked : Highlight.Unlocked
      );
    }
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: highlight }]}
        onPress={select}
      >
        <Text style={styles.text}>
          {value === 0 ? '' : value}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: board.cellSize - board.clusterWidth,
    height: board.cellSize - board.clusterWidth,

    borderWidth: board.cellWidth,
    borderColor: 'black',

    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: board.cellSize - board.clusterWidth,
    height: board.cellSize - board.clusterWidth,

    backgroundColor: 'white'
  },
  text: {
    fontSize: board.fontSize,
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