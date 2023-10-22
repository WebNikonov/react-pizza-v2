import { cartTotalPrice } from "./calcTotalPrice";

export const getItemsFromLs = () => {
let data = localStorage.getItem('cart');
const items = data ? JSON.parse(data) : [];
const totalPrice  = cartTotalPrice(items);

return {
    items,
    totalPrice,
}


}