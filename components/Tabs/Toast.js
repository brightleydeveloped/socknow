import React from 'react';
import { observer } from 'mobx-react';
import {View, Text, StyleSheet} from 'react-native';
import cart from "../../singletons/cart";

export default observer(class Toast extends React.Component {
	render() {
		return cart.totalItems > 0 ? (
				<View style={styles.toastContainer}>
					<Text style={styles.toast}>{cart.totalItems}</Text>
				</View>
		): null;
	}
})

const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		right: -13,
		top: -3,
		zIndex: 1,
		borderRadius: 8,
		paddingVertical: 1,
		paddingHorizontal: 2,
		backgroundColor: '#cc0000',
		width: 20,
		height: 17,
	},
	toast: {
		fontSize: 12,
		color: 'white',
		textAlign: 'center'
	}
});
