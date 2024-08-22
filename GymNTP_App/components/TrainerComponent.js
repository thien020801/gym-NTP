import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import TrainerDetail from './TrainerDetailComponent';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const mapStateToProps = (state) => {
  return {
    trainer: state.trainer
  }
};

class RenderTrainer extends Component {
  renderTrainerItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <ListItem 
        key={item.TrainerID} 
        onPress={() => navigation.navigate('TrainerDetail', { trainerId: item.TrainerID })}
        containerStyle={styles.listItemContainer}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.TrainerName}</ListItem.Title>
          <Card.Divider />
          <ListItem.Subtitle><Text style={styles.label}>Phone Number: </Text>{item.PhoneNumber}</ListItem.Subtitle>
          <ListItem.Subtitle><Text style={styles.label}>Address: </Text>{item.Address}</ListItem.Subtitle>
          <ListItem.Subtitle><Text style={styles.label}>Email: </Text>{item.Email}</ListItem.Subtitle>
          <ListItem.Subtitle><Text style={styles.label}>DoB: </Text>{item.DateOfBirth}</ListItem.Subtitle>
          <ListItem.Subtitle><Text style={styles.label}>Gender: </Text>{item.Gender}</ListItem.Subtitle>
          <ListItem.Subtitle><Text style={styles.label}>Price: </Text>{item.Cost}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  render() {
    const { trainer } = this.props;
    return (
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Trainer List</Card.Title>
        <Card.Divider />
        <FlatList
          data={trainer}
          renderItem={this.renderTrainerItem}
          keyExtractor={(item) => item.TrainerID.toString()}
        />
      </Card>
    );
  }
}

class Trainer extends Component {
  TrainerScreen = ({ navigation }) => {
    return (
      <ScrollView>
        <View>
          <RenderTrainer
            trainer={this.props.trainer.trainer}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    );
  };

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName='TrainerScreen'
          screenOptions={{
            headerStyle: { backgroundColor: '#7cc' },
            headerTintColor: '#fff',
            headerTitleStyle: { color: '#fff' }
          }}>
          <Stack.Screen name='TrainerScreen' component={this.TrainerScreen} options={{ title: 'Trainers' }} />
          <Stack.Screen name='TrainerDetail' component={TrainerDetail} options={{ title: 'Trainer Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps)(Trainer);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 20,
    color: '#007bff',
  },
  listItemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});
