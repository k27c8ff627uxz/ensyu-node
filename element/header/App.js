import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Alert } from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends Component {
  render() {
    return(<View>
      <StatusBar barStyle="default" hidden={false} />
      <Header
        leftComponent={{
          icon: 'menu',
          color: 'white',
          size: 35,
          onPress: this.doActionLeft,
        }}
        centerComponent={{
          text: 'SampleApp',
          style: styles.header,
        }}
        rightComponent={{
          icon: 'android',
          color: 'white',
          size: 35,
          onPress: this.doActionRight,
        }}
        outerContainerStyles={{
          height: 100,
          backgroundColor: '#dd0000',
        }}
        innerContainerStyles={{
          backgroundColor: '#dd0000',
        }}
      />
			<View>
				<Text>This is Main View</Text>
			</View>
    </View>);
  }

  doActionLeft = () => {
    Alert.alert('Left icon tapped!');
  }
  doActionRight = () => {
    Alert.alert('Right icon tapped!');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
