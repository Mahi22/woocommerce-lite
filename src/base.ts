import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export function createAuth(clientCredentials = null) {
    if (!clientCredentials) {
        throw new Error('Client Credentials Missing');
    }
    const wooCommerceCredentials =  {
        url: clientCredentials.marketplaceId,
        consumerKey: clientCredentials.appId,
        consumerSecret: clientCredentials.appSecret,
        wpAPI: true,
        version: 'wc/v3'
    };
    return new WooCommerceRestApi(wooCommerceCredentials);
}
