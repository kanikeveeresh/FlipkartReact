export function calculateTotal(cartItems, quantities) {
    let cartPrice = 0, cartDiscount = 0, cartTotal = 0, cartPackagingFee = 0, cartDelivery = 0;

    cartItems.map(item => {
      let itemQuantity = quantities[item._id] || 1;
      cartPrice += item.price * itemQuantity;
    });

    cartDiscount = Math.floor((cartPrice * 7) / 100);

    cartDelivery = 40 * cartItems.length;

    cartPackagingFee = 20 * cartItems.length;

    cartTotal = cartPrice + cartPackagingFee - cartDiscount + (cartItems.length >= 3 ? 0 : cartDelivery);

    return { cartPrice, cartDiscount, cartDelivery, cartPackagingFee, cartTotal }
}