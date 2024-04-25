/*
 *
 *
 *
 */

import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import LoginScreen from "./LoginScreen";
import SudokuBoard from "@/components/Sudoku/SudokuBoard";
import Sudoku from "@/components/Sudoku/Sudoku";
import { TouchableOpacity } from "react-native-gesture-handler";
import RegisterScreen from "./RegisterScreen";
import PuzzleSelect from "./PuzzleSelect";

//
const empty_test =
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000";
const invalid_test =
  "111111111111111111111111111111111111111111111111111111111111111111111111111111110";
const dev_test =
  "158723469367954821294816375619238540485690132732145986976381254841572693523469718";
const one_test =
  "132567948546389217978241635264918753715602894389475126857123469691754382423896571";
const wrap_test =
  "123456789123456789123456789123456789123456789123456789123456789123456789123456780";
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
  const gotoPuzzleSelectScreen = () => navigation.navigate(PuzzleSelect.name);
  const gotoLoginScreen = () => navigation.navigate(LoginScreen.name);
  const gotoRegisterScreen = () => navigation.navigate(RegisterScreen.name);

  const puzzleSelectDisplay = "Lets play Sudoku!";
  const loginDisplay = "Login";
  const registerDisplay = "Signup";

  const [puzzle, setPuzzle] = useState<string>(dev_test);

  return (
    <ImageBackground
      source={require("../imgs/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ZenGridSudoku</Text>
        </View>
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
        <TouchableOpacity style={styles.button} onPress={gotoRegisterScreen}>
          <Text style={styles.buttonText}>{registerDisplay}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    marginTop: 0,
    backgroundColor: "#4CAF50", // Use the primary color for coherence
    width: "100%", // Full width to stretch across the screen
    alignItems: "center", // Center align text
    marginBottom: 30, // Spacing from the top element
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50", // A more vibrant green color for action buttons
    borderRadius: 20,
    borderWidth: 2, // Remove border for a cleaner look
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10, // Adds space between buttons
    width: "80%", // Ensures buttons are uniformly sized
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds subtle elevation for material design feel
  },
  buttonText: {
    color: "white", // White text for better readability on green background
    fontSize: 18, // Slightly larger font size
    fontWeight: "bold",
    textAlign: "center", // Ensures text is centered within the button
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default HomeScreen;
