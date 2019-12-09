import { from, empty } from 'rxjs';
import { filter, map, expand } from 'rxjs/operators';
import { createAuth } from './base';

export function createWooCommerceAuth({ props: { credentials, url } }: any) {
    return { authFetch: createAuth(url, credentials) }
}

export function fetchOrderItems$({ props: { authFetch, startDate = null, endDate = null, perPageLimit = 100 } }: any) {
    if (!startDate && !endDate && !authFetch) {
        throw new Error('Missing Required Params');
    }

    var pageNumber = 1;

    function fetcher(page = 1) {
        return  from(authFetch.get('orders', {
            page,
            per_page: perPageLimit,
            after: startDate,
            before: endDate,
        })).pipe(
            filter((response: { status: number}) => response.status === 200),
            map((response: any) => response.data)
        );
    }

    return {
        orderItems$: fetcher(pageNumber++).pipe(
            expand(orders => {
                return  orders.length === perPageLimit ? fetcher(pageNumber++) : empty();
            })
        )
    }
}
