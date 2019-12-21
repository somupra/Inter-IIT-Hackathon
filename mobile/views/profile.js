import React, { Component } from 'react';
import { View, StyleSheet, Image, Slider } from 'react-native';
import {
  Text,
  Content,
  Card,
  Left,
  Right,
  Body,
  Icon,
  Button,
  ListItem,
  CardItem
} from 'native-base';
import TopBar from '../components/shell/topbar';
import AppContext from '../components/utils/appContext';
import AVATAR_PIC from '../assets/cover.jpg';

const sample = {
  name: 'Some Name',
  aadhaarNum: '1234 5678 9012',
  email: 'somename@some.com',
  phoneNo: '9876543210',
  precision: 6
};

const infoFields = [
  { name: 'Name', icon: 'person', field: 'name' },
  { name: 'Email ID', icon: 'mail', field: 'email' },
  { name: 'Phone No.', icon: 'call', field: 'phoneNo' },
  { name: 'Aadhaar No.', icon: 'card', field: 'aadhaarNum' }
];

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {}, sliderVal: 0, changed: false };
  }

  saveSettings = () => {
    // Save settings here
  };

  componentDidMount = () => {
    this.setState({ profile: sample, sliderVal: sample.precision });
  };

  handleSliderChange = value => {
    this.setState({ sliderVal: value, changed: true });
  };

  render() {
    const { profile } = this.state;
    return (
      <AppContext.Consumer>
        {state => (
          <React.Fragment>
            <TopBar
              pgName="Profile"
              navigation={this.props.navigation}
            ></TopBar>
            <Content padder>
              <View style={styles.picWrapper}>
                <Image source={AVATAR_PIC} style={styles.profilePic}></Image>
              </View>
              <View style={styles.infoWrapper}>
                <Card>
                  {infoFields.map((info, i) => (
                    <ListItem icon key={i}>
                      <Left>
                        <Button style={styles.icon}>
                          <Icon name={info.icon}></Icon>
                        </Button>
                      </Left>
                      <Body>
                        <Text>{info.name}</Text>
                      </Body>
                      <Right>
                        <Text note>{profile[info.field]}</Text>
                      </Right>
                    </ListItem>
                  ))}
                  <CardItem>
                    <View>
                      <Text>Precision: </Text>
                    </View>
                  </CardItem>
                  <CardItem>
                    <Slider
                      minimumValue={0}
                      maximumValue={10}
                      value={profile.precision}
                      minimumTrackTintColor="#334393"
                      thumbTintColor="#334393"
                      onValueChange={this.handleSliderChange}
                      step={1}
                      style={styles.slider}
                    ></Slider>
                    <Text style={styles.sliderVal}>{this.state.sliderVal}</Text>
                  </CardItem>
                </Card>
                <View style={styles.btnWrap}>
                  <Left></Left>
                  <Body>
                    <Button onPress={this.saveSettings}>
                      <Text>Save settings</Text>
                    </Button>
                  </Body>
                  <Right></Right>
                </View>
              </View>
            </Content>
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    flex: 0.9
  },
  sliderVal: {
    flex: 0.1,
    textAlign: 'center',
    borderRadius: 3,
    fontWeight: '700',
    backgroundColor: '#999999',
    color: '#FFFFFF'
  },
  icon: {
    backgroundColor: '#007AFF'
  },
  picWrapper: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePic: {
    height: 200,
    width: 200,
    borderRadius: 50
  },
  infoWrapper: {
    marginTop: 60
  },
  btnWrap: {
    marginTop: 10
  }
});
