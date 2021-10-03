import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../redux/actions";
import { _addDeck } from "../utils/API";
class AddDeck extends Component {
    state = { title: '' }
    submit = () => {
        const key = this.state.title.replace("[-+.^:,]", "");
        const deck = {
            title: this.state.title,
            questions: []
        };

        this.props.dispatch(addDeck({ [key]: deck }));

        this.setState({
            title: '',
        })

        this.props.navigation.navigate('DeckDetail', { id: key });
        _addDeck({ key, deck });
    }
    render() {
        const { title } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput style={styles.input} value={title} placeholder='Deck Title'
                    onChangeText={(title) => this.setState({ title })}
                />
                <TouchableOpacity style={styles.btn} onPress={this.submit} disabled={title === ''}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
export default connect()(AddDeck);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        fontSize: 48,
        fontWeight: '400',
        textAlign: 'center'
    },
    input: {
        borderColor: '#02351a',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        alignSelf: 'stretch',
        padding: 10,
        margin: 10,
    },
    btn: {
        backgroundColor: '#02351a',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        alignSelf: 'stretch',
        borderRadius: 10
    }
})