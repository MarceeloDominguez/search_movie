import React, {useRef, useEffect, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSearchMovie} from '../hooks/useSearchMovie';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

const BASE_IMG = 'https://image.tmdb.org/t/p';

export default function SearchScreen() {
  const navigation = useNavigation();
  const textInputRef = useRef<React.ElementRef<typeof TextInput> | null>(null);

  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue(textValue);
  const {movieResults, loading} = useSearchMovie(debouncedValue);

  useEffect(() => {
    if (textInputRef.current) {
      const unsubscribe = navigation.addListener('focus', () => {
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 100);
      });

      return unsubscribe;
    }
  }, [navigation, textInputRef.current]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapInput}>
        <TextInput
          placeholder="Buscar película..."
          style={styles.input}
          placeholderTextColor="#64666b"
          ref={textInputRef}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search" size={24} style={styles.iconSearch} />
      </View>
      <View>
        {movieResults.map((item, index) => {
          const poster = `${BASE_IMG}/w500${item?.poster_path}`;

          return (
            <View key={index}>
              {item.poster_path && (
                <>
                  {loading ? (
                    <ActivityIndicator
                      color="#08547a"
                      size={30}
                      style={[styles.containerItem, {height: 110}]}
                    />
                  ) : (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.containerItem}
                      onPress={() =>
                        navigation.dispatch(
                          CommonActions.navigate('DetailsScreen', item),
                        )
                      }>
                      <Image
                        source={{uri: poster}}
                        style={styles.image}
                        resizeMode="contain"
                      />
                      <View style={{flex: 1}}>
                        <Text numberOfLines={2} style={styles.title}>
                          {item.title}
                        </Text>
                        <Text numberOfLines={4} style={styles.overview}>
                          {item.overview ? item.overview : 'No hay descripcion'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#26292f',
    flex: 1,
  },
  wrapInput: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#3a3f47',
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    letterSpacing: 0.4,
    fontFamily: 'Rubik-Medium',
    color: '#fff',
  },
  iconSearch: {
    color: '#64666b',
    position: 'absolute',
    bottom: 13,
    right: 40,
    transform: [{rotate: '90deg'}],
  },
  containerItem: {
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  image: {
    width: 110,
    height: 160,
    borderRadius: 10,
    marginRight: 14,
  },
  title: {
    color: '#e3e4e5',
    fontFamily: 'Rubik-SemiBold',
    letterSpacing: 0.4,
    fontSize: 16,
    marginBottom: 8,
  },
  overview: {
    color: '#e3e4e5',
    fontFamily: 'Rubik-Regular',
    letterSpacing: 0.3,
    lineHeight: 19,
    fontSize: 13,
  },
});
