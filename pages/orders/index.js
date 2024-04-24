import axios from 'axios';
import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/order').then((response) => {
      setOrders(response.data);
    });
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pesanan</h1>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Pesanan #{index + 1}</h2>
                <h3 className="text-gray-600 mb-2">Id: {order._id}</h3>
                <h3 className="text-md font-medium mb-2">Dari: {order.name}</h3>
                <h3 className="text-md font-medium mb-2">Email: {order.email}</h3>
              </div>
              <div>
                <h3 className="text-md font-medium mb-2">Negara: {order.country}</h3>
                <h3 className="text-md font-medium mb-2">Alamat: {order.address}</h3>
                <h3 className="text-md font-medium mb-2">Kota: {order.city}</h3>
                <h3 className="text-gray-600 mb-2">Kode Pos: {order.zip}</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4">Produk</th>
                    <th className="py-2 px-4">Kuantitas</th>
                    <th className="py-2 px-4">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {order.line_items &&
                    order.line_items.map((product) => (
                      <tr key={product.id}>
                        <td className="py-2 px-4">{product.price_data?.product_data?.name}</td>
                        <td className="py-2 px-4">{product.quantity}</td>
                        <td className="py-2 px-4">Rp. {formatPrice(product.price_data?.unit_amount / 100)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
