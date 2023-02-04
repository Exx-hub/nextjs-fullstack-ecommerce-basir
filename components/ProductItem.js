import Image from "next/image";
import Link from "next/link";

function ProductItem({ product, addToCartHandler }) {
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
        <p className="mb-2">${product.price}</p>
        <button type="button" className="primary-button" onClick={() => addToCartHandler(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
