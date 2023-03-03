import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useDetailsMovie} from '../hooks/useDetailsMovie';
import Cast from './Cast';
import MovieDescriptions from './MovieDescriptions';
import Reviews from './Reviews';

const {width} = Dimensions.get('window');

const tabs = ['Descripción', 'Reviews', 'Actores'];

type Prop = {
  id: number;
};

export default function TabsDetails({id}: Prop) {
  const [indexTab, setIndexTab] = useState(0);
  const {movieFull, isLoading} = useDetailsMovie(id);

  return (
    <View>
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
      {indexTab === 0 && (
        <MovieDescriptions
          description={movieFull?.overview}
          isLoading={isLoading}
        />
      )}
      {indexTab === 1 && <Reviews id={id} />}
      {indexTab === 2 && <Cast id={id} />}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
