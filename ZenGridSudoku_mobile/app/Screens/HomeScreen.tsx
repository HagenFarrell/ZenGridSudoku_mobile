
/* 
 * 
 * 
 * 
*/

import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import LoginScreen from './LoginScreen';
import SudokuBoard from '@/components/Sudoku/SudokuBoard';
import Sudoku from '@/components/Sudoku/Sudoku';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RegisterScreen from './RegisterScreen';
import PuzzleSelect from './PuzzleSelect';

//
const empty_test = "000000000000000000000000000000000000000000000000000000000000000000000000000000000"
const invalid_test = "111111111111111111111111111111111111111111111111111111111111111111111111111111110"
const dev_test = "158723469367954821294816375619238540485690132732145986976381254841572693523469718"
const one_test = "132567948546389217978241635264918753715602894389475126857123469691754382423896571"
const wrap_test = "123456789123456789123456789123456789123456789123456789123456789123456789123456780"
//                                                             ^

/*
132567948
546389217
978241635
264918753
715602894
389475126
857123469
691754382
423896571
*/

/* <Sudoku type='easy' puzzle={-1} init={puzzle}></Sudoku> */

const HomeScreen = ({ navigation }: any) => {
  const gotoPuzzleSelectScreen = () => navigation.navigate(PuzzleSelect.name)
  const gotoLoginScreen = () => navigation.navigate(LoginScreen.name);
  const gotoRegisterScreen = () => navigation.navigate(RegisterScreen.name)

  const puzzleSelectDisplay = "Puzzle Select [undefined]"
  const loginDisplay = "Login"
  const registerDisplay = "Signup"

  const [puzzle, setPuzzle] = useState<string>(dev_test)

  return (
    <View style={styles.container}>

      {/* Navigate to PuzzleSelectScreen*/}
      <TouchableOpacity
        style={styles.button}
        onPress={gotoPuzzleSelectScreen}
      >
        <Text style={styles.buttonText}>{puzzleSelectDisplay}</Text>
      </TouchableOpacity>

      {/*Navigation to LoginScreen*/}
      <TouchableOpacity
        testID="loginButton"
        style={styles.button}
        onPress={gotoLoginScreen}
      >
        <Text style={styles.buttonText}>{loginDisplay}</Text>
      </TouchableOpacity>

      {/* Navigation to RegisterScreen*/}
      <TouchableOpacity
        style={styles.button}
        onPress={gotoRegisterScreen}
      >
        <Text style={styles.buttonText}>{registerDisplay}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  buttonText: {
    color: "black", // Ensures the text color is white
    fontSize: 16, // You can adjust the size as needed
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%", // Or a fixed width in pixels
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
    padding: 10,
    // Ensure there's no flex property causing dynamic changes in size
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // More opaque white for inputs
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%", // Ensures the input stretches to fill the container
    height: 50, // Fixed height for all inputs
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: "65%",
  },
  Text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  errorBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
  },
});

// This older style can properly center the sudoku board
const styles_old = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    // Debug, comment out
    // borderColor: 'green',
    // borderWidth: 10,
  }
})

export default HomeScreen;