import { Model } from 'react-native-mobx-supermodel';
import { observable, action } from 'mobx';
import Item from "./item";
import {DROPOFF_ADDRESS, PICKUP_ADDRESS, DROPOFF_NUMBER, DROPOFF_NAME} from "../constants/Addresses";
import Postmates from './Postmates';
import moment from 'moment';
import { SMALL, MANIFEST } from '../constants/Sizes';

const postmates = new Postmates();

export default class Cart extends Model {
	fields() {
		return {
			currency: 'USD',
			name: DROPOFF_NAME,
			address: DROPOFF_ADDRESS,
			number: DROPOFF_NUMBER,
			items: observable.map({}),
			totalItems: 0,
			totalPrice: 0,
			fee: 0,
			loadedQuote: false,
			quoteId: '',
			quote: observable.map({}),
			eta: 'in less than 2 hours'
		};
	}

	findByProductId(product_id) {
		return this.items.get(product_id);
	}

	addProduct = action((product) => {
		// find or create
		const item = this.findByProductId(product.id);

		this.addItem({
			item,
			product
		});
	});

	addItem = action(({ product, item = new Item() }) => {
		item.product = product;
		item.quantity = item.quantity || 0;
		item.quantity++;

		this.items.set(product.id, item);

		this.totalItems = this._totalItems();
		this.totalPrice = this._totalPrice();
	});

	_totalItems() {
		const items = Array.from(this.items.values());
		return items.length ? items.map((item) => (item.quantity || 0)).reduce((sum, num) => sum + num): 0;
	}

	_totalPrice() {
		const items = Array.from(this.items.values());
		return items.length ? items.map((item) => (item.price || 0) * (item.quantity || 0)).reduce((sum, num) => sum + num): 0;
	}

	etaFromDate(date) {
		return moment(date).fromNow();
	}

	getQuote() {
		return postmates.deliveryQuotes({ from: PICKUP_ADDRESS, to: this.address })
				.then((response) => {
					const {data} = response;
					this.fee = data.fee;
					this.currency = data.currency_type;
					this.loadedQuote = true;
					this.eta = this.etaFromDate(new Date(data.dropoff_eta));
					// console.log("Data: ", data);
					this.quoteId = data.id;
					this.quote.set(data.id, data);
				})
				.catch((e) => {
					// TODO: handle error
				});
	}

	createOrder() {
		return postmates.createOrder({
			quote_id: this.quoteId,
			from: PICKUP_ADDRESS,
			to: this.address,
			name: this.name,
			number: this.number,
			items: this.manifestItems(),
			description: MANIFEST
		})
				.then((response) => {
					console.log("Response: ", response.data);
				})
				.catch((error) => {
					console.log("Error creating order: ", error.message, error.response.data);
				})
	}

	manifestItems() {
		return Array.from(this.items.values()).map((item) => {
			return {
				name: item.product.name,
				quantity: item.quantity,
				size: SMALL
			}
		})
	}
}
