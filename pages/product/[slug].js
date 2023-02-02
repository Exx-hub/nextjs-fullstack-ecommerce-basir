import CustomHeadTag from "@/components/CustomHeadTag";
import { Context } from "@/context/Context";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

function ProductDetailScreen() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { slug } = router.query;

  const product = data.products.find((item) => item.slug === slug);

  if (!product) {
    return <div>Product Not Found!</div>;
  }

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
    <>
      <CustomHeadTag
        title={(product && product.name) || "Acosta Apparel"}
        description={(product && product.description) || "Acosta Apparel Designs"}
      />
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <section className="grid md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <Image src={product.image} alt={product.name} width={640} height={640} />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5 ">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={() => addToCartHandler(product)}>
              Add to cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetailScreen;
