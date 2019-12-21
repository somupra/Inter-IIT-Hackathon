import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Platform
} from 'react-native';
import { Content, Spinner } from 'native-base';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
// import GalleryScreen from './GalleryScreen';
import isIPhoneX from 'react-native-is-iphonex';

import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off'
};

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
};

const wbIcons = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'beach-access',
  fluorescent: 'wb-iridescent',
  incandescent: 'wb-incandescent'
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    // ratio: '16:9',
    // ratios: [],
    newPhotos: false,
    permissionsGranted: false,
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    showGallery: false,
    showMoreOptions: false,
    imgLoading: false
  };

  async askForPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  async componentWillMount() {
    await this.askForPermission();
  }

  toggleView = () =>
    this.setState({ showGallery: !this.state.showGallery, newPhotos: false });

  toggleMoreOptions = () =>
    this.setState({ showMoreOptions: !this.state.showMoreOptions });

  toggleFlash = () =>
    this.setState({ flash: flashModeOrder[this.state.flash] });

  zoomOut = () =>
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1
    });

  zoomIn = () =>
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1
    });

  setFocusDepth = depth => this.setState({ depth });

  takePicture = () => {
    if (this.camera) {
      this.setState({ imgLoading: true });
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  handleMountError = ({ message }) => console.error(message);

  onPictureSaved = async photo => {
    this.setState({ newPhotos: true, imgLoading: false });
    this.props.navigation.navigate('DetailsScreen', { image: photo });
  };

  renderNoPermissions = () => (
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );

  renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity
        style={styles.toggleButtonLeft}
        onPress={this.toggleFlash}
      >
        <MaterialIcons
          name={flashIcons[this.state.flash]}
          size={32}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toggleButtonRight}
        onPress={this.toggleFocus}
      >
        <Text
          style={[
            styles.autoFocusLabel,
            { color: this.state.autoFocus === 'on' ? 'white' : '#6b6b6b' }
          ]}
        >
          AF
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this.takePicture}
          style={{ alignSelf: 'center' }}
        >
          {this.state.imgLoading ? (
            <Spinner color="#FFFFFF" />
          ) : (
            <Ionicons name="ios-radio-button-on" size={70} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  renderMoreOptions = () => (
    <View style={styles.options}>
      <View style={styles.detectors}>
        <TouchableOpacity onPress={this.toggleFaceDetection}>
          <MaterialIcons
            name="tag-faces"
            size={32}
            color={this.state.faceDetecting ? 'white' : '#858585'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleBarcodeScanning}>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={32}
            color={this.state.barcodeScanning ? 'white' : '#858585'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.pictureSizeContainer}>
        <Text style={styles.pictureQualityLabel}>Picture quality</Text>
        <View style={styles.pictureSizeChooser}>
          <TouchableOpacity
            onPress={this.previousPictureSize}
            style={{ padding: 6 }}
          >
            <Ionicons name="md-arrow-dropleft" size={14} color="white" />
          </TouchableOpacity>
          <View style={styles.pictureSizeLabel}>
            <Text style={{ color: 'white' }}>{this.state.pictureSize}</Text>
          </View>
          <TouchableOpacity
            onPress={this.nextPictureSize}
            style={{ padding: 6 }}
          >
            <Ionicons name="md-arrow-dropright" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  renderCamera = () => (
    <View style={{ flex: 1 }}>
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        onMountError={this.handleMountError}
      >
        {this.renderTopBar()}
        {this.renderBottomBar()}
      </Camera>
      {this.state.showMoreOptions && this.renderMoreOptions()}
    </View>
  );

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    return <View style={styles.container}>{cameraScreenContent}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between'
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight / 2
  },
  bottomBar: {
    paddingBottom: isIPhoneX ? 25 : 5,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    alignItems: 'center',
    flex: 0.12,
    flexDirection: 'row'
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  toggleButtonLeft: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'flex-start'
  },
  toggleButtonRight: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'flex-end'
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bottomButton: {
    flex: 0.3,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center'
  },
  options: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10
  },
  row: {
    flexDirection: 'row'
  }
});
