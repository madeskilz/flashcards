import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView, TextInput } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { addCard } from "../redux/actions";
import { _addCard } from "../utils/API";
class AddQuestion extends Component {
    state = {
        question: '',
        answer: '',
    }
    submit = () => {
        const deckId = this.props.id;
        const card = {
            question: this.state.question,
            answer: this.state.answer
        };

        this.props.dispatch(addCard({ card, deckId }));

        this.setState({
            question: '',
            answer: '',
        })

        this.props.navigation.navigate('DeckDetail', {
            id: this.props.id
        })
        _addCard({ card, deckId });
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            header: ({ navigation }) => {
                const { id, deck: { title } } = this.props;
                return (
                    <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#03351b', height: 50, padding: 10 }}>
                        <Ionicons style={{ flex: 0 }} name='arrow-back' size={30} color={'#fff'} onPress={navigation.goBack} />
                        <Text style={{ flex: 5, textAlign: 'center', color: '#fff', fontSize: 24 }}>Add Card to {title}</Text>
                    </View>
                )
            }
        })
    }
    render() {
        const { question, answer } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>Enter Card Details</Text>
                <TextInput style={styles.input} value={question} placeholder='Question'
                    onChangeText={(question) => this.setState({ question })}
                />
                <TextInput style={styles.input} value={answer} placeholder='Answer'
                    onChangeText={(answer) => this.setState({ answer })}
                />
                <TouchableOpacity style={styles.btn} onPress={this.submit} disabled={question === '' || answer === ''}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
function mapStateToProps(state, { navigation }) {
    const { id } = navigation.getState().routes.filter((route) => route.name === 'AddQuestion')[0].params;
    return { id, deck: state[id] }
}
export default connect(mapStateToProps)(AddQuestion);
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