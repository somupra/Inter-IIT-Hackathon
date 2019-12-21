import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Content, Text, Button } from 'native-base';
import TopBar from '../components/shell/topbar';

const tnc = 'Some tnc 1\n Some tnc 2\n Sometnc3\n';

class tncScreen extends Component {
  state = {};
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <TopBar pgName="Run and Earn" navigation={navigation}></TopBar>
        <Content padder>
          <View style={styles.tncWrapper}>
            <Text style={styles.tnc}>{tnc}</Text>
          </View>
          <View>
            <Button
              block
              onPress={() => navigation.navigate('nearbySitesScreen')}
            >
              <Text>Lock and Run</Text>
            </Button>
          </View>
        </Content>
      </React.Fragment>
    );
  }
}

export default tncScreen;

const styles = StyleSheet.create({
  tncWrapper: {
    marginVertical: 20,
    justifyContent: 'center'
  },
  tnc: {
    textAlign: 'center',
    padding: 30,
    backgroundColor: '#eee',
    borderRadius: 20,
    color: '#666'
  }
});
