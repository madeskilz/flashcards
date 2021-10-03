import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
class StartQuiz extends Component {
    state = {
        current: 0,
        correct: 0,
        face: 'front',
        completed: false,
    }
    flipCard = () => {
        if (this.state.face === 'front') {
            this.setState({ face: 'back' });
        } else {
            this.setState({ face: 'front' });
        }
    }
    next = (type) => {
        if (type === 'correct') {
            this.setState((state) => {
                return {
                    correct: state.correct + 1,
                    face: 'front',
                }
            })
        } else {
            this.setState((state) => {
                return {
                    face: 'front',
                }
            })
        }
        const current = this.state.current + 1;
        const total = this.props.deck.questions.length;
        if (current >= total) {
            this.setState({ completed: true });
        } else {
            this.setState({ current });
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            header: ({ navigation }) => {
                return (
                    <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#03351b', height: 50, padding: 10 }}>
                        <Ionicons style={{ flex: 0 }} name='arrow-back' size={30} color={'#fff'} onPress={navigation.goBack} />
                        <Text style={{ flex: 5, textAlign: 'center', color: '#fff', fontSize: 24 }}>Quiz</Text>
                    </View>
                )
            }
        })
    }
    render() {
        const { deck: { questions }, navigation } = this.props;
        const { current, face, completed, correct } = this.state;
        return (
            <View style={styles.container}>
                {!completed && <Fragment>
                    <View style={{ alignSelf: 'flex-start', padding: 20 }}>
                        <Text style={{ color: 'gray', fontSize: 20 }}>{current + 1} of {questions.length}</Text>
                    </View>
                    <View>
                        {face === 'back' && <View style={[styles.flipCard]}>
                            <Text style={styles.title}>Answer: {questions[current].answer}</Text>
                        </View>}
                        {face === 'front' && <View style={[styles.flipCard]}>
                            <Text style={styles.title}>Question: {questions[current].question}</Text>
                        </View>}
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={this.flipCard}>
                        <Text style={{ color: '#02351a', textAlign: 'center', fontSize: 20 }}>Show {face === 'front' ? 'Answer' : 'Question'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.next('correct')} style={[styles.btn, { backgroundColor: 'green', borderWidth: 0 }]}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.next('incorrect')} style={[styles.btn, { backgroundColor: 'red', borderWidth: 0 }]}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Incorrect</Text>
                    </TouchableOpacity>
                </Fragment>}
                {completed && (
                    <View>
                        <Text style={styles.title}>Congratulations!!!</Text>
                        <Text style={styles.title}> You answered {correct} questions correctly out of {questions.length}</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
                            <Text style={{ color: '#02351a', textAlign: 'center', fontSize: 20 }}>Go to Deck</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#02351a', }]} onPress={() => {
                            this.setState({
                                current: 0,
                                correct: 0,
                                face: 'front',
                                completed: false,
                            })
                        }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Restart Quiz</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}
function mapStateToProps(state, { navigation }) {
    const { id } = navigation.getState().routes.filter((route) => route.name === 'StartQuiz')[0].params;
    return { id, deck: state[id] }
}
export default connect(mapStateToProps)(StartQuiz);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    flipCard: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        backfaceVisibility: 'hidden',
    },
    title: {
        fontSize: 28,
        fontWeight: '400',
        textAlign: 'center'
    },
    btn: {
        borderColor: '#02351a',
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        height: 50,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
    },

})