"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_tree_1 = require("function-tree");
var actions_1 = require("./actions");
exports.fetchWooCommerceOrders = function_tree_1.sequence('Fetch WooCommerce Orders', [
    actions_1.createWooCommerceAuth,
    actions_1.fetchOrderItems$
]);
exports.fetchWooCommerceProducts = function_tree_1.sequence('Fetch WooCommerce Products', [
    actions_1.createWooCommerceAuth,
    actions_1.fetchProducts$
]);
exports.validateWooCommerceCredentials = function_tree_1.sequence('Validate WooCommerce Credentials', [
    actions_1.createWooCommerceAuth,
    actions_1.validateAuth
]);
