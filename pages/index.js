import axios from "axios";
import { Context } from "@/context/Context";
import { useContext } from "react";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
import db from "@/utils/db";
import { toast } from "react-toastify";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Context);

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
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <ProductItem key={item.slug} product={item} addToCartHandler={addToCartHandler} />
      ))}
    </section>
  );
}

export const getServerSideProps = async () => {
  await db.connect();

  const products = await Product.find().lean();

  // i think is best way?
  const convertedProducts = products.map((product) => db.convertDocToObj(product));

  // long cut
  // const convertedProducts = products.map((product) => {
  //   product._id = product._id.toString();
  //   product.createdAt = product.createdAt.toString();
  //   product.updatedAt = product.updatedAt.toString();

  //   return product;
  // });

  //shortcut
  // products.map((doc) => {
  //   doc._id = doc._id.toString();
  //   doc.createdAt = doc.createdAt.toString();
  //   doc.updatedAt = doc.updatedAt.toString();
  //   return doc
  // })

  // super shortcut
  // products.map(db.convertDocToObj)
  return {
    props: {
      products: convertedProducts,
    },
  };
};
