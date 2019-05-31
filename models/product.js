import { Model } from 'react-native-mobx-supermodel';



export default class Product extends Model {
	fields() {
		return {
			name: '',
			price: 0,
			image: require('../assets/images/placeholder.jpg')
		}
	}
}
