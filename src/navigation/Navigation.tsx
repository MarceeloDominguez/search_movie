import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Movie} from '../interfaces/movieInterfaces';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';

export type RootStackParams = {
  Tabs: undefined;
  DetailsScreen: Movie;
};

const Stack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();

const tabs = [
  {name: 'HomeScreen', icon: 'home', component: HomeScreen, label: 'Inicio'},
  {
    name: 'SearchScreen',
    icon: 'search',
    component: SearchScreen,
    label: 'Buscar',
  },
  {
    name: 'WatchListScreen',
    icon: 'bookmark-outline',
    component: WatchListScreen,
    label: 'Mi lista',
  },
];

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      {tabs.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={styles.containerItemTab}>
                    <Icon
                      name={item.icon}
                      size={25}
                      color={focused ? '#0296e5' : '#3a3f47'}
                    />
                    <Text
                      style={[
                        styles.label,
                        {color: focused ? '#0296e5' : '#3a3f47'},
                      ]}>
                      {item.label}
                    </Text>
                  </View>
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{animation: 'none'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#26292f',
    height: 65,
    borderTopWidth: 1.5,
    borderTopColor: '#0296e5',
  },
  containerItemTab: {
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Rubik-Bold',
    fontSize: 14,
  },
});
