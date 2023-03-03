import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {RootStackParams} from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import InfoMovieDetails from '../components/InfoMovieDetails';
import TabsDetails from '../components/TabsDetails';

const BASE_IMG = 'https://image.tmdb.org/t/p';

const {width, height} = Dimensions.get('window');

interface Prop
  extends NativeStackScreenProps<RootStackParams, 'DetailsScreen'> {}

export default function DetailsScreen({route}: Prop) {
  const movie = route.params;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const image = `${BASE_IMG}/w500${movie.backdrop_path}`;
  const poster = `${BASE_IMG}/w500${movie.poster_path}`;

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapIcons}>
        <Icon
          name="chevron-back-outline"
          size={26}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textDetails}>Detalles</Text>
        <Icon name="bookmark" size={23} color="#fff" />
      </View>
      {loading ? (
        <ActivityIndicator
          color="#08547a"
          size={30}
          style={styles.activityIndicator}
        />
      ) : (
        <View>
          <Image source={{uri: image}} style={styles.image} />
          <View style={styles.wrapIconStar}>
            <Icon name="star-outline" size={17} color="#ff8700" />
            <Text style={styles.numberVote}>{movie.vote_average}</Text>
          </View>
        </View>
      )}

      <View style={styles.containerPosterTitle}>
        <View style={styles.wrapPoster}>
          <Image
            source={{uri: poster}}
            style={styles.poster}
            resizeMode="cover"
          />
        </View>
        <Text numberOfLines={2} style={styles.titleMovie}>
          {movie.title}
        </Text>
      </View>
      <InfoMovieDetails id={movie.id} loading={loading} />
      <TabsDetails id={movie.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#26292f',
    flex: 1,
  },
  wrapIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  textDetails: {
    color: '#fff',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  image: {
    width: width,
    height: height * 0.29,
  },
  containerPosterTitle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  poster: {
    width: 100,
    height: 130,
    borderRadius: 10,
  },
  wrapPoster: {
    elevation: 10,
    backgroundColor: 'red',
    transform: [{translateY: -65}],
    borderRadius: 10,
  },
  titleMovie: {
    color: '#fff',
    fontFamily: 'Rubik-Bold',
    letterSpacing: 0.3,
    fontSize: 18,
    flex: 1,
    paddingLeft: 12,
    paddingTop: 12,
  },
  activityIndicator: {
    width: width,
    height: height * 0.29,
  },
  wrapIconStar: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#363740',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  numberVote: {
    color: '#ff8700',
    marginLeft: 3,
    fontFamily: 'Rubik-Bold',
    fontSize: 14,
  },
});
