import { Context } from "@/context/Context";
import Link from "next/link";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import DropdownMenu from "./DropdownMenu";
import Cookies from "js-cookie";

function Navbar() {
  const { state, dispatch } = useContext(Context);
  const { data: session, status } = useSession();

  const cartQuantity = state.cart.cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handleLogout = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header>
      <nav className="flex justify-between items-center py-3 px-4 shadow-md">
        <Link href="/" className="text-lg font-bold text-black hover:text-black">
          acosta apparel
        </Link>

        <div>
          <Link href="/cart" className="p-2">
            Cart {state.cart.cartItems.length > 0 && <span className="badge">{cartQuantity}</span>}
          </Link>

          {session?.user ? (
            <DropdownMenu userName={session.user.name} handleLogout={handleLogout} />
          ) : (
            <Link href="/login" className="p-2">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
