import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function App(){
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome !</Text>
        <Text style={styles.welcome}>Welcome !</Text>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


