import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import SearchMovie from '../components/SearchMovie';
import MovieCardGrid from '../components/MovieCardGrid';
import {useMovies} from '../hooks/useMovies';
import {CommonActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/Navigation';
import Loading from '../components/Loading';

const tabs = ['Próximas', 'Top Ranking', 'Populares'];

const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width * 0.4;
const ITEM_HEIGHT = height * 0.3;

const BASE_IMG = 'https://image.tmdb.org/t/p';

interface Prop extends NativeStackScreenProps<RootStackParams> {}

export default function HomeScreen({navigation}: Prop) {
  const [indexTab, setIndexTab] = useState(0);
  const {nowPlaying, upcoming, topRated, popular, isLoading} = useMovies();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#26292f" />
      <View>
        <SearchMovie />
        <FlatList
          data={nowPlaying.slice(0, 10)}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 16}}
          renderItem={({item, index}) => {
            const poster = `${BASE_IMG}/w500${item.poster_path}`;

            return (
              <TouchableOpacity
                style={styles.containerPoster}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.dispatch(
                    CommonActions.navigate('DetailsScreen', item),
                  )
                }>
                <View style={styles.wrapPoster}>
                  <Image
                    source={{uri: poster}}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.numberPoster}>{index + 1}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.containerTabs}>
          {tabs.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => setIndexTab(index)}
                style={styles.wrapTabs}>
                <Text style={styles.tab}>{item}</Text>
                <View
                  style={[
                    styles.lineTabs,
                    {
                      backgroundColor: indexTab === index ? '#3a3f47' : null!,
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>

        {indexTab === 0 && <MovieCardGrid movies={upcoming} />}
        {indexTab === 1 && <MovieCardGrid movies={topRated} />}
        {indexTab === 2 && <MovieCardGrid movies={popular} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#26292f',
    flex: 1,
  },
  containerPoster: {
    marginHorizontal: 20,
  },
  wrapPoster: {
    elevation: 8,
    borderRadius: 12,
  },
  poster: {
    borderRadius: 12,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  containerTabs: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  wrapTabs: {
    width: width / 3 - 5,
    alignItems: 'center',
  },
  lineTabs: {
    width: '70%',
    height: 6,
    marginTop: 10,
    marginBottom: 16,
  },
  tab: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0.2,
    fontFamily: 'Rubik-Medium',
  },
  numberPoster: {
    color: '#08547a',
    position: 'absolute',
    bottom: -35,
    left: -14,
    fontSize: 80,
    fontFamily: 'Rubik-Regular',
  },
});
