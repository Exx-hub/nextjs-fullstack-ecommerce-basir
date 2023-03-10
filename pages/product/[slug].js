import axios from "axios";
import CustomHeadTag from "@/components/CustomHeadTag";
import { Context } from "@/context/Context";
import Product from "@/models/Product";

import db from "@/utils/db";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductDetailScreen({ product }) {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  if (!product) {
    return (
      <>
        <CustomHeadTag title="Product not found." description="Product not found." />
        <div>Product Not Found!</div>;
      </>
    );
  }

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    console.log({ data });

    if (data.countInStock < quantity) {
      return toast.error("Sorry, stock limit reached.");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Added to Cart!");
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

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  await db.connect();

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
