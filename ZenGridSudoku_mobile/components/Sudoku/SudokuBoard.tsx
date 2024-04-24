
/* DEPRECATED DO NOT USE
 * 
 * SCHEDULED FOR REMOVAL
 * 
*/

import React, { useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import GridCell, { Highlight } from "./GridCell";
import { board } from "./BoardConstants";

interface SudokuBoardProps {
  type: ('easy' | 'medium' | 'hard')
  puzzle: number
  init: string; // String length 81, numbers [0, 9]
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ type, puzzle, init }) => {
  // Mutable and used for initialState
  const [board, setBoard] = useState<number[][]>([]);

  // Win condition
  let solved = false

  // [-1, 80] where -1 is no selection and [0, 80] used to map to board[][]
  let selected = -1;

  function new81() {
    return [
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null
    ]
  }

  let setValues: (React.Dispatch<React.SetStateAction<number>> | null)[] = new81()

  let setHighlights: (((arg0: boolean) => void) | null)[] = new81()

  // Lambdas to reset the board to the initialState
  const toNumber = (char: string): number => parseInt(char, 10);
  const reset = () => {
    // Reset other states
    solved = false
    selected = -1

    // Reset callback holders
    setValues = new81()
    setHighlights = new81()

    // Process new initialization data
    const parsedData = init.split("").map(toNumber);

    const grid = [];

    for (let i = 0; i < 9; i++) {
      grid.push(parsedData.slice(i * 9, (i + 1) * 9));
    }

    setBoard(grid);
  }

  // Uses the above lambda for resetting the board state to a new one on prop change
  useEffect(() => {
    reset()
  }, [init]);

  // Callbacks
  //
  // This somehow works, and I am not going to question it at all
  const handleSelected = (id: number, init: number, locked: boolean, setValue: React.Dispatch<React.SetStateAction<number>>, setHighlight: (arg0: boolean) => void) => {
    const r1 = Math.floor(id / 9)
    const c1 = id % 9

    console.log("id | " + id)
    console.log("init | " + init)
    console.log("locked | " + locked)

    if (Number.isNaN(init)) { // Deslecting all
      for (let i = 0; i < 81; i++) {
        const func = setHighlights[i]
        if (func != null) func(true)
      }
      selected = id
    }
    else if (init != Infinity) {
      const val = (r1 >= 0 && c1 >= 0) ? board[r1][c1] : 0

      // Normal Cell Highlight
      if (val != 0) {
        for (let i = 0; i < 81; i++) {
          const r2 = Math.floor(i / 9)
          const c2 = i % 9

          const func = setHighlights[i]

          if (board[r2][c2] == val) {
            if (func != null) func(false)
          }
          else {
            if (func != null) func(true)
          }
        }
      } else { // On empty select, select others but NOT other empties
        for (let i = 0; i < 81; i++) {

          const func = setHighlights[i]

          if (i != id) {
            if (func != null) func(true)
          }
        }
      }

      selected = id
    }
    else {
      setValues[id] = setValue
      setHighlights[id] = setHighlight
    }
  }

  // Hardcoded madness, hope it works
  const render = () => {
    return (
      <View style={styles.rounded}>
        <View style={styles.enclosing}>

          {/* TL Cluster */}
          <View style={styles.cluster}>
            {/* Row 1 */}
            <GridCell id={0} init={board[0][0]} locked={board[0][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={1} init={board[0][1]} locked={board[0][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={2} init={board[0][2]} locked={board[0][2] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 2 */}
            <GridCell id={9} init={board[1][0]} locked={board[1][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={10} init={board[1][1]} locked={board[1][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={11} init={board[1][2]} locked={board[1][2] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 3 */}
            <GridCell id={18} init={board[2][0]} locked={board[2][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={19} init={board[2][1]} locked={board[2][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={20} init={board[2][2]} locked={board[2][2] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

          {/* T Cluster */}
          <View style={styles.cluster}>
            {/* Row 1 */}
            <GridCell id={3} init={board[0][3]} locked={board[0][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={4} init={board[0][4]} locked={board[0][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={5} init={board[0][5]} locked={board[0][5] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 2 */}
            <GridCell id={12} init={board[1][3]} locked={board[1][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={13} init={board[1][4]} locked={board[1][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={14} init={board[1][5]} locked={board[1][5] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 3 */}
            <GridCell id={21} init={board[2][3]} locked={board[2][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={22} init={board[2][4]} locked={board[2][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={23} init={board[2][5]} locked={board[2][5] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

          {/* TR Cluster */}
          <View style={styles.cluster}>
            {/* Row 1 */}
            <GridCell id={6} init={board[0][6]} locked={board[0][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={7} init={board[0][7]} locked={board[0][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={8} init={board[0][8]} locked={board[0][8] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 2 */}
            <GridCell id={15} init={board[1][6]} locked={board[1][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={16} init={board[1][7]} locked={board[1][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={17} init={board[1][8]} locked={board[1][8] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 3 */}
            <GridCell id={24} init={board[2][6]} locked={board[2][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={25} init={board[2][7]} locked={board[2][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={26} init={board[2][8]} locked={board[2][8] !== 0} selectCallback={handleSelected}></GridCell>
          </View>



          {/* ML Cluster */}
          <View style={styles.cluster}>
            {/* Row 4 */}
            <GridCell id={27} init={board[3][0]} locked={board[3][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={28} init={board[3][1]} locked={board[3][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={29} init={board[3][2]} locked={board[3][2] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 5 */}
            <GridCell id={36} init={board[4][0]} locked={board[4][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={37} init={board[4][1]} locked={board[4][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={38} init={board[4][2]} locked={board[4][2] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 6 */}
            <GridCell id={45} init={board[5][0]} locked={board[5][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={46} init={board[5][1]} locked={board[5][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={47} init={board[5][2]} locked={board[5][2] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

          {/* M Cluster */}
          <View style={styles.cluster}>
            {/* Row 4 */}
            <GridCell id={30} init={board[3][3]} locked={board[3][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={31} init={board[3][4]} locked={board[3][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={32} init={board[3][5]} locked={board[3][5] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 5 */}
            <GridCell id={39} init={board[4][3]} locked={board[4][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={40} init={board[4][4]} locked={board[4][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={41} init={board[4][5]} locked={board[4][5] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 6 */}
            <GridCell id={48} init={board[5][3]} locked={board[5][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={49} init={board[5][4]} locked={board[5][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={50} init={board[5][5]} locked={board[5][5] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

          {/* MR Cluster */}
          <View style={styles.cluster}>
            {/* Row 4 */}
            <GridCell id={33} init={board[3][6]} locked={board[3][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={34} init={board[3][7]} locked={board[3][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={35} init={board[3][8]} locked={board[3][8] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 5 */}
            <GridCell id={42} init={board[4][6]} locked={board[4][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={43} init={board[4][7]} locked={board[4][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={44} init={board[4][8]} locked={board[4][8] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 6 */}
            <GridCell id={51} init={board[5][6]} locked={board[5][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={52} init={board[5][7]} locked={board[5][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={53} init={board[5][8]} locked={board[5][8] !== 0} selectCallback={handleSelected}></GridCell>
          </View>



          {/* BL Cluster */}
          <View style={styles.cluster}>
            {/* Row 7 */}
            <GridCell id={54} init={board[6][0]} locked={board[6][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={55} init={board[6][1]} locked={board[6][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={56} init={board[6][2]} locked={board[6][2] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 8 */}
            <GridCell id={63} init={board[7][0]} locked={board[7][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={64} init={board[7][1]} locked={board[7][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={65} init={board[7][2]} locked={board[7][2] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 9 */}
            <GridCell id={72} init={board[8][0]} locked={board[8][0] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={73} init={board[8][1]} locked={board[8][1] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={74} init={board[8][2]} locked={board[8][2] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

          {/* B Cluster */}
          <View style={styles.cluster}>
            {/* Row 7 */}
            <GridCell id={57} init={board[6][3]} locked={board[6][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={58} init={board[6][4]} locked={board[6][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={59} init={board[6][5]} locked={board[6][5] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 8 */}
            <GridCell id={66} init={board[7][3]} locked={board[7][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={67} init={board[7][4]} locked={board[7][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={68} init={board[7][5]} locked={board[7][5] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 9 */}
            <GridCell id={75} init={board[8][3]} locked={board[8][3] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={76} init={board[8][4]} locked={board[8][4] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={77} init={board[8][5]} locked={board[8][5] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

          {/* BR Cluster */}
          <View style={styles.cluster}>
            {/* Row 7 */}
            <GridCell id={60} init={board[6][6]} locked={board[6][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={61} init={board[6][7]} locked={board[6][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={62} init={board[6][8]} locked={board[6][8] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 8 */}
            <GridCell id={69} init={board[7][6]} locked={board[7][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={70} init={board[7][7]} locked={board[7][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={71} init={board[7][8]} locked={board[7][8] !== 0} selectCallback={handleSelected}></GridCell>

            {/* Row 9 */}
            <GridCell id={78} init={board[8][6]} locked={board[8][6] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={79} init={board[8][7]} locked={board[8][7] !== 0} selectCallback={handleSelected}></GridCell>
            <GridCell id={80} init={board[8][8]} locked={board[8][8] !== 0} selectCallback={handleSelected}></GridCell>
          </View>

        </View>
      </View>
    )
  }

  // Hardcoded
  return board.length == 0 ? null : render()
};

const styles = StyleSheet.create({
  rounded: {
    borderColor: 'black',
    borderWidth: board.outerWidth,
    borderRadius: board.roundness
  },
  enclosing: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    width: board.boardSize,
    height: board.boardSize,

    backgroundColor: 'black',
    borderColor: 'black'
  },
  cluster: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    width: board.clusterSize,
    height: board.clusterSize,

    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: board.clusterWidth
  }
})

export default SudokuBoard