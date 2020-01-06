import { sequence } from 'function-tree';
import { createWooCommerceAuth, fetchOrderItems$, fetchProducts$, validateAuth } from './actions';

// Credential start end
export const fetchWooCommerceOrders = sequence('Fetch WooCommerce Orders', [
    createWooCommerceAuth,
    fetchOrderItems$
]);

export const fetchWooCommerceProducts = sequence('Fetch WooCommerce Products', [
    createWooCommerceAuth,
    fetchProducts$
]);

export const validateWooCommerceCredentials = sequence('Validate WooCommerce Credentials', [
    createWooCommerceAuth,
    validateAuth
]);
