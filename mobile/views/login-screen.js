import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Content, Text, Item, Icon, Input, Button } from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fetchData, setKey, toast } from '../components/utils/storage';
import { NavigationEvents } from 'react-navigation';
// import Axios from 'axios';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'signin', title: 'Sign In' },
        { key: 'signup', title: 'Sign Up' }
      ]
    };
  }

  setRef = (ref, field) => {
    this['_' + field] = ref;
  };

  handleSignIn = async () => {
    // Sign in
    const username = this._in_username.wrappedInstance._lastNativeText;
    const password = this._in_password.wrappedInstance._lastNativeText;
    const res = await fetchData(
      'POST',
      '/auth/login/',
      { username, password },
      true
    );
    const data = await res.json();
    await setKey(data.key);
    this.props.navigation.navigate('MainApp');
  };

  handleSignUp = async () => {
    // Sign up
    const username = this._up_username.wrappedInstance._lastNativeText;
    console.log(username);
    const email = this._up_email.wrappedInstance._lastNativeText;
    const password1 = this._up_password1.wrappedInstance._lastNativeText;
    const password2 = this._up_password2.wrappedInstance._lastNativeText;
    const data = {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    };
    const res = await fetchData('POST', '/auth/registration/', data, true);
    const resdata = await res.json();
    console.log(resdata);
    await setKey(resdata.key);
    this.props.navigation.navigate('MainApp');
    // Axios.post('http://192.168.43.46:8000/auth/registration/', {username})
  };

  renderSigninPage = () => {
    return (
      <View style={styles.logWrap}>
        <Item>
          <Icon active name="person" />
          <Input
            placeholder="Username"
            ref={ref => this.setRef(ref, 'in_username')}
          />
        </Item>
        <Item>
          <Icon active name="key" />
          <Input
            placeholder="Password"
            ref={ref => this.setRef(ref, 'in_password')}
          />
        </Item>
        <Button block onPress={this.handleSignIn} style={styles.btn}>
          <Text>Sign in</Text>
        </Button>
      </View>
    );
  };

  renderSignupPage = () => {
    return (
      <View style={styles.logWrap}>
        <Item>
          <Icon active name="person" />
          <Input
            placeholder="Username"
            style={styles.input}
            ref={ref => this.setRef(ref, 'up_username')}
          />
        </Item>
        <Item>
          <Icon active name="mail" />
          <Input
            placeholder="Email ID"
            style={styles.input}
            ref={ref => this.setRef(ref, 'up_email')}
          />
        </Item>
        <Item>
          <Icon active name="key" />
          <Input
            secureTextEntry
            placeholder="Password"
            style={styles.input}
            ref={ref => this.setRef(ref, 'up_password1')}
          />
        </Item>
        <Item>
          <Icon active name="key" />
          <Input
            secureTextEntry
            placeholder="Confirm password"
            style={styles.input}
            ref={ref => this.setRef(ref, 'up_password2')}
          />
        </Item>
        <Button block onPress={this.handleSignUp} style={styles.btn}>
          <Text>Sign up</Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Content contentContainerStyle={styles.container}>
          <View style={styles.logoWrap}>
            <Text h1 style={styles.logoText}>
              SRLMS
            </Text>
          </View>
          <View style={styles.logboxWrap}>
            <View style={styles.logbox}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                  signin: this.renderSigninPage,
                  signup: this.renderSignupPage
                })}
                onIndexChange={index => this.setState({ index })}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    style={styles.tabBar}
                    indicatorStyle={{
                      backgroundColor: '#fff',
                      width: '35%',
                      marginLeft: '2%',
                      marginRight: '2%'
                    }}
                  ></TabBar>
                )}
              />
            </View>
          </View>
        </Content>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0083cf'
  },
  btn: {
    // alignSelf: 'flex-end'
  },
  logoText: {
    backgroundColor: '#004c78',
    padding: 20,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 60,
    color: '#fff'
  },
  logboxWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  logbox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '80%',
    height: 400,
    overflow: 'hidden'
  },
  logWrap: {
    padding: 15,
    flex: 1,
    flexDirection: 'column'
  },
  tabBar: {
    backgroundColor: '#004c78',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20
  }
});
