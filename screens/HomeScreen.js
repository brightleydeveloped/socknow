import React from 'react';
import {Collection} from 'react-native-mobx-supermodel';
import Product from '../models/product';
import ProductView from '../components/Products/Product';
// lowercase because singletons are already instantiated
import cart from '../singletons/cart';
import Item from '../models/item';

import {
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { MOCK_PRODUCTS } from '../constants/Products';

const strings = {
	title: 'SOCK NOW',
	subtitle: 'Socks on your feet as fast as your dog can bring you your slippers.'
}

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props, context) {
		super(props, context);

		this.products = new Collection(Product);

		MOCK_PRODUCTS.forEach((fields) => {
			this.products.setModel(new Product({
				fields
			}));
		});
	}

	addToCart = (product) => {
		// does this item already exist in the cart? If so, add to it instead of creating a new item
		cart.addProduct(product);
	};

	render() {

		return (
				<View style={styles.container}>
					<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
						<View style={styles.titleContainer}>
							<Text style={[styles.center, styles.title]}>{strings.title}</Text>
							<Text style={[styles.center, styles.subtitle]}>{strings.subtitle}</Text>
						</View>
						<View style={styles.productsContainer}>
							{this.products.map((product) => {
								return (
										<ProductView product={product} key={product.id} onPress={() => this.addToCart(product)}/>
								)
							})}
						</View>
					</ScrollView>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	productsContainer: {
		paddingTop: 20,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	center: {
		textAlign: 'center'
	},
	titleContainer: {
		paddingTop: 50,
		paddingBottom: 20
	},
	title: {
		fontSize: 20
	},
	subtitle: {
		fontSize: 14,
		paddingTop: 10,
		paddingHorizontal: 20
	}
});
