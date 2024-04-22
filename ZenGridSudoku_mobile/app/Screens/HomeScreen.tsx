
/* 
 * 
 * 
 * 
*/

import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import LoginScreen from './LoginScreen';
import SudokuBoard from '@/components/Sudoku/SudokuBoard';

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

const HomeScreen = ({ navigation }: any) => {
  const gotoLoginScreen = () => navigation.navigate(LoginScreen.name);
  const display = "TEMP Home Screen (Click To Login)"

  return (
    <View style={styles.container}>
      <SudokuBoard initialState={one_test}></SudokuBoard>
      {/* <Button onPress={gotoLoginScreen} title={display}></Button> */}
    </View>
  );
}

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

export default HomeScreen;