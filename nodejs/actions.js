"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var base_1 = require("./base");
function createWooCommerceAuth(_a) {
    var _b = _a.props, credentials = _b.credentials, url = _b.url;
    return { authFetch: base_1.createAuth(credentials) };
}
exports.createWooCommerceAuth = createWooCommerceAuth;
function fetchOrderItems$(_a) {
    var _b = _a.props, authFetch = _b.authFetch, _c = _b.startDate, startDate = _c === void 0 ? null : _c, _d = _b.endDate, endDate = _d === void 0 ? null : _d, _e = _b.perPageLimit, perPageLimit = _e === void 0 ? 100 : _e;
    if (!startDate && !endDate && !authFetch) {
        throw new Error('Missing Required Params');
    }
    var pageNumber = 1;
    function fetcher(page) {
        if (page === void 0) { page = 1; }
        return rxjs_1.from(authFetch.get('orders', {
            page: page,
            per_page: perPageLimit,
            after: startDate,
            before: endDate,
        })).pipe(operators_1.filter(function (response) { return response.status === 200; }), operators_1.map(function (response) { return response.data; }));
    }
    return {
        orderItems$: fetcher(pageNumber++).pipe(operators_1.expand(function (orders) {
            return orders.length === perPageLimit ? fetcher(pageNumber++) : rxjs_1.empty();
        }), operators_1.concatMap(function (o) { return o; }))
    };
}
exports.fetchOrderItems$ = fetchOrderItems$;
