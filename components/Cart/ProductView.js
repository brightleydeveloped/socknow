import React from 'react';
import {StyleSheet, View, Image, ScrollView, Text, Dimensions, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import toCurrency from '../../utils/toCurrency';

export default observer(class CartProductView extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	};

	render() {
		const { item } = this.props;

		const { product } = item;


		return (

			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
							source={product.image}
							style={styles.image}
					/>
				</View>
				<View style={styles.textContainer}>
					<Text>{product.name}</Text>
					<View>
						<Text>{toCurrency('USD', product.price)}x{item.quantity}</Text>
						<Text>{toCurrency('USD', product.price * item.quantity)}</Text>
					</View>
				</View>
			</View>
		);
	}
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	imageContainer: {
		flex: 1
	},
	image: {
		width: 200,
		maxHeight: 200,
		resizeMode: 'contain'
	},
});

