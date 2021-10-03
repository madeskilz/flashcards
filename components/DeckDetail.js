import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
class DeckDetail extends Component {
    componentDidMount() {
        this.props.navigation.setOptions({
            header: ({ navigation }) => {
                const { id, deck: { title } } = this.props;
                return (
                    <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#03351b', height: 50, padding: 10 }}>
                        <Ionicons style={{ flex: 0 }} name='arrow-back' size={30} color={'#fff'} onPress={navigation.goBack} />
                        <Text style={{ flex: 5, textAlign: 'center', color: '#fff', fontSize: 24 }}>{title}</Text>
                    </View>
                )
            }
        })
    }
    render() {
        const { deck, id } = this.props;
        return (
            <Fragment>
                <View style={styles.container}>
                    <Text style={{ fontSize: 28 }}>{deck.title}</Text>
                    <Text style={{ color: 'gray', fontSize: 18 }}>{deck.questions.length} Cards</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <TouchableOpacity style={styles.btn_0}
                        onPress={() => this.props.navigation.navigate('AddQuestion', { id })}
                    >
                        <Text style={{ color: '#02351a', textAlign: 'center', fontSize: 20 }}>Add Card</Text>
                    </TouchableOpacity>
                    {deck.questions.length > 0 && (
                        <TouchableOpacity 
                        style={styles.btn_1}
                        onPress={() => this.props.navigation.navigate('StartQuiz', { id })}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Start Quiz</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Fragment>
        )
    }
}
function mapStateToProps(state, { navigation }) {
    const { id } = navigation.getState().routes.filter((route) => route.name === 'DeckDetail')[0].params;
    return { id, deck: state[id] }
}
export default connect(mapStateToProps)(DeckDetail);
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
    },
    btn_1: {
        backgroundColor: '#02351a',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        height: 50,
        alignSelf: 'stretch',
        borderRadius: 10
    },
    btn_0: {
        borderColor: '#02351a',
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
    }
})