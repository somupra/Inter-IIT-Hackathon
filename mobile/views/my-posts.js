import React, { Component } from 'react';

class MyPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  render() {
    return (
      <Content padder>
        {this.state.posts.map(post => (
          <Post post={post} user></Post>
        ))}
      </Content>
    );
  }
}

export default MyPostsScreen;
