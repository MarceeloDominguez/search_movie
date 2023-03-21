import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useMoviesActor} from '../hooks/useMoviesActor';

const BASE_IMG = 'https://image.tmdb.org/t/p';

const {width, height} = Dimensions.get('window');

type Prop = {
  id: number;
  nameActor: string;
};

export default function MoviesActor({id, nameActor}: Prop) {
  const {movieActor, loading} = useMoviesActor(id);

  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={{marginTop: 100}}>
        <ActivityIndicator color="#08547a" size={40} />
      </View>
    );
  }

  return (
    <>
      <Text style={styles.title} numberOfLines={2}>
        Películas en donde trabajo {nameActor}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movieActor?.slice(0, 50).map((item, index) => {
          const poster = `${BASE_IMG}/w500${item.poster_path}`;

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate('DetailsScreen', item),
                )
              }
              style={styles.container}>
              {item.poster_path && (
                <View style={styles.wrapPoster}>
                  <Image source={{uri: poster}} style={styles.poster} />
                  <Text style={styles.label}>Personaje:</Text>
                  <Text style={styles.character} numberOfLines={2}>
                    {item.character}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#e3e4e5',
    marginTop: 20,
    marginBottom: 24,
    fontFamily: 'Rubik-Bold',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.4,
    width: width * 0.8,
    alignSelf: 'center',
    lineHeight: 22,
  },
  container: {
    marginTop: 10,
  },
  wrapPoster: {
    marginHorizontal: 5,
  },
  poster: {
    width: width * 0.43,
    height: height * 0.33,
    borderRadius: 10,
  },
  label: {
    fontSize: 13,
    color: '#e3e4e5',
    fontFamily: 'Rubik-Regular',
    marginBottom: 8,
    marginTop: 5,
    fontStyle: 'italic',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  character: {
    width: width * 0.38,
    textAlign: 'center',
    color: '#e3e4e5',
    fontFamily: 'Rubik-Bold',
  },
});
