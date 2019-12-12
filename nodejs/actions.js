"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var base_1 = require("./base");
function createWooCommerceAuth(_a) {
    var credentials = _a.props.credentials;
    return { authFetch: base_1.createAuth(credentials) };
}
exports.createWooCommerceAuth = createWooCommerceAuth;
function fetchProducts$(_a) {
    var _b = _a.props, authFetch = _b.authFetch, _c = _b.perPageLimit, perPageLimit = _c === void 0 ? 100 : _c;
    var pageNumber = 1;
    function fetcher(page) {
        if (page === void 0) { page = 1; }
        return rxjs_1.from(authFetch.get('products', {
            page: page,
            per_page: perPageLimit,
        })).pipe(operators_1.filter(function (response) { return response.status === 200; }), operators_1.map(function (response) { return response.data; }));
    }
    return {
        products$: fetcher(pageNumber++).pipe(operators_1.expand(function (orders) {
            return orders.length === perPageLimit ? fetcher(pageNumber++) : rxjs_1.empty();
        }), operators_1.concatMap(function (o) { return o; }))
    };
}
exports.fetchProducts$ = fetchProducts$;
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
        }), operators_1.concatMap(function (o) { return o; }), operators_1.concatMap(function (o) { return o.line_items.map(function (item) { return (__assign({ item: item, orderItemId: o.id + "::" + item.id }, o)); }); }))
    };
}
exports.fetchOrderItems$ = fetchOrderItems$;
