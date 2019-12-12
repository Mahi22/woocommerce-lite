import { sequence } from 'function-tree';
import { createWooCommerceAuth, fetchOrderItems$ } from './actions';

// Credential start end
export const fetchWooCommerceOrders = sequence('Fetch WooCommerce Orders', [
    createWooCommerceAuth,
    fetchOrderItems$
]);
