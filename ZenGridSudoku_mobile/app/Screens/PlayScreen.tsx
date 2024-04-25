
import { board } from "@/components/Sudoku/BoardConstants";
import Sudoku from "@/components/Sudoku/Sudoku";
import { useContext } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SudokuContext from "../Navigation/SudokuContext";

const dev_test: string = "158723469367954821294816375619238540485690132732145986976381254841572693523469718"

const PlayScreen = ({ navigation }: any) => {

  return (
    <ImageBackground
      source={require("../imgs/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>

        <Sudoku type={(global as any).typeCtx} puzzle={parseInt((global as any).puzzleCtx)} init={(global as any).initCtx}></Sudoku>

        {/** Back Button */}
        <View style={styles.back}>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.font}
              onPress={navigation.goBack}
            >Back</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    // Debug, comment out
    // borderColor: 'green',
    // borderWidth: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: 'absolute',
    padding: 10,

    bottom: 0,
    left: 0
  },
  button: {
    width: 'auto',
    height: 'auto',

    padding: 5,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'white',
    borderRadius: 10,
  },
  font: {
    fontSize: board.fontSize
  }
})

export default PlayScreen;