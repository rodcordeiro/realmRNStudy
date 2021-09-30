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

import Database from './database/picking';
import Data from './Picking.json';

const App = () => {
  const db = new Database();
  db.clearDatabase();
  db.storeOrder(Data);

  const address = db.getAddress();
  
  console.log({ address });
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar hidden={true} />
      <Text style={styles.Title}>Tasks</Text>
      <Text style={styles.Title}>{address.descricao}</Text>
      {address.unidadeArmazenagem.map((Produto,index)=>(
        <>
        <Text key={index}>Produto=>{Produto.codigo}</Text>
        <Text key={index}>{Produto.detalhes[0].campo}: {Produto.detalhes[0].valor}</Text>
        <Text key={index}>{Produto.detalhes[1].campo}: {Produto.detalhes[1].valor}</Text>
        </>
      ))}
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
