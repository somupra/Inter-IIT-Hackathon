import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Button, Text, Spinner } from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import constrIcon from '../assets/constrIcon.png';
import { render } from 'react-dom';
import TopBar from './stack-topbar';

const sample = {
  coords: {
    latitude: 29.8650788,
    longitude: 77.8939276
  },
  title: 'Some Title',
  description: 'Some description'
};

class NearbySitesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { sites: [], location: null, selected: null };
  }

  renderCurrentMarker = () => {
    const { location } = this.state;
    if (!location) return;
    return (
      <Marker
        coordinate={location.coords}
        identifier={(-1).toString()}
        title="You are here"
      />
    );
  };

  async componentDidMount() {
    const location = await Location.getCurrentPositionAsync();
    this.setState({ location, sites: [sample] });
    console.log(location);
  }

  setMapRef = ref => {
    this._map = ref;
  };

  setMapPitch = () => {
    this._map.animateToViewingAngle(80);
  };

  siteTapHandler = e => {
    const { coords, idS } = e.nativeEvent;
    const id = parseInt(idS);
    if (id === -1) return;
    const site = this.state.sites[e.nativeEvent];
    this.setState({ selected: site });
    console.log(e.nativeEvent);
  };

  renderMarker(site, i) {
    return (
      <Marker
        key={i}
        identifier={i.toString()}
        coordinate={site.coords}
        image={constrIcon}
        title={site.title}
        description={site.description}
        onPress={this.siteTapHandler}
        onCalloutPress={this.siteTapHandler}
      />
    );
  }

  renderButton = () => {
    const { selected } = this.state;
    const { navigation } = this.props;
    if (!selected) {
      return (
        <Button
          block
          onPress={() =>
            navigation.navigate('lockScreen', { location: selected })
          }
        >
          <Text>Start walking</Text>
        </Button>
      );
    } else {
      return (
        <Button bordered disabled block>
          <Text>Select a construction site</Text>
        </Button>
      );
    }
  };

  renderContent() {
    const { location, sites } = this.state;
    const { navigation } = this.props;
    return location ? (
      <Content padder>
        <View style={styles.mapWrap}>
          <MapView
            ref={this.setMapRef}
            onMapReady={this.setMapPitch}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
            }}
            style={{ height: 500, width: '100%', flex: 1 }}
          >
            {this.renderCurrentMarker()}
            {sites.map(this.renderMarker)}
          </MapView>
        </View>
        <View style={styles.text}>{this.renderButton()}</View>
      </Content>
    ) : (
      <Spinner></Spinner>
    );
  }

  render() {
    return (
      <React.Fragment>
        <TopBar
          pgName="Select a Site"
          navigation={this.props.navigation}
        ></TopBar>
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

export default NearbySitesScreen;

const styles = StyleSheet.create({
  mapWrap: {
    borderWidth: 1,
    borderColor: '#aaa'
  },
  text: {
    marginTop: 10,
    justifyContent: 'center'
  }
});
