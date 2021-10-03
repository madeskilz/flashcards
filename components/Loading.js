import React, { Component } from "react";
import { Text, Animated } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
export default class Loading extends Component {
    state = {
        opacity: new Animated.Value(0),
    }
    componentDidMount() {
        const { opacity } = this.state;
        Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }
    render() {
        const { opacity } = this.state
        return (
            <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity }}>
                <FontAwesome name='spinner' size={50} color='gray' />
                <Text style={{ color: 'gray' }}>LOADING</Text>
            </Animated.View>
        )
    }
}