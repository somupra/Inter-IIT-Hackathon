import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import AppContext from '../components/utils/appContext';
import Sidebar from '../components/shell/sidebar';
// import CameraScreen from './camera';
import ProfileScreen from './profile';
import { AppLoading } from 'expo';
import axios from 'axios';
import HomeScreen from './home';
import NewPostNavigator from './new-post-nav';
import RunNavigator from './run-nav';
import CameraScreen from './camera';
import DetailsScreen from './details';
import DetailsModalScreen from './details-modal';

const pages = {
  Home: { screen: HomeScreen },
  NewPost: { screen: NewPostNavigator },
  Run: { screen: RunNavigator },
  Profile: { screen: ProfileScreen }
};

const ExtendModalNavigator = createStackNavigator(
  {
    CameraScreen: { screen: CameraScreen },
    DetailsScreen: { screen: DetailsModalScreen }
  },
  {
    initialRouteName: 'DetailsScreen',
    headerMode: 'none',
    mode: 'modal'
  }
);

const Drawer = createDrawerNavigator(pages, {
  initialRouteName: 'Home',
  contentOptions: {
    activeTintColor: '#e91e63'
  },
  contentComponent: props => <Sidebar {...props} />
});

const AppNavigator = createStackNavigator(
  {
    ...pages,
    Drawer: { screen: Drawer },
    ExtendApp: { screen: ExtendModalNavigator }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

export default AppNavigator;
