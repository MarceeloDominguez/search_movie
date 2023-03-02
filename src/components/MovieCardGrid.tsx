import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {Movie} from '../interfaces/movieInterfaces';

const BASE_IMG = 'https://image.tmdb.org/t/p';

const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width * 0.28;
const ITEM_HEIGHT = height * 0.23;

type Prop = {
  movies: Movie[];
};

export default function MovieCardGrid({movies}: Prop) {
  const {isLoading} = useMovies();

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator color="#08547a" size={30} />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.wrapPoster}>
        {movies.map((item, index) => {
          const poster = `${BASE_IMG}/w500${item.poster_path}`;

          return (
            <View key={index}>
              <View style={styles.containerPoster}>
                <Image
                  source={{uri: poster}}
                  style={styles.poster}
                  resizeMode="center"
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapPoster: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    rowGap: 16,
    paddingBottom: 30,
    paddingTop: 10,
  },
  containerPoster: {
    borderRadius: 10,
    elevation: 8,
  },
  poster: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
  },
  containerLoading: {
    marginTop: 30,
  },
});
