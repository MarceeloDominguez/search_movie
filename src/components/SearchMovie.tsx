import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchMovie() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qué película quieres ver?</Text>
      <TouchableOpacity
        style={styles.containerInput}
        activeOpacity={1}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate('SearchScreen'))
        }>
        <Text style={styles.textPlaceholder}>Buscar</Text>
        <Icon name="search" size={25} style={styles.iconSearch} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 0.4,
    fontFamily: 'Rubik-Bold',
  },
  containerInput: {
    backgroundColor: '#3a3f47',
    height: 50,
    borderRadius: 16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textPlaceholder: {
    color: '#64666b',
    fontSize: 16,
    letterSpacing: 0.4,
    fontFamily: 'Rubik-Medium',
  },
  iconSearch: {
    color: '#64666b',
    transform: [{rotate: '90deg'}],
  },
});
