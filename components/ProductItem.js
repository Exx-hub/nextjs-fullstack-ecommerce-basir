import { Context } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

function ProductItem({ product }) {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const addToCartHandler = (product) => {
    const existItem = state.cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      // toast warning here
      alert("Sorry. Product is out of stock.");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          className="rounded shadow w-full"
          width={600}
          height={600}
        />
      </Link>

      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button type="button" className="primary-button" onClick={() => addToCartHandler(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;

/* <Image
src={product.image}
alt={product.name}
className="rounded shadow"
/> */
