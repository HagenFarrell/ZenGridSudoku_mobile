
/* 
 * 
 * This element has the interactable properties of our SudokuGrid
 * 
*/

import { View, Text, StyleSheet } from 'react-native';

interface GridCellProps {
  highlight?: string;
  value?: number;         // integer clamped between 1 and 9
  locked?: boolean;       // puzzle hints are locked
}

const GridCell: React.FC<GridCellProps> = ({ value, locked }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

// Would a dynamic background color be here or part of the interface?
// How much should be "hardcoded,"" can this be dynamic?
// Can these become properties from the interface?
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
  },
});

export default GridCell;