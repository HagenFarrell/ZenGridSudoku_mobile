
/* 
 * 
 * This element has the interactable properties of our SudokuGrid
 * 
*/

import { useState } from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { boardValues } from '../Sudoku/SudokuBoard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { menuValues } from './SudokuMenu';

interface MenuClusterProps {
  display: string;
  onPress: () => void;
}

enum Edge {
  TL, T, TR,
  L, C, R,
  BL, B, BR
}

const MenuCluster: React.FC<MenuClusterProps> = ({ display, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text style={undefined}>
        {display}
      </Text>
    </TouchableOpacity>
  )
};

const clusterValues = {
  cellSize: menuValues.boardSize / 3.1,
  innerWidth: menuValues.outerWidth / 3,
  fontSize: 20
};

const styles = StyleSheet.create({
  container: {
    width: clusterValues.cellSize,
    height: clusterValues.cellSize,

    borderWidth: clusterValues.innerWidth,
    borderColor: 'gray',

    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: clusterValues.fontSize,
  },
  // Special edge control
  1: {

  },
  2: {

  },
  3: {

  },
  4: {

  },
  5: {

  },
  6: {

  },
  7: {

  },
  8: {

  },
  9: {

  }
});

export default MenuCluster;

/*
 * Values [1, 9] are normal states
 *
 * A cell takes on a value of 0 as unset and rendering nothing
 * When 0 it also ommits itself from board validation
 * 
*/