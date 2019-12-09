import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export function createAuth(url = '', clientCredentials = null) {
    if (!clientCredentials) {
        throw new Error('Client Credentials Missing');
    }
    const wooCommerceCredentials =  {
        url,
        consumerKey: clientCredentials.appId,
        consumerSecret: clientCredentials.appSecret,
        wpAPI: true,
        version: 'wc/v3'
    };
    return new WooCommerceRestApi(wooCommerceCredentials);
}
