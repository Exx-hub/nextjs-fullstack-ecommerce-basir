import { Context } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

function Cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { cartItems } = state.cart;

  const updateCartHandler = () => {};
  const removeItemHandler = () => {};
  return (
    <section>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <section className="grid md:grid-cols-4 gap-5">
          <div className="md:col-span-3">
            <table className="min-w-full overflow-x-auto">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`} className="flex items-center">
                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartHandler(item, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        {/* <XCircleIcon className="h-5 w-5"></XCircleIcon> */}
                        <p className="h-5 w-5">X</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-lg">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} item/s) : $
                  {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </section>
      )}
    </section>
  );
}

export default Cart;
