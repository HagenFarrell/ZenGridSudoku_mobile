// PlayScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Play Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default PlayScreen;