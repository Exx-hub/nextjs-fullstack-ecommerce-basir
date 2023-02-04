import { Context } from "@/context/Context";
import Link from "next/link";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

function Navbar() {
  const { state } = useContext(Context);
  const { data: session, status } = useSession();

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

          {session?.user ? (
            <a className="p-2">{session.user.name}</a>
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
