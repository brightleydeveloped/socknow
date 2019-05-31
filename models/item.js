import { Model } from 'react-native-mobx-supermodel';
import Product from './product';

export default class Item extends Model {
	fields() {
		return {
			product: new Product(),
			quantity: 0,
			get total() {
				return this.product.price * this.quantity;
			}
		}
	}
}
