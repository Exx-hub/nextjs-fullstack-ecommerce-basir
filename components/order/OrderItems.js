import Image from "next/image";
import Link from "next/link";

function OrderItems({ items, isEdit }) {
  console.log({ items });
  return (
    <div className="card overflow-x-auto p-5">
      <h2 className="mb-2 text-lg">Order Items</h2>
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="px-5 text-left">Item</th>
            <th className="p-5 text-right">Quantity</th>
            <th className=" p-5 text-right">Price</th>
            <th className="p-5 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.slug} className="border-b">
              <td>
                <Link href={`/product/${item.slug}`} className="flex items-center">
                  <Image src={item.image} alt={item.name} width={50} height={50} />
                  &nbsp;
                  {item.name}
                </Link>
              </td>
              <td className="p-5 text-right">{item.quantity}</td>
              <td className="p-5 text-right">${item.price}</td>
              <td className="p-5 text-right">${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEdit && (
        <div>
          <Link href="/cart">Edit</Link>
        </div>
      )}
    </div>
  );
}

export default OrderItems;
