import React from 'react';
import { View, Text } from 'react-native';

export default class TrackScreen extends React.Component {
  static navigationOptions = {
    title: 'Track',
  };

  render() {
    return (<View>
      <Text>{TrackScreen.navigationOptions.title}</Text>
    </View>);
  }
}
