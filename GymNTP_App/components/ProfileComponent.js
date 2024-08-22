import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

class Profile extends Component {
  state = {
    user: {
      name: 'John Doe',
      phone: '123-456-7890',
      avatar: require('./images/GymAvarta.jpg'), 
      isActive: true,
      points: 500
    }
  };

  render() {
    const { user } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar
            rounded
            source={user.avatar}
            size="large"
            containerStyle={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.infoText}>{user.phone}</Text>
            <Text style={styles.infoText}>Status: {user.isActive ? 'Active' : 'Inactive'}</Text>
            <Text style={styles.infoText}>Points: {user.points}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={this.handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleEditProfile = () => {
    
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    marginRight: 20
  },
  userInfo: {
    flexDirection: 'column'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  infoText: {
    fontSize: 18, 
    marginBottom: 5
  },
  editButton: {
    backgroundColor: '#7cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold'
  }
});

export default Profile;
