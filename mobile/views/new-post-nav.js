import { createStackNavigator } from 'react-navigation';
import CameraScreen from './camera';
import DetailsScreen from './details';

const pages = {
  CameraScreen: { screen: CameraScreen },
  DetailsScreen: { screen: DetailsScreen }
};

const NewPostNavigator = createStackNavigator(pages, {
  initialRouteName: 'DetailsScreen',
  headerMode: 'none'
});

export default NewPostNavigator;
