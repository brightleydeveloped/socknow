import { Model } from 'react-native-mobx-supermodel';
import { POSTMATES_CUSTOMER_ID, POSTMATES_API_KEY } from '../config';
import Base64 from '../utils/Base64';
import querystring from 'querystring';
import { PICKUP_NAME, PICKUP_NUMBER } from '../constants/Addresses';

export default class Postmates extends Model {
	headers() {
		return {
			'Authorization': `Basic ${Base64.btoa(`${POSTMATES_API_KEY}:`)}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		};
	}

	options() {
		return {
			baseUrl: 'https://api.postmates.com',
			basePath: 'v1'
		};
	}

	resource() {
		return 'customers';
	}

	customerUrl() {
		return `${this.getURL(this.options())}/${POSTMATES_CUSTOMER_ID}`;
	}

	deliveryQuotes({ from, to }) {
		const url = `${this.customerUrl()}/delivery_quotes`;

		return this.getAPI().makeRequest({
			url,
			method: 'post',
			headers: this.headers(),
			data: querystring.stringify({
				pickup_address: from,
				dropoff_address: to
			})
		});
	}

	createOrder({ quote_id, from, to, name, number, items, description }) {
		const url = `${this.customerUrl()}/deliveries`;

		return this.getAPI().makeRequest({
			url,
			method: 'post',
			headers: this.headers(),
			data: querystring.stringify({
				dropoff_name: name,
				dropoff_phone_number: number,
				dropoff_address: to,
				pickup_name: PICKUP_NAME,
				pickup_phone_number: PICKUP_NUMBER,
				pickup_address: from,
				quote_id,
				manifest: description,
				manifest_items: items
			})
		});
	}
}
