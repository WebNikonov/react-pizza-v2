import { TCartItem } from "../redux/slices/cartSlice";

export const cartTotalPrice = (items: TCartItem[]) => {
   return items.reduce((sum: any, obj: any) =>  (sum += obj.price * obj.count), 0);
}