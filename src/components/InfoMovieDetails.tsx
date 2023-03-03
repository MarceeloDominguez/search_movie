import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useDetailsMovie} from '../hooks/useDetailsMovie';
import Icon from 'react-native-vector-icons/Ionicons';

type Prop = {
  id: number;
  loading: boolean;
};

export default function InfoMovieDetails({id, loading}: Prop) {
  const {movieFull} = useDetailsMovie(id);

  return (
    <>
      {loading ? (
        <ActivityIndicator color="#08547a" size={30} />
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapIconLabel}>
            <Icon name="browsers-outline" size={18} color="#92929d" />
            <Text style={styles.label}>
              {movieFull?.release_date.slice(0, 4)}
            </Text>
          </View>
          <View style={styles.lineVertical} />
          <View style={styles.wrapIconLabel}>
            <Icon name="alarm-outline" size={20} color="#92929d" />
            <Text style={styles.label}>{movieFull?.runtime} Minutos</Text>
          </View>
          <View style={styles.lineVertical} />
          <View style={styles.wrapIconLabel}>
            <Icon name="list-outline" size={20} color="#92929d" />
            {movieFull?.genres.slice(0, 1).map(item => {
              return (
                <Text key={item.id} style={styles.label}>
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    transform: [{translateY: -32}],
  },
  wrapIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#92929d',
    marginLeft: 3,
    fontFamily: 'Rubik-SemiBold',
    fontSize: 13,
  },
  lineVertical: {
    width: 1,
    height: 20,
    backgroundColor: '#92929d',
  },
});
