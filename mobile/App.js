import React, { Component } from 'react';
import { Container, Root, Toast } from 'native-base';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AppContext from './components/utils/appContext';
import { AppLoading } from 'expo';
import axios from 'axios';
import LoginScreen from './views/login-screen';
import AppNavigator from './views/main-nav';

const _loadFonts = () => {
  return Font.loadAsync({
    Roboto: Roboto,
    Roboto_medium: RobotoMedium
  });
};

const _loadAssets = () => {
  return Asset.loadAsync([
    require('./assets/cover.jpg'),
    require('./assets/profile-pic.png')
  ]);
};

const MainNavigator = createStackNavigator(
  { LoginScreen: { screen: LoginScreen }, MainApp: { screen: AppNavigator } },
  {
    initialRouteName: 'MainApp',
    headerMode: 'none'
  }
);

const prevGetStateForAction = MainNavigator.router.getStateForAction;

MainNavigator.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Home
  if (
    action.type === 'Navigation/BACK' &&
    state &&
    state.routes[state.index].routeName === 'MainApp'
  ) {
    return null;
  }

  // Do not allow to go back to Login
  if (action.type === 'Navigation/BACK' && state) {
    const newRoutes = state.routes.filter(r => r.routeName !== 'LoginScreen');
    const newIndex = newRoutes.length - 1;
    return prevGetStateForAction(action, {
      index: newIndex,
      routes: newRoutes
    });
  }
  return prevGetStateForAction(action, state);
};

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  state = {
    loggedIn: false,
    details: {},
    appIsReady: false
  };

  componentWillMount = () => {
    Promise.all([_loadAssets(), _loadFonts()])
      .then(() => this.setState({ appIsReady: true }))
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.appIsReady) return <AppLoading />;
    else {
      return (
        <Root>
          <Container>
            <AppContext.Provider
              value={{
                state: { ...this.state },
                log: this.handleLog,
                appNavig: AppNavigator
              }}
            >
              <AppContainer />
            </AppContext.Provider>
          </Container>
        </Root>
      );
    }
  }
}

export default App;
