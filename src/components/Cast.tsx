import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDetailsMovie} from '../hooks/useDetailsMovie';

type Prop = {
  id: number;
};

export default function Cast({id}: Prop) {
  const {cast, isLoading} = useDetailsMovie(id);

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
            <View key={index}>
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
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 5,
    marginTop: 20,
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
