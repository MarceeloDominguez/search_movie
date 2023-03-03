import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useDetailsMovie} from '../hooks/useDetailsMovie';
import Icon from 'react-native-vector-icons/Ionicons';

type Prop = {
  id: number;
};

export default function Reviews({id}: Prop) {
  const {movieFull, isLoading} = useDetailsMovie(id);

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator color="#08547a" size={30} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapTextIcon}>
        <Icon name="cash-outline" size={17} color="#92929d" />
        <Text style={styles.text}>
          Presupuesto: ${movieFull?.budget.toLocaleString('en-US')}
        </Text>
      </View>
      <View style={styles.wrapTextIcon}>
        <Icon name="star" size={17} color="#92929d" />
        <Text style={styles.text}>
          puntuación: {movieFull?.vote_average.toString().slice(0, 3)}
        </Text>
      </View>
      <View style={[styles.wrapTextIcon, {alignItems: 'flex-start'}]}>
        <Icon name="film-outline" size={17} color="#92929d" style={{top: 2}} />
        <Text style={styles.text} numberOfLines={3}>
          Productoras:{' '}
          {movieFull?.production_companies.map((item, index) => {
            return (
              <Text key={index}>
                {' '}
                {item.name}{' '}
                {index === movieFull.production_companies.length - 1
                  ? ''
                  : ' -'}{' '}
              </Text>
            );
          })}
        </Text>
      </View>
      <View style={[styles.wrapTextIcon, {alignItems: 'flex-start'}]}>
        <Icon name="list-outline" size={17} color="#92929d" style={{top: 2}} />
        <Text style={styles.text} numberOfLines={3}>
          Generos:{' '}
          {movieFull?.genres.map((item, index) => {
            return (
              <Text key={index}>
                {' '}
                {item.name} {index === movieFull.genres.length - 1 ? '' : ' -'}{' '}
              </Text>
            );
          })}{' '}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  wrapTextIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#e3e4e5',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.4,
    opacity: 0.9,
    textTransform: 'capitalize',
    lineHeight: 24,
    marginLeft: 4,
  },
  containerLoading: {
    marginTop: 30,
  },
});
