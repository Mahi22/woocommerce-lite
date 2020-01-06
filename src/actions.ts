import { from, empty } from 'rxjs';
import { filter, map, expand, concatMap, tap } from 'rxjs/operators';
import { createAuth } from './base';

export function createWooCommerceAuth({ props: { credentials } }: any) {
    return { authFetch: createAuth(credentials) }
}

export function fetchProducts$({ props: { authFetch, perPageLimit = 100 }}) {
    var pageNumber = 1;

    function fetcher(page = 0) {
        return  from(authFetch.get('products', {
            offset: page * perPageLimit,
            per_page: perPageLimit,
        })).pipe(
            filter((response: { status: number}) => response.status === 200),
            map((response: any) => response.data)
        );
    }

    return {
        products$: fetcher().pipe(
            // tap(val => console.log(pageNumber, val.length)),
            expand(products => {
                return  products.length === perPageLimit ? fetcher(pageNumber++) : empty();
            }), // []
            concatMap(o => o)
        )
    }
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
            }), // []
            concatMap(o => o),
            concatMap((o: any) => o.line_items.map(item => ({ item, orderItemId: `${o.id}::${item.id}`, ...o })))
        )
    }
} 

export async function validateAuth({ props: { authFetch } }: any) {
    const response = await authFetch.get('');
    console.log('Getting Response');
    return { valid: response.status === 200 ? true : false };
}
