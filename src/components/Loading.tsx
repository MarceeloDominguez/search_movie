import React from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.containerLoading}>
      <StatusBar backgroundColor="#26292f" barStyle="light-content" />
      <ActivityIndicator color="#08547a" size={50} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26292f',
  },
});
