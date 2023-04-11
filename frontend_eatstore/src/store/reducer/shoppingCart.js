import _ from 'lodash'
import { shoppingCartTypes } from '../types/shopping-card-types'

const initState = { products: [] };


export default function shoppingCart(state = initState, action) {
    switch (action.type) {
        case shoppingCartTypes.ADD:
            return {
                ...state,
                products: [action.product, ...state.products || []]
            };
        case shoppingCartTypes.UP_QTY:
            const _fIdx = state.products.findIndex(f => f.id === action.product.id)
            const _qty = _.max([state.products[_fIdx].qty + action.number, 0])
            state.products[_fIdx].qty = _qty
            return {
                ...state,
                products: state.products
            };
        case shoppingCartTypes.REMOVE:
            return {
                ...state,
                products: state.products.filter(f => f.id !== action.product.id)
            }
        case shoppingCartTypes.UPDATE:
            const fIdx = state.products.findIndex(f => f.id === action.product.id)
            state.products[fIdx].qty = state.products[fIdx].qty + action.qty
            return {
                ...state,
                products: state.products
            }
        case shoppingCartTypes.INIT:
            let initProduct = { products: [] }
            return {      
                ...state,
                products: initProduct
            }
        default:
            return state;
    }
}