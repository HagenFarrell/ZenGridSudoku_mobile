
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import PlayScreen from "./PlayScreen";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const PuzzleSelect = ({ navigation }: any) => {
  // Possibly change to let statements
  const [type, setType] = useState<('easy' | 'medium' | 'hard')>('easy')
  const [puzzle, setPuzzle] = useState<string>("1")
  let init = ""

  const gotoPlayScreen = () => navigation.navigate(PlayScreen.name)

  const handleInput = (input: string) => {
    if (input.length > 2)
      return

    for (const [str] of input) {
      if (str < '1' || str > '9')
        return
    }

    if (input == '')
      setPuzzle("1")

    const val = parseInt(input)

    if (val < 1 || val > 50)
      return

    setPuzzle(input)
  }

  const types: ('easy' | 'medium' | 'hard')[] = ["easy", "medium", "hard"]
  const randomPuzzle = () => {
    const type: number = Math.floor(Math.random() * 3)
    const puzzle = (Math.floor(Math.random() * 49) + 1).toString()

    setType(types[type])
    setPuzzle(puzzle)
  }

  // CURRENTLY DEBUG, either delete or repurpose?
  useEffect(() => undefined, [type, puzzle])

  const resolveAPI = () => {
    switch (type) {
      case "easy":
        return "http://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_easy"
      case "medium":
        return "http://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_medium"
      case "hard":
        return "http://sudokuapp-f0e20225784a.herokuapp.com/api/getpuzzle_hard"
    }
  }

  const requestPuzzle = async () => {
    try {
      const response = await axios.post(
        resolveAPI(),
        {
          puzzle_number: parseInt(puzzle)
        }
      );

      init = response.data.puzzlestring

      // login(response.data.id, response.data.Username, response.data.Email);
      // navigation.goBack(); // Navigates back to the home/play screen.
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Assuming the response.data is an object with a message property
        const message = (axiosError.response.data as { message: string }).message
        handleError(message);
      }
    }
  };

  // DEBUG
  const handleError = (error: string) => {
    alert(error)
  }

  return (
    <View style={styles.container}>
      {/* DEBUG */}
      <View>
        <Text>DEBUG:</Text>
        <Text>{type}</Text>
        <Text>{puzzle}</Text>
      </View>

      {/* Difficulty Select */}
      <View style={styles.website}>

        <Text>
          Difficulty:
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setType('easy')}
        >
          <Text style={styles.font}>Easy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setType('medium')}
        >
          <Text style={styles.font}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setType('hard')}
        >
          <Text style={styles.font}>Hard</Text>
        </TouchableOpacity>

      </View>

      {/* Puzzle Number */}
      <View style={styles.website}>
        <Text>Puzzle:</Text>
        <TextInput
          style={styles.input}
          placeholder="puzzle 1-50"
          value={puzzle}
          onChangeText={handleInput}
          keyboardType="numeric"
        />

        {/* Random Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={randomPuzzle}
        >
          <Text style={styles.font}>Random Puzzle</Text>
        </TouchableOpacity>
      </View>

      {/* Play Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={gotoPlayScreen}
      >
        <Text style={styles.font}>Start</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',

    // Debug, comment out
    borderColor: 'green',
    borderWidth: 10,

    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  },
  website: {
    flex: 1,
    margin: 10,

    // Debug, comment out
    backgroundColor: '#d4e7a7',
    borderColor: '#d4e7a7',
    borderWidth: 10,
    borderRadius: 10,
    width: "90%",
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
  button: {
    borderColor: '#abe189',
    backgroundColor: '#abe189',
    borderRadius: 10
  },
  play: {

  },
  font: {

  },
  bold: {

  }
})

export default PuzzleSelect;