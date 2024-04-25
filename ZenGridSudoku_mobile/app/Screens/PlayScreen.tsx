
import Sudoku from "@/components/Sudoku/Sudoku";
import { StyleSheet, View } from "react-native";

const dev_test: string = "158723469367954821294816375619238540485690132732145986976381254841572693523469718"

const PlayScreen = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      <Sudoku type={'easy'} puzzle={-1} init={dev_test}></Sudoku>
    </View>
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
  }
})

export default PlayScreen;