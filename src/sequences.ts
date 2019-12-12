import { sequence } from 'function-tree';
import { createWooCommerceAuth, fetchOrderItems$, fetchProducts$ } from './actions';

// Credential start end
export const fetchWooCommerceOrders = sequence('Fetch WooCommerce Orders', [
    createWooCommerceAuth,
    fetchOrderItems$
]);

export const fetchWooCommerceProducts = sequence('Fetch WooCommerce Products', [
    createWooCommerceAuth,
    fetchProducts$
]);
