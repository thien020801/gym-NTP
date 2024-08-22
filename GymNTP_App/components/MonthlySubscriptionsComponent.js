import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import axios from 'axios';

// redux
import { connect } from 'react-redux';
import { monthly } from '../redux/monthly';

const mapStateToProps = (state) => {
    return {
        monthly: state.monthly
    }
};

class RenderMonthly extends Component {
    render() {
        const { monthly } = this.props;
        return (
            <Card containerStyle={styles.cardContainer}>
                <Card.Title style={styles.cardTitle}>Monthly List</Card.Title>
                <Card.Divider />
                <FlatList
                    data={monthly}
                    renderItem={this.renderMonthlyItem}
                    keyExtractor={(item) => item.MonthlySubscriptionID.toString()}
                />
            </Card>
        );
    }

    renderMonthlyItem = ({ item }) => {
        const { navigation } = this.props;
        return (
            <ListItem
                key={item.MonthlySubscriptionID}
                onPress={() => navigation.navigate('MonthlyDetail', { monthlyId: item.MonthlySubscriptionID })}
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
                        <Text>Duration: </Text>{item.Duration}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
}

class MonthlySubscriptions extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <RenderMonthly
                        monthly={this.props.monthly.monthly}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(MonthlySubscriptions);

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
    },
    listItemSubtitle: {
        fontSize: 16,
    },
});
