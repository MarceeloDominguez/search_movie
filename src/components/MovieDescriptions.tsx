import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

type Prop = {
  description: string | undefined;
  isLoading: boolean;
};

export default function MovieDescriptions({description, isLoading}: Prop) {
  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator color="#08547a" size={30} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {description ? description : 'Película sin descripcion'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 15,
    letterSpacing: 0.4,
    color: '#e3e4e5',
    opacity: 0.9,
    fontFamily: 'Rubik-Regular',
    lineHeight: 20,
    marginBottom: 30,
  },
  containerLoading: {
    marginTop: 30,
  },
});
