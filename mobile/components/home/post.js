import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon
} from 'native-base';

export default class Post extends Component {
  render() {
    const post = this.props.post;
    return (
      <View>
        <Card style={{ flex: 0 }}>
          <CardItem bordered>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://www.vacul.org/extension/site/design/site/images/anonymous-user.png'
                }}
              />
              <Body>
                <Text>{post.name}</Text>
                <Text note>{post.location}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={styles.mapWrapper} bordered>
            <Body>
              <MapView
                region={{
                  latitude: post.coords.latitude,
                  longitude: post.coords.longitude,
                  latitudeDelta: 0.000922 / 2,
                  longitudeDelta: 0.000421 / 2
                }}
                liteMode
                style={{ height: 230, width: '100%', flex: 1 }}
              >
                <Marker
                  coordinate={post.coords}
                  title={'SomeTitle'}
                  description={'SomeDescription'}
                />
              </MapView>
            </Body>
          </CardItem>
          <CardItem style={styles.mapWrapper} bordered>
            <Body>
              <Image
                source={{ uri: post.imageUri }}
                style={{ height: 230, width: '100%', flex: 1 }}
              ></Image>
              {/* <MapView
                region={{
                  latitude: post.coords.latitude,
                  longitude: post.coords.longitude,
                  latitudeDelta: 0.000922 / 2,
                  longitudeDelta: 0.000421 / 2
                }}
                liteMode
                style={{ height: 170, width: '100%', flex: 1 }}
              >
                <Marker
                  coordinate={post.coords}
                  title={'SomeTitle'}
                  description={'SomeDescription'}
                />
              </MapView> */}
            </Body>
          </CardItem>
          <CardItem style={styles.metaWrap} bordered>
            <Left>
              <Button transparent>
                <Icon style={styles.voteIcon} name="arrow-dropup" />
                <Text note>{post.upvotes}</Text>
              </Button>
              <Button transparent>
                <Icon style={styles.voteIcon} name="arrow-dropdown" />
                <Text note>{post.downvotes}</Text>
              </Button>
            </Left>
            <Body></Body>
            <Right>
              <TouchableOpacity
                onPress={() => {
                  console.log('Modal called', this.props.nav);
                  this.props.nav.navigate('ExtendApp');
                }}
              >
                <Text style={styles.extendedApp}>Extended Application</Text>
              </TouchableOpacity>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text note>{post.description}</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapWrapper: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0
  },
  metaWrap: {
    paddingTop: 10,
    paddingBottom: 10
  },
  voteIcon: {
    fontSize: 40,
    color: '#707070'
  },
  extendedApp: {
    textAlign: 'center',
    backgroundColor: '#0e98ed',
    color: '#FFFFFF',
    fontWeight: '300',
    textTransform: 'uppercase',
    padding: 3,
    alignSelf: 'center',
    borderRadius: 5
  }
});
