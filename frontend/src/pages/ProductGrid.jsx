import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [enabled, setEnabled] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      await axios.get("http://localhost:5000/api/products").then((res) => {
        setProducts(res.data)
        console.log(res.data)
      }).catch((err) => console.log(err))
    }
    fetchproducts();
    fetchcartproducts();
  }, []);

  const fetchcartproducts = async () => {
    console.log("fetch cart products method is called")
    await axios.get("http://localhost:5000/api/cart").then((res) => {
      setEnabled(res.data.map((item) => item.id));
      console.log(res.data)
    }).catch((err) => console.log(err))
    console.log("cart products fetched successfully");
  }

  const addToCart = async (p) => {
    console.log(p);
    console.log("addToCart method is called")
    await axios.post("http://localhost:5000/api/cart", {
      id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      quantity: 1
    }).catch((err)=> console.log(err));
    console.log("add cart method is called");
    fetchcartproducts();
    console.log("fetched products method is also called")
  };

  const check = (Id) => { return enabled.includes(Id) }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((p,key )=> (
          <div key={key} className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-700 font-bold">₹ {p.price}</p>
            {check(p._id) ?
              <Link to={"/cart"}>
                <button
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Go to card
                </button></Link> :
              <button
                onClick={() => addToCart(p)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              > Add to cart
              </button>}
          </div>
        ))}
      </div>
    </div>
  );
}
