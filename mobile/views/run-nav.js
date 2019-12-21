import { createStackNavigator } from 'react-navigation';
import NewPost from './new-post-nav';
import LockScreen from './lock-screen';
import tncScreen from './tnc-screen';
import NearbySitesScreen from './nearby-sites';

const pages = {
  tncScreen: { screen: tncScreen },
  nearbySitesScreen: { screen: NearbySitesScreen },
  lockScreen: { screen: LockScreen }
  // postScreen: {screen: }
};

const RunNavigator = createStackNavigator(pages, {
  initialRouteName: 'nearbySitesScreen',
  headerMode: 'none'
});

const prevGetStateForAction = RunNavigator.router.getStateForAction;

RunNavigator.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Home
  if (
    action.type === 'Navigation/BACK' &&
    state &&
    state.routes[state.index].routeName === 'lockScreen'
  ) {
    return null;
  }

  return prevGetStateForAction(action, state);
};

export default RunNavigator;
