import { shoppingCartTypes } from "../types/shopping-card-types";

function addProduct(product) {
    return { type: shoppingCartTypes.ADD, product }
}


function removeProduct(product) {
    return { type: shoppingCartTypes.REMOVE, product }
}


function updateProduct(product) {
    return { type: shoppingCartTypes.UPDATE, product }
}


function upQtyProduct(product, number) {
    return { type: shoppingCartTypes.UP_QTY, product, number }
}

function initProduct() {
    return { type: shoppingCartTypes.INIT }
}

export const shoppingCartActions = {
    addProduct,
    removeProduct,
    upQtyProduct,
    updateProduct,
    initProduct
}