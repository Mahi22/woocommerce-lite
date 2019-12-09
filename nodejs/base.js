"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var woocommerce_rest_api_1 = require("@woocommerce/woocommerce-rest-api");
function createAuth(clientCredentials) {
    if (clientCredentials === void 0) { clientCredentials = null; }
    if (!clientCredentials) {
        throw new Error('Client Credentials Missing');
    }
    var wooCommerceCredentials = {
        url: clientCredentials.marketplaceId,
        consumerKey: clientCredentials.appId,
        consumerSecret: clientCredentials.appSecret,
        wpAPI: true,
        version: 'wc/v3'
    };
    return new woocommerce_rest_api_1.default(wooCommerceCredentials);
}
exports.createAuth = createAuth;
