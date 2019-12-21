import React, { Component } from 'react';
import TopBar from '../components/shell/topbar';
import { Content } from 'native-base';
import Post from '../components/home/post';
import AppContext from '../components/utils/appContext';
import { fetchData } from '../components/utils/storage';
import * as Location from 'expo-location';

const sample = {
  name: 'John Doe',
  location: 'IIT Roorkee',
  coords: {
    latitude: 37.78825,
    longitude: -122.4324
  },
  imageUri:
    'https://www.thebetterindia.com/wp-content/uploads/2018/07/1-18.jpg',
  upvotes: 24,
  downvotes: 5,
  extended: true,
  description:
    'There is a big hole in the middle of the road that causes problems for cars and bikes.'
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    // const location = await Location.getCurrentPositionAsync();
    // const res = await fetchData('POST', '/dashboard/feed/', {
    //   coordX: location.coords.latitude,
    //   coordY: location.coords.longitude
    // });
    // const data = await res.json();
    // console.log(data);
    // this.setState({ posts:  });
  }

  render() {
    return (
      <AppContext.Consumer>
        {state => (
          <React.Fragment>
            <TopBar pgName="Home" navigation={this.props.navigation}></TopBar>
            <Content padder>
              {this.state.posts.map((post, i) => (
                <Post post={post} key={i} nav={this.props.navigation}></Post>
              ))}
            </Content>
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}
