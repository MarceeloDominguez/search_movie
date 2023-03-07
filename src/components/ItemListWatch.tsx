import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDetailsMovie} from '../hooks/useDetailsMovie';

type Prop = {
  id: number | undefined;
};

export default function ItemListWatch({id}: Prop) {
  const {movieFull, isLoading} = useDetailsMovie(id!);

  if (isLoading) {
    return <ActivityIndicator color="#08547a" size={20} />;
  }

  return (
    <>
      <View style={styles.wrapIconInfo}>
        <Icon name="star-outline" size={17} color="#ff8700" />
        <Text style={styles.vote}>
          {movieFull?.vote_average?.toLocaleString().slice(0, 3)}
        </Text>
      </View>
      <View style={styles.wrapIconInfo}>
        <Icon name="list-outline" size={17} color="#92929d" />
        {movieFull?.genres?.slice(0, 1).map(item => {
          return (
            <Text key={item.id} style={styles.text}>
              {item.name}
            </Text>
          );
        })}
      </View>
      <View style={styles.wrapIconInfo}>
        <Icon name="browsers-outline" size={17} color="#92929d" />
        <Text style={styles.text}>{movieFull?.release_date?.slice(0, 4)}</Text>
      </View>
      <View style={styles.wrapIconInfo}>
        <Icon name="alarm-outline" size={18} color="#92929d" />
        <Text style={styles.text}>{movieFull?.runtime} Minutos</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapIconInfo: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 5,
  },
  vote: {
    color: '#ff8700',
    fontFamily: 'Rubik-SemiBold',
    fontSize: 13,
  },
  text: {
    color: '#e3e4e5',
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.3,
    fontSize: 13,
  },
});
