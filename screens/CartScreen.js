import React from 'react';
import {ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import cart from '../singletons/cart';
import {observer} from 'mobx-react';
import CartProductView from '../components/Cart/ProductView';
import {buttonStyle, buttonTextStyle} from "../constants/Styles";
import toCurrency from '../utils/toCurrency';
const strings = {
	check_for_instant_ship: 'Check for Instant Ship',
	address_placeholder: 'Address',
	get_this_in: 'Get this',
	for: 'for',
	do_it: 'Do It',
};

export default observer(class CartScreen extends React.Component {
	static navigationOptions = {
		title: 'Cart'
	};

	onPress = () => {
		if(cart.loadedQuote) {
			cart.createOrder();
		} else {
			cart.getQuote();
		}
	}

	render() {
		return (
				<View style={styles.view}>
					{/*<Text>{this.state.response}</Text>*/}
					<ScrollView style={styles.container}>
						{cart.items.size ? Array.from(cart.items.values()).map((item) => {
							return (
									<CartProductView key={`cp-${item.product.id}`} item={item}/>
							)
						}) : null}
					</ScrollView>

					<View style={styles.footer}>
						{cart.loadedQuote ? (
								<View>
									<Text>
										{strings.get_this_in} {cart.eta} {strings.for} {toCurrency(cart.currency, cart.fee)}
									</Text>
								</View>
						): (
								<View style={styles.addressInputContainer}>
									<TextInput
											placeholder={strings.address_placeholder}
											style={styles.addressInput}
											value={cart.address}
											onChange={(event, value) => cart.address = value}
									/>
								</View>
						)}

						<TouchableOpacity style={styles.button} onPress={this.onPress}>
							<Text style={styles.buttonText}>{cart.loadedQuote ? strings.do_it: strings.check_for_instant_ship}</Text>
						</TouchableOpacity>
					</View>
				</View>
		);
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff',
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		bottom: 100
	},
	view: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	button: buttonStyle,
	buttonText: buttonTextStyle,
	addressInputContainer: {
		padding: 20
	},
	phoneInput: {},
	addressInput: {},
	footer: {
		position: 'absolute',
		bottom: 0,
		padding: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		left: 0,
		right: 0
	}
});
