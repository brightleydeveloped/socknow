import React from 'react';
import PropTypes from 'prop-types';
import toCurrency from '../../utils/toCurrency';
import {
	Dimensions,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,

	View,
} from 'react-native';

import {
	buttonStyle,
	buttonTextStyle
} from '../../constants/Styles';

import { observer } from 'mobx-react';

const strings = {
	buy: 'Get Now!'
};

export default observer(class ProductView extends React.Component {
	static propTypes = {
		product: PropTypes.object.isRequired,
		onPress: PropTypes.func
	};

	render() {
		const {product, onPress} = this.props;

		return (
				<View style={styles.container}>
					<View>
						<Image
								source={product.image}
								style={styles.image}
						/>
						<View style={styles.textContainer}>
							<Text style={styles.title}>{product.name}</Text>
							<Text style={styles.price}>{toCurrency('USD', product.price)}</Text>

							<TouchableOpacity style={styles.buyButton} onPress={onPress}>
									<Text style={styles.buyButtonText}>{strings.buy}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
		);
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		marginBottom: 30
	},
	textContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	image: {
		width: Dimensions.get('window').width,
		maxHeight: 200,
		resizeMode: 'contain'
	},
	title: {
		fontSize: 24,
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	price: {
		textAlign: 'center'
	},
	buyButton: buttonStyle,
	buyButtonText: buttonTextStyle,
});
