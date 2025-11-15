import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    await axios.get(`http://localhost:5000/api/cart`).then((res) => { setCart(res.data); console.log(res.data) }).catch((err) => console.log(err));
    console.log("cart products fetched successfully");
  };
  const totalquantity = () => {
    var quantity = 0;
    cart.map((item) => quantity += item.quantity);
    return quantity;
  }
  const totalamount = () => {
    var amount = 0;
    cart.map((item) => amount += item.price * item.quantity);
    return amount;
  }
  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    fetchCart();
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQty = async (id) => {
    await axios.post(`http://localhost:5000/api/cart/increment/${id}`);
    fetchCart();
  };

  const decreaseQty = async (id) => {
    await axios.post(`http://localhost:5000/api/cart/decrement/${id}`);
    fetchCart();
  };

  return (
    <div className="bg-indigo-100 h-screen">
      <div className="p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Your Cart</h2>
        <div className="flex justify-between  flex-col md:flex-row gap-10 mt-2 ml-10 mr-10 mb-5">

          <div className="border-4 p-10 bg-white w-[700px] max-h-[600px] overflow-y-scroll">
            <p className=" flex border bg-blue-200 p-2 rounded-lg border-slate-400 max-w-fit text-xl">Cart Value :  {totalquantity()}</p>
            {cart?.length === 0 ? (
              <p className="text-gray-600 ml-28 mt-12">Cart is empty.</p>
            ) : (
              cart?.map((item, i) => (
                <div key={i} className="flex justify-between items-center gap-2 border-b py-4">
                  <div className="flex justify-between items-center gap-2">
                    <img src={item?.image} alt={item?.name} width={"60px"} height={"60px"} />
                    <p className="font-semibold line-clamp-2">{item?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex justify-between items-baseline"><span>₹</span> {item?.price}</p>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQty(item?._id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span className="mx-3 font-semibold">{item?.quantity}</span>

                    <button
                      onClick={() => increaseQty(item?._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      +
                    </button>
                    <div>
                      <button
                        onClick={() => remove(item?._id)}
                        className="px-3 ml-3 py-1 bg-red-400 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 mr-24 border-t p-12 bg-white w-[500px] max-h-fit pt-4">
            <h3 className="border-b-2 border-b-black text-lg font-bold mb-7">Price Details</h3>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Total Items: {totalquantity()}</h3>
              <h3 className="text-lg font-semibold">Price ({totalquantity()} items): ₹ {totalamount()}</h3>

              <button
                onClick={() => alert("✅ Fake Checkout Completed")}
                className="mt-4 bg-green-600 w-full text-white py-3 rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
