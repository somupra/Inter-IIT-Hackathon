import React from 'react';
import {
  Header,
  Left,
  Body,
  Right,
  Title,
  Text,
  Button,
  Icon
} from 'native-base';

const TopBar = props => {
  return (
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => {
            !props.modal
              ? props.navigation.goBack()
              : props.navigation.navigate('Home');
          }}
        >
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{props.pgName}</Title>
      </Body>
      <Right></Right>
    </Header>
  );
};

export default TopBar;
