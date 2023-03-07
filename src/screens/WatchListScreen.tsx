import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {useFavoriteMovie} from '../store/moviesFavorites';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemListWatch from '../components/ItemListWatch';
import Loading from '../components/Loading';
import {useNavigation} from '@react-navigation/native';

const BASE_IMG = 'https://image.tmdb.org/t/p';

export default function WatchListScreen() {
  const {movieFavorite, removeIdMovieFavorite, ids} = useFavoriteMovie(
    state => state,
  );
  const {isLoading} = useMovies();

  const listWatchFavorites = ids.map(favorite => {
    return movieFavorite.find(item => item.id === favorite);
  });

  const navigation = useNavigation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.containerHeader}>
        <Icon
          name="chevron-back-outline"
          size={25}
          color="#fff"
          style={styles.headerFlex1}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerFlex1}>
          <Text style={styles.titleHeader}>Mi Lista</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        {listWatchFavorites.length === 0 && (
          <Text style={styles.titleNoList}>No hay películas en tú lista</Text>
        )}
        {listWatchFavorites.reverse().map((item, index) => {
          const poster = `${BASE_IMG}/w500${item?.poster_path}`;

          return (
            <View style={styles.containerItems} key={index}>
              <View>
                <Image
                  source={{uri: poster}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.wrapInfo}>
                <Text numberOfLines={2} style={styles.titleMovie}>
                  {item?.title}
                </Text>
                <ItemListWatch id={item?.id} />
              </View>
              <Icon
                name="bookmark"
                size={25}
                style={styles.iconBookmark}
                color="#0296e5"
                onPress={() => removeIdMovieFavorite(item?.id!)}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26292f',
  },
  containerHeader: {
    paddingHorizontal: 15,
    marginBottom: 35,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    fontFamily: 'Rubik-Bold',
    letterSpacing: 0.4,
    fontSize: 17,
    width: 80,
    textAlign: 'center',
    transform: [{translateX: -40}],
    color: '#e3e4e5',
  },
  headerFlex1: {
    flex: 1,
  },
  titleNoList: {
    textAlign: 'center',
    color: '#e3e4e5',
    fontFamily: 'Rubik-ExtraBold',
    fontSize: 18,
  },
  containerItems: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  wrapInfo: {
    flex: 1,
    paddingLeft: 14,
  },
  image: {
    width: 110,
    height: 160,
    borderRadius: 10,
  },
  titleMovie: {
    color: '#e3e4e5',
    fontFamily: 'Rubik-SemiBold',
    letterSpacing: 0.4,
    fontSize: 16,
    marginBottom: 10,
  },
  iconBookmark: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
