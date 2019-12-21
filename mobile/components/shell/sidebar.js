import React from 'react';
import {
  ListItem,
  Left,
  Icon,
  Text,
  Content,
  List,
  Thumbnail,
  Body,
  CardItem,
  Separator
} from 'native-base';
import { Image } from 'react-native';
import AppContext from '../utils/appContext';
import styles from './style';

const AVATAR_PIC = require('../../assets/profile-pic.png');
const COVER_PIC = require('../../assets/cover.jpg');

const pages = [
  { name: 'Home', icon: 'home', route: 'Home' },
  {
    name: 'Add New',
    icon: 'add',
    route: 'NewPost'
  },
  {
    name: 'Run and Earn',
    icon: 'md-walk',
    route: 'Run'
  },
  { name: 'Profile', icon: 'person', route: 'Profile' }
];

const Sidebar = props => {
  return (
    <AppContext.Consumer>
      {state => (
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <Image source={COVER_PIC} style={styles.drawerCover} />
          {/* <CardItem
            button
            onPress={() => props.navigation.navigate('Profile')}
            bordered
          >
            <Left>
              <Thumbnail source={AVATAR_PIC} style={{ marginRight: 10 }} />
              <Body>
                <Text>Not logged in</Text>
              </Body>
            </Left>
          </CardItem> */}
          <List>
            {pages.map((page, index) => (
              <ListItem
                button
                noBorder
                key={index}
                onPress={() => props.navigation.navigate(page.route)}
              >
                <Left>
                  <Icon
                    active
                    name={page.icon}
                    type={page.type}
                    style={{ color: '#777', fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>{page.name}</Text>
                </Left>
              </ListItem>
            ))}
          </List>
        </Content>
      )}
    </AppContext.Consumer>
  );
};

export default Sidebar;
