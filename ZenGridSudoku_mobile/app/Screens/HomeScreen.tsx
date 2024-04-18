
/* 
 * 
 * 
 * 
*/

import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';
import SudokuBoard from '@/components/Sudoku/SudokuBoard';

//
const empty_test    = "000000000000000000000000000000000000000000000000000000000000000000000000000000000"
const invalid_test  = "111111111111111111111111111111111111111111111111111111111111111111111111111111110"
const dev_test      = "158723469367954821294816375619238540485690132732145986976381254841572693523469718"
const one_test      = "132567948546389217978241635264918753715602894389475126857123469691754382423896571"
const wrap_test     = "123456789123456789123456789123456789123456789123456789123456789123456789123456780"
//                                                             ^

const HomeScreen = ({ navigation }: any) => {
  const gotoLoginScreen = () => navigation.navigate(LoginScreen.name);
  const display = "TEMP Home Screen (Click To Login)"

  return (
    // <View style={styles.container}>
    //   <SudokuMenu></SudokuMenu>
    // </View>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text onPress={() => navigation.navigate("LoginScreen")}>Home Screen (Click To Login)</Text>
    //     <GridCell id={1} initValue={1} locked={true}></GridCell>
    //     <GridCell id={2} initValue={2} locked={true}></GridCell>
    // </View>

    <View style={styles.container}>
      <Button onPress={gotoLoginScreen} title={display}></Button>
      <SudokuBoard initialState={wrap_test}></SudokuBoard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen;