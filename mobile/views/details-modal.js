import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Content,
  Form,
  Textarea,
  Grid,
  Col,
  Text,
  Button,
  Spinner
} from 'native-base';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import TopBar from './stack-topbar';

import MapView, { Marker } from 'react-native-maps';

const defaultImageURI =
  'https://yourstrulyindia.com/wp-content/uploads/2019/06/placeholder.jpg';

export default class DetailsModalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionGranted: false,
      location: null,
      image: null
    };
  }

  async componentDidMount() {
    this.sub = this.props.navigation.addListener('didFocus', this.setImage);
    await this.askPermissions();
    await this.getLocation();
  }

  async componentWillUnmount() {
    this.sub.remove();
  }

  setMapRef = ref => {
    this._map = ref;
  };

  setImage = () => {
    const image = this.props.navigation.getParam('image');
    if (image && image !== this.state.image) this.setState({ image });
  };

  setMapPitch = () => {
    this._map.animateToViewingAngle(80, 0);
  };

  askPermissions = async () => {
    const locationPerm = await Permissions.askAsync(Permissions.LOCATION);
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    if (locationPerm.status === 'granted' && cameraPerm.status === 'granted')
      this.setState({ permissionGranted: true });
  };

  submitPost = () => {
    const description = this._textarea.wrappedInstance._lastNativeText;
    // Submit the post here
    this.props.navigation.navigate('Home');
  };

  getLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    this.setState({ location });
  };

  setTextAreaRef = ref => {
    this._textarea = ref;
  };

  goToCamera = () => {
    this.props.navigation.navigate('CameraScreen');
  };

  renderSubmitButton = () => {
    if (!this.state.image)
      return (
        <Button bordered disabled block>
          <Text>Image is required</Text>
        </Button>
      );
    if (!this._textarea)
      return (
        <Button bordered disabled block>
          <Text>Description is required</Text>
        </Button>
      );
    return (
      <Button block onPress={this.submitPost}>
        <Text>Submit</Text>
      </Button>
    );
  };

  renderNoPermissions() {
    return (
      <View style={styles.noPermissions}>
        <Text style={{ textAlign: 'center', padding: 20, color: '#777' }}>
          Location and camera permissions are required for this feature.
        </Text>
        <View style={{ justifyContent: 'center' }}>
          <Button bordered onPress={this.askPermissions}>
            <Text>Allow access</Text>
          </Button>
        </View>
      </View>
    );
  }

  renderScreen() {
    const { navigation } = this.props;
    const { width, height } = Dimensions.get('window');
    const image = navigation.getParam('image');
    const imageURI = image ? image.uri : defaultImageURI;
    const { location } = this.state;
    return (
      <React.Fragment>
        <Grid>
          <Col style={styles.col}>
            <View style={styles.textWrap}>
              <Textarea
                rowSpan={11}
                bordered
                placeholder="Enter a description... "
                style={styles.textBox}
                ref={this.setTextAreaRef}
              ></Textarea>
            </View>
          </Col>
          <Col style={styles.col}>
            <TouchableOpacity onPress={this.goToCamera}>
              <View
                style={image ? styles.imageWrapper : styles.imageWrapBordered}
              >
                <Image source={{ uri: imageURI }} style={styles.image}></Image>
              </View>
            </TouchableOpacity>
          </Col>
        </Grid>
        <View style={styles.mapWrapper}>
          {location ? (
            <MapView
              ref={this.setMapRef}
              onMapReady={this.setMapPitch}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421
              }}
              initialCamera={{
                pitch: 45,
                heading: 0,
                tilt: 45,
                altitude: 50,
                zoom: 20
              }}
              style={{ height: 300, width: '100%', flex: 1 }}
            >
              <Marker
                coordinate={location.coords}
                title={'SomeTitle'}
                description={'SomeDescription'}
              />
            </MapView>
          ) : (
            <Spinner color="blue"></Spinner>
          )}
        </View>
        <View style={styles.btnWrapper}>{this.renderSubmitButton()}</View>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <TopBar
          pgName="Create New Complaint"
          navigation={this.props.navigation}
          modal
        ></TopBar>
        <Content padder>
          {this.state.permissionGranted
            ? this.renderScreen()
            : this.renderNoPermissions()}
        </Content>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    height: 300
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  imageWrapper: {
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrapBordered: {
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#DDDDDD',
    borderWidth: 5,
    borderRadius: 10,
    borderStyle: 'dashed'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30
  },
  imageBordered: {
    width: '100%',
    height: '100%'
  },
  textWrap: {
    margin: 5
  },
  textBox: {
    borderRadius: 5,
    padding: 10
  },
  mapWrapper: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#aaa',
    borderRadius: 10,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 1
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  }
});
