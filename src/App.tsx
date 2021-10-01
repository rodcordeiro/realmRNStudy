import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ProgressBar from 'react-native-progress/Bar';

import Database, { iEndereco } from './database';
import Dados from './Picking.json';

const App = () => {
  const total = 3500,
    [coletado, setColetado] = useState(0),
    [progress, setProgress] = useState(0);

  const [address, setAddress] = useState(null),
    [details, setDetails] = useState([
      {
        campo: 'Produto',
        valor: '21799',
      },
      {
        campo: 'Descrição',
        valor: 'Camiseta Overcome "Boat Ride" Branca  GG',
      },
    ]);

  const db = new Database();
  db.clearDatabase();

  const status = db.save(Dados);

  useEffect(() => {
    const valor = coletado / total;
    setProgress(valor);
  }, [coletado]);
  useEffect(() => {
    const t = db.getAddress();
    console.log({ t });
    setAddress(t.descricaoEndereco);
    console.log(t.detalhes);
    // setDetails(t.detalhes);
    console.log({ address, details });
  }, [coletado]);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar hidden={true} />
      <Text style={styles.Title}>Tasks</Text>

      <ProgressBar
        progress={progress}
        width={350}
        height={30}
        animated
        borderRadius={15}
        borderColor="transparent"
        unfilledColor="#333"
        color="#ff9000"
        style={{
          outline: 'none',
          border: 'none',
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setColetado(coletado + 50);
        }}>
        <View style={{ margin: 20 }}>
          <Text>Update</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.Title}>
        {address && (
          <>
            <Text>{address}</Text>
            <View style={styles.Section}>
              {details.map((detail, index) => {
                console.log(index, detail);
                return (
                  <Text key={index}>
                    {detail.campo}: {detail.valor}
                  </Text>
                );
              })}
            </View>
          </>
        )}
      </View>
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
    marginTop: 30,
    padding: 15,
  },
  Section: {
    marginTop: 8,
    borderColor: 'black',
    borderWidth: 3,
    fontWeight: '400',
    padding: 30,
  },
});

export default App;
