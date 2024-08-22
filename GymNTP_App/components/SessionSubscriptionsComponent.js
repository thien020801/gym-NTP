import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';

// redux
import { connect } from 'react-redux';
import { session } from '../redux/session';

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

class RenderSession extends Component {
  render() {
    const { session } = this.props;
    return (
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>Session List</Card.Title>
        <Card.Divider />
        <FlatList
          data={session}
          renderItem={this.renderSessionItem}
          keyExtractor={(item) => item.SessionSubscriptionID.toString()}
        />
      </Card>
    );
  }

  renderSessionItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <ListItem
        key={item.SessionSubscriptionID}
        onPress={() => navigation.navigate('SessionDetail', { sessionId: item.SessionSubscriptionID })}
        containerStyle={styles.listItemContainer}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            <Text>Name: </Text>{item.Name}
          </ListItem.Title>
          <Card.Divider />
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            <Text>Price: </Text>{item.Cost}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            <Text>Number Of Sessions: </Text>{item.NumberOfSessions}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

class SessionSubscriptions extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <RenderSession
            session={this.props.session.session}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(SessionSubscriptions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItemContainer: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItemSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
