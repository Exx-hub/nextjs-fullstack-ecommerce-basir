import { Context } from "@/context/Context";
import Link from "next/link";
import { useContext } from "react";

function Navbar() {
  const { state } = useContext(Context);
  console.log(state);

  const cartQuantity = state.cart.cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <header>
      <nav className="flex justify-between items-center py-3 px-4 shadow-md">
        <Link href="/" className="text-lg font-bold">
          acosta apparel
        </Link>

        <div>
          <Link href="/cart" className="p-2">
            Cart {state.cart.cartItems.length > 0 && <span className="badge">{cartQuantity}</span>}
          </Link>
          <Link href="/login" className="p-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
