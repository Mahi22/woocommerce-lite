import { sequence } from 'function-tree';
import { createWooCommerceAuth, fetchOrderItems$ } from './actions';

export const fetchOrders = sequence('Fetch WooCommerce Orders', [
    createWooCommerceAuth,
    fetchOrderItems$
]);
