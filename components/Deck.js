import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
class Deck extends Component {
    render() {
        const { deck } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('DeckDetail', {
                id: this.props.id
            })}>
                <Text style={{ fontSize: 28 }}>{deck.title}</Text>
                <Text style={{ color: 'gray', fontSize: 18 }}>{deck.questions.length} Cards</Text>
            </TouchableOpacity>
        )
    }
}
function mapStateToProps(state, { id }) {
    return { deck: state[id] }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 10,
        height: 200,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 17,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    }
})
export default connect(mapStateToProps)(Deck);