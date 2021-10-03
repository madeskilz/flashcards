import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
class Decks extends Component {
    renderItem = ({ item }) => {
        return <Deck id={item} key={item} navigation={this.props.navigation} />
    }
    render() {
        const { deckIds } = this.props;
        return (
            <View>
                <FlatList
                    data={deckIds}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}
function mapStateToProps(state) {
    return { deckIds: Object.keys(state) }
}
export default connect(mapStateToProps)(Decks);