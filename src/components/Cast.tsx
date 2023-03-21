import React from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDetailsMovie} from '../hooks/useDetailsMovie';

type Prop = {
  id: number;
};

export default function Cast({id}: Prop) {
  const {cast, isLoading} = useDetailsMovie(id);
  const navigation = useNavigation();
  //https://api.themoviedb.org/3/person/3131/combined_credits?api_key=59fac2f751f32b407b1ccad78a44e44b&language=es-ES

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator color="#08547a" size={30} />
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {cast.map((item, index) => {
          const image = `https://image.tmdb.org/t/p/w500/${item.profile_path}`;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate('InfoActorScreen', item),
                )
              }>
              {item.profile_path && (
                <View>
                  <Image
                    source={{uri: image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={3} style={styles.name}>
                    {item.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 5,
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  name: {
    color: '#e3e4e5',
    width: 90,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Rubik-SemiBold',
    fontSize: 12,
  },
  containerLoading: {
    marginTop: 30,
  },
});
