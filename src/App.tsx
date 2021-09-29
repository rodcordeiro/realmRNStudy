/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

import Database from './database';


const App = () => {
  const db = new Database();
  db.listAll();
  db.findById(1);
  // db.add('Teste 1');
  // db.add('Teste 2');
  // db.add('Teste 3');
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar hidden={true} />
      <Text style={styles.Title}>Tasks</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 5,
  },
  Title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    padding: 15,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
