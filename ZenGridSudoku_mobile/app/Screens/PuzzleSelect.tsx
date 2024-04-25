import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PlayScreen from "./PlayScreen";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import SudokuContext from "../Navigation/SudokuContext";

const PuzzleSelect = ({ navigation }: any) => {
  // Possibly change to let statements
  const [type, setType] = useState<"easy" | "medium" | "hard">("easy");
  const [puzzle, setPuzzle] = useState<string>("1");

  (global as any).typeCtx = "";
  (global as any).puzzleCtx = "";
  (global as any).initCtx = "";

  useEffect(() => {
    (global as any).typeCtx = "";
    (global as any).puzzleCtx = "";
  }, [type, puzzle]);

  const gotoPlayScreen = () => navigation.navigate(PlayScreen.name);

  // Sanitize and validate input
  const handleInput = (input: string) => {
    if (input.length > 2) return;

    for (const [str] of input) {
      if (str < "1" || str > "9") return;
    }

    if (input == "") setPuzzle("1");

    const val = parseInt(input);

    if (val < 1 || val > 50) return;

    setPuzzle(input);
  };

  // Random Puzzle
  const types: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];
  const randomPuzzle = () => {
    const type: number = Math.floor(Math.random() * 3);
    const puzzle = (Math.floor(Math.random() * 49) + 1).toString();

    setType(types[type]);
    setPuzzle(puzzle);
  };

  // CURRENTLY DEBUG, either delete or repurpose?
  useEffect(() => undefined, [type, puzzle]);

  const resolveAPI = () => {
    switch (type) {
      case "easy":
        return "http://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_easy";
      case "medium":
        return "http://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_medium";
      case "hard":
        return "http://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_hard";
    }
  };

  const requestPuzzle = async () => {
    try {
      const response = await axios.post(resolveAPI(), {
        puzzle_number: parseInt(puzzle),
      });

      (global as any).initCtx = response.data.puzzlestring;

      // If all goes well
      gotoPlayScreen();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Assuming the response.data is an object with a message property
        const message = (axiosError.response.data as { message: string })
          .message;
        handleError(message);
      }
    }
  };

  // DEBUG
  const handleError = (error: string) => {
    alert(error);
  };

  return (
    <ImageBackground
      source={require("../imgs/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Difficulty Select */}
        <View style={styles.website}>
          <Text style={styles.title}>Difficulty:</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setType("easy")}
          >
            <Text style={styles.font}>Easy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setType("medium")}
          >
            <Text style={styles.font}>Medium</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setType("hard")}
          >
            <Text style={styles.font}>Hard</Text>
          </TouchableOpacity>
        </View>

        {/* Puzzle Number */}
        <View style={styles.website}>
          <Text style={styles.title}>Puzzle:</Text>
          <TextInput
            style={styles.input}
            placeholder="puzzle 1-50"
            value={puzzle}
            onChangeText={handleInput}
            keyboardType="numeric"
          />

          {/* Random Button */}
          <TouchableOpacity style={styles.button} onPress={randomPuzzle}>
            <Text style={styles.font}>Random Puzzle</Text>
          </TouchableOpacity>
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.button} onPress={requestPuzzle}>
          <Text style={styles.font}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  website: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "80%",
    height: 50,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  font: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});


export default PuzzleSelect;
