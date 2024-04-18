
/* 
 * 
 *
 * 
*/

import React from "react";
import { StyleSheet, View } from "react-native";
import MenuCluster from "./MenuCluster";
import SudokuBoard, { boardValues } from "../Sudoku/SudokuBoard";

// Each button can be its own externally defined function
// then suppling that function reference to the lambda
const SudokuMenu = () => {
  return (
    <View style={styles.container}>
      <MenuCluster display="B1" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B2" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B3" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B4" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B5" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B6" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B7" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B8" onPress={() => undefined}></MenuCluster>
      <MenuCluster display="B9" onPress={() => undefined}></MenuCluster>
    </View>
  )
};

// 27 * 13
// Some board controls
export const menuValues = {
  roundness: 10,
  boardSize: 27 * 14,
  outerWidth: 6
};

const styles = StyleSheet.create({
  container: {
    width: menuValues.boardSize,
    height: menuValues.boardSize,

    borderWidth: menuValues.outerWidth,
    borderRadius: menuValues.roundness,
    borderColor: 'black',

    flex: 0,
    flexWrap: "wrap",
    flexDirection: "row"
  }
})

export default SudokuMenu;