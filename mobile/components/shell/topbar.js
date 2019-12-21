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
    <Header hasSegment={props.segment}>
      <Left>
        <Button transparent onPress={() => props.navigation.toggleDrawer()}>
          <Icon name="menu" />
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
