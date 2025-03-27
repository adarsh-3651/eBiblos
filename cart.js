import { useState } from "react";

const cartItems = [
  { title: "Atomic Habits", price: 500, quantity: 2 },
  { title: "Jungle Book", price: 700, quantity: 3 },
];

export default function Cart() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="bg-red-500 text-white p-4 my-2 rounded">
          <h3 className="text-lg">{item.title}</h3>
          <p>Price: Rs. {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: Rs. {item.price * item.quantity}</p>
        </div>
      ))}
      <button className="mt-4 bg-black text-white px-6 py-2 rounded">Checkout</button>
    </div>
  );
}
