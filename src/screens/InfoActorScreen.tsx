import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {RootStackParams} from '../navigation/Navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MoviesActor from '../components/MoviesActor';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

interface Prop
  extends NativeStackScreenProps<RootStackParams, 'InfoActorScreen'> {}

export default function InfoActorScreen({route}: Prop) {
  const actor = route.params;
  const image = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{marginVertical: 20, marginLeft: 16}}>
        <Icon
          name="chevron-back-outline"
          size={25}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.wrapImageName}>
        <Image source={{uri: image}} style={styles.imageProfile} />
        <View style={{flex: 1}}>
          <Text style={styles.label}>Nombre original:</Text>
          <Text style={styles.name} numberOfLines={2}>
            {actor.name}
          </Text>
          <Text style={styles.label}>Personaje:</Text>
          <Text style={styles.name} numberOfLines={2}>
            {actor.character}
          </Text>
        </View>
      </View>
      <MoviesActor id={actor.id} nameActor={actor.name} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26292f',
  },
  imageProfile: {
    width: width * 0.43,
    height: height * 0.35,
    borderRadius: 10,
    marginRight: 12,
  },
  wrapImageName: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    color: '#e3e4e5',
    fontFamily: 'Rubik-Regular',
    marginBottom: 8,
    fontStyle: 'italic',
    letterSpacing: 0.4,
  },
  name: {
    color: '#e3e4e5',
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
    marginBottom: 25,
    letterSpacing: 0.4,
  },
});
