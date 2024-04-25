
/* 
 * 
 *
 * 
*/

import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { board } from "./BoardConstants";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

interface SudokuProps {
  type: ('easy' | 'medium' | 'hard')
  puzzle: number
  init: string; // String length 81, numbers [0, 9]
}

enum Highlight {
  SelectedUnlocked = "#b1ffcb",
  SelectedLocked = "#43a363",
  Locked = "silver",
  Unlocked = "white"
}

const Sudoku: React.FC<SudokuProps> = ({ type, puzzle, init }) => {

  /* NESTED COMPONENT
   * NESTED COMPONENT
   * NESTED COMPONENT
   * BELOW
  */

  interface TileProps {
    id: number;               // integer [0, 80]
    initTile: number;        // integer [0, 9]
    locked: boolean;          // givens locked
  }

  const Tile: React.FC<TileProps> = ({ id, initTile }) => {
    const [value, setValue] = useState<number>(0);
    const [highlight, setHighlight] = useState<Highlight>(
      initTile != 0 ? Highlight.Locked : Highlight.Unlocked
    );

    // Map callbacks to Sudoku
    valueMap.set(id, setValue)
    highlightMap.set(id, setHighlight)
    lockedMap.set(id, initTile != 0)

    // Re-render upon initialization of a new board
    useEffect(() => {
      setValue(initTile)
      setHighlight(initTile != 0 ? Highlight.Locked : Highlight.Unlocked)
    }, [initTile])

    return (
      <View style={styles.background}>
        <TouchableOpacity
          style={[styles.tile, { backgroundColor: highlight }]}
          onPress={() => tileClick(id)}
        >
          <Text style={styles.text}>
            {value === 0 ? '' : value}
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  /* ABOVE
   * NESTED COMPONENT
   * NESTED COMPONENT
   * NESTED COMPONENT
  */

  /* NESTED COMPONENT
   * NESTED COMPONENT
   * NESTED COMPONENT
   * BELOW
  */

  interface NumberPadProps {
    val: number
  }

  const NumberPad: React.FC<NumberPadProps> = ({ val }) => {
    return (
      <View style={styles.numpad}>
        <TouchableOpacity
          style={styles.numbutton}
          onPress={() => numPadClick(val)}
        >
          <Text style={styles.text}>
            {val === 0 ? 'X' : val}
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  /* ABOVE
   * NESTED COMPONENT
   * NESTED COMPONENT
   * NESTED COMPONENT
  */

  // Board Structure
  const newBoard = () => {
    const data = init.split("").map((char) => parseInt(char));
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push(data.slice(i * 9, (i + 1) * 9));
    }
    return board;
  }

  // Mutable and used for initialState
  const [board, setBoard] = useState<number[][]>([]);
  const [win, setWin] = useState<boolean>(false)
  let solved = false
  let selected = -1; // [-1, 80]

  let time = 0
  setInterval(() => {
    time += 77
  }, 77)

  // Setter holders
  const valueMap = new Map<number, React.Dispatch<React.SetStateAction<number>>>();
  const highlightMap = new Map<number, React.Dispatch<React.SetStateAction<Highlight>>>();
  const lockedMap = new Map<number, boolean>();

  // Ran by useEffect
  const reset = () => {
    // Reset states
    solved = false
    selected = -1
    time = 0
    // setWin(false)
    setBoard(newBoard());
  }

  // Run reset on prop init changes
  useEffect(() => {
    reset()
  }, [init]);

  const doHighlight = (locked: boolean) => (locked)
    ? Highlight.SelectedLocked
    : Highlight.SelectedUnlocked

  const unHighlight = (locked: boolean) => (locked)
    ? Highlight.Locked
    : Highlight.Unlocked

  // Handle tile clicks
  const tileClick = (id: number) => {
    // Handle selection and deselection
    selected = (id == -1 || id != selected) ? id : -1

    // Only run if there is an active selection
    if (selected != -1) {
      const val = board[Math.floor(id / 9)][id % 9]

      // Only highlight a single empty tile
      if (val == 0) {
        // Deselect
        for (const [key, setter] of highlightMap) {
          const locked = lockedMap.get(key)
          if (setter != undefined && locked != undefined) {
            setter(unHighlight(locked))
          }
        }

        // Highlight the single empty tile
        const setter = highlightMap.get(id)
        const locked = lockedMap.get(id)

        if (setter != undefined && locked != undefined) {
          setter(doHighlight(locked))
        }

        return // No need to process other tiles
      }

      // Process highlighting matching tiles for the one selected
      for (const [key, setter] of highlightMap) {
        // highlight
        if (board[Math.floor(key / 9)][key % 9] == val) {
          const locked = lockedMap.get(key)
          if (setter != undefined && locked != undefined) {
            setter(doHighlight(locked))
          }
        } else { // unhighlight
          const locked = lockedMap.get(key)
          if (setter != undefined && locked != undefined) {
            setter(unHighlight(locked))
          }
        }
      }
    } else { // Unhighlight all tiles upon deselect
      for (const [key, setter] of highlightMap) {
        const locked = lockedMap.get(key)
        if (setter != undefined && locked != undefined) {
          setter(unHighlight(locked))
        }
      }
    }
  }

  const numPadClick = (val: number) => {
    const locked = lockedMap.get(selected)
    // Only run if there is a selection and it's not locked
    if (selected != -1 && locked != undefined && !locked) {
      // Update data structure
      board[Math.floor(selected / 9)][selected % 9] = val

      // Update Tile component rendering
      const setter = valueMap.get(selected)
      if (setter != undefined) {
        setter(val)

        // Copy original to unselect and reselect
        // to correctly rerender
        const original = selected
        selected = -1
        tileClick(original)
      }
    }

    // When validate is true
    solved = validate()
    if (solved) {
      onWin()
    }
  }

  const onWin = () => {
    setWin(true)
    updateStats()
  }

  const updateStats = async () => {
    try {
      const storedUsername = await SecureStore.getItemAsync("username");
      const storedEmail = await SecureStore.getItemAsync("email");

      // console.log("DETECTED TYPE | " + type)
      // console.log("storedUsername | " + storedUsername)
      // console.log("storedEmail | " + storedEmail)

      // Not logged in
      if (storedEmail == undefined || storedEmail == null || storedEmail.length == 0)
        return

      // console.log("PASSED")

      switch (type) {
        case "easy":
          // console.log("Updating EASY")
          await axios.post(
            "http://sudokuapp-f0e20225784a.herokuapp.com/api/updateCompletion",
            {
              email: storedEmail,
              easy: 1
            }
          );

          await axios.post(
            "http://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_easy",
            {
              username: storedUsername,
              puzzle_number: puzzle,
              time_easy: time
            }
          );

          break

        case "medium":
          // console.log("Updating MEDIUM")
          await axios.post(
            "http://sudokuapp-f0e20225784a.herokuapp.com/api/updateCompletion",
            {
              email: storedEmail,
              medium: 1
            }
          );

          await axios.post(
            "http://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_medium",
            {
              username: storedUsername,
              puzzle_number: puzzle,
              time_medium: time
            }
          );

          break

        case "hard":
          // console.log("Updating HARD")
          await axios.post(
            "http://sudokuapp-f0e20225784a.herokuapp.com/api/updateCompletion",
            {
              email: storedEmail,
              hard: 1
            }
          );

          await axios.post(
            "http://sudokuapp-f0e20225784a.herokuapp.com/api/setusertime_hard",
            {
              username: storedUsername,
              puzzle_number: puzzle,
              time_hard: time
            }
          );

          break
      }
    }
    catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError)
      }
    }
  };

  const validate = () => {
    const found = new Set<string>()

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const tile = board[r][c]

        if (tile == 0) return false

        const ids = [
          `row:${r}${tile}`,
          `col:${c}${tile}`,
          `sqr:${~~(c / 3)}${~~(r / 3)}${tile}`
        ]

        for (const id of ids) {
          if (found.has(id)) return false
          found.add(id)
        }
      }
    }

    return true
  }

  // Render logic
  const render = () => {
    const clusters: JSX.Element[] = []

    for (let i = 0; i < 9; i++) {
      const r = Math.floor(i / 3)
      const c = i % 3

      const tiles: JSX.Element[] = []
      for (let j = 0; j < 9; j++) {
        const y = Math.floor(j / 3)
        const x = j % 3

        // Proper alignment
        const id = (r * 27) + (y * 9) + (c * 3) + (x)
        const val = board[Math.floor(id / 9)][id % 9]

        tiles.push(
          <Tile
            key={id}
            id={id}
            initTile={val}
            locked={val != 0}
          />
        )
      }

      clusters.push(
        <View key={i} style={styles.cluster}>
          {tiles}
        </View>
      )
    }

    return clusters
  }

  const renderWinBox = () => {
    return (!win) ? null : (
      <View style={styles.winBox}>
        <Text style={styles.font}>Sudoku Solved!</Text>
      </View>
    )
  }

  // Hardcoded
  return (
    <View>
      {renderWinBox()}

      {/* Win Overlay */}
      <View>
      </View>

      <View style={styles.rounded}>
        <View style={styles.enclosing}>
          {board.length == 0 ? null : render()}
        </View>
      </View>

      {/* Number Pad */}
      <View style={styles.numpad}>
        <NumberPad val={1}></NumberPad>
        <NumberPad val={2}></NumberPad>
        <NumberPad val={3}></NumberPad>
      </View>
      <View style={styles.numpad}>
        <NumberPad val={4}></NumberPad>
        <NumberPad val={5}></NumberPad>
        <NumberPad val={6}></NumberPad>
      </View>
      <View style={styles.numpad}>
        <NumberPad val={7}></NumberPad>
        <NumberPad val={8}></NumberPad>
        <NumberPad val={9}></NumberPad>
      </View>
      <View style={styles.numpad}>
        <NumberPad val={0}></NumberPad>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  rounded: {
    top: 16, // synchronize with numpad.top

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
    borderWidth: board.clusterWidth,

    padding: 1
  },
  tile: {
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
  numpad: {
    padding: 3,
    top: 8, // synchronize with rounded.top
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
  },
  numbutton: {
    borderRadius: 25,

    // Colors subject to change
    borderColor: 'lightskyblue',
    backgroundColor: 'lightskyblue',

    width: board.cellSize * 0.9,
    height: board.cellSize * 0.9,

    alignItems: 'center',
    justifyContent: 'center'
  },
  winBox: {
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#e4f1bce0',
    borderRadius: 10,

    zIndex: 2,
    padding: 20,

    height: 'auto',
    width: 'auto',

    top: 200,
    left: 120
  },
  font: {
    fontSize: board.fontSize,
    fontWeight: "bold",
  },



  // Deprecated
  successBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    zIndex: 2,
  },
  successText: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',

    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
})

export default Sudoku