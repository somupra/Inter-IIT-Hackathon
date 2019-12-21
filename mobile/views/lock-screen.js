import React, { Component } from 'react';
import { Content, Text, Button, Spinner } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';

// ~~~~~~~~~~~~~~~~~

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function getDistance(coords1, coords2) {
  const lat1 = coords1.latitude;
  const lat2 = coords2.latitude;
  const lon1 = coords1.longitude;
  const lon2 = coords2.longitude;

  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

// ~~~~~~~~~~~~~~~~~

const modes = ['Loading', 'Journey', 'Success', 'Failure'];

class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      motionAv: false,
      location: null,
      updates: [],
      mode: 'Loading'
    };
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.LOCATION);
    const currLoc = await Location.getCurrentPositionAsync();
    const location = this.props.navigation.getParam('location');
    this.setState({ motionAv: true, location, mode: 'Failure' });
    const dist = getDistance(currLoc.coords, location);
    const eta = (dist / 5) * 60 * 60 * 1000;
    this._timeout = setTimeout(this.checkFinalLocation, eta);
  }

  checkFinalLocation = async () => {
    const currLoc = await Location.getCurrentPositionAsync();
    const dist = getDistance(currLoc, this.state.location);
    if (dist < 0.1) this.endJourney(true);
    else this.endJourney(false);
  };

  endJourney = success => {
    if (!success) {
      // Failure
      this.setState({ mode: 'Failure' });
    } else {
      // Success
      this.setState({ mode: 'Success' });
      // Send request
    }
  };

  motionUpdateHandler = location => {
    const acc = location.acceleration;
    this.state.updates.push(acc);

    const currLoc = Location.getCurrentPositionAsync();
    const dist = getDistance(currLoc, this.state.location);
    if (dist < 0.1) this.endJourney(true);
  };

  renderJourney = () => {
    const { navigation } = this.props;
    return (
      <Content contentContainerStyle={[styles.screen, styles.journey]}>
        <View style={styles.txtWrap}>
          <Text style={styles.text}>On your way!</Text>
        </View>
        <View style={styles.btnWrap}>
          <Button
            style={styles.btn}
            bordered
            light
            onPress={() => navigation.navigate('nearbySitesScreen')}
          >
            <Text>Abort the session</Text>
          </Button>
        </View>
      </Content>
    );
  };

  renderSuccess = () => {
    const { navigation } = this.props;
    return (
      <Content contentContainerStyle={[styles.screen, styles.success]}>
        <View style={styles.txtWrap}>
          <Text style={styles.text}>You completed the journey!</Text>
        </View>
        <View style={styles.txtWrap}>
          <Text style={styles.text}>You got</Text>
        </View>
        <View>
          <Text style={[styles.points, { textAlign: 'center' }]}>80</Text>
        </View>
        <View style={styles.txtWrap}>
          <Text style={styles.text}>points!</Text>
        </View>
        <View style={styles.btnWrap}>
          <Button
            style={styles.btn}
            bordered
            light
            onPress={() => navigation.navigate('tncScreen')}
          >
            <Text>Done</Text>
          </Button>
        </View>
      </Content>
    );
  };

  renderFailure = () => {
    const { navigation } = this.props;
    return (
      <Content contentContainerStyle={[styles.screen, styles.failure]}>
        <View style={styles.txtWrap}>
          <Text style={styles.text}>You ran out of time!</Text>
        </View>
        <View style={styles.btnWrap}>
          <Button
            style={styles.btn}
            bordered
            light
            onPress={() => navigation.navigate('tncScreen')}
          >
            <Text>Go Back</Text>
          </Button>
        </View>
      </Content>
    );
  };

  renderLoading = () => {
    const { navigation } = this.props;
    return (
      <Content contentContainerStyle={styles.screen}>
        <Spinner color="blue"></Spinner>
      </Content>
    );
  };

  render() {
    const { mode } = this.state;
    if (mode === 'Journey') return this.renderJourney();
    if (mode === 'Success') return this.renderSuccess();
    if (mode === 'Failure') return this.renderFailure();
    else return this.renderLoading();
  }
}

export default LockScreen;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00a2ff'
  },
  text: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    fontSize: 30
  },
  btn: {
    marginTop: 20,
    color: '#fff',
    borderWidth: 2
  },
  failure: {
    backgroundColor: '#555'
  },
  success: {
    backgroundColor: '#00ab09'
  },
  points: {
    fontSize: 50,
    fontWeight: '900',
    color: '#fff'
  }
});
