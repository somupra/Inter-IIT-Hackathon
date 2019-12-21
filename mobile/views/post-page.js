import React, { Component } from 'react';
import { Image } from 'react-native';
import { Form, Textarea } from 'native-base';
import { AppContext } from '../components/utils/appContext';

export default class PostNewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setRef(ref) {
    this._textarea = ref;
  }

  render() {
    return (
      <Content padder>
        <View>
          <Image source={this.props.photo}></Image>
        </View>
        <View>
          <Form>
            <Textarea
              rowSpan={4}
              bordered
              placeholder="Enter description here"
              ref={this.setRef}
            ></Textarea>
          </Form>
        </View>
      </Content>
    );
  }
}
