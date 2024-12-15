import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faMap, faMusic, faPen } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';

import Createdata from './Createdata';
import Listdata from './Listdata';
import Editdata from './Editdata';
import Profil from './App';

// Menggunakan file HTML lokal untuk peta
const webmap = require('./map.html');

// Screen Home
function HomeScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Createdata />
    </SafeAreaView>
  );
}

// Screen Map
function MapScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <WebView source={webmap} />
    </SafeAreaView>
  );
}

// Screen Toko Musik
function SettingsScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Listdata />
    </SafeAreaView>
  );
}

// Screen Edit
function EditdataScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Editdata />
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Profil />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
        tabBarOptions={{
          activeTintColor: '#FFB300', // Change active tab color to #FFB300 (yellow)
          inactiveTintColor: '#FFFFFF', // Optionally, set inactive color as white
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHome} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Peta"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMap} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Toko Musik"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMusic} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Edit"
          component={EditdataScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPen} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUser} color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: '#333333', // Warna abu-abu gelap
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 10, // Menurunkan posisi bottom navigation
    left: 20,
    right: 20,
    borderRadius: 30,
    elevation: 10,
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
    height: 70,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
