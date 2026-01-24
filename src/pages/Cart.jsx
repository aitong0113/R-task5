import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;
const PATH = import.meta.env.VITE_API_PATH;



export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ carts: [] });

  const getCart = () => {
    fetch(`${API_BASE}/api/${PATH}/cart`)
      .then(res => res.json())
      .then(data => {
        setCart(data.data);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  const updateQty = (cartItem, qty) => {
    fetch(`${API_BASE}/api/${PATH}/cart/${cartItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          product_id: cartItem.product.id,
          qty,
        },
      }),
    })
      .then(res => res.json())
      .then(() => getCart());
  };

  const removeItem = (cartId) => {
    fetch(`${API_BASE}/api/${PATH}/cart/${cartId}`, {
      method: 'DELETE',
    }).then(() => getCart());
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">購物車</h1>

      {cart.carts.length === 0 ? (
        <p className="text-muted">購物車目前是空的</p>
      ) : (
        <>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>商品</th>
                <th className="text-center">數量</th>
                <th className="text-end">小計</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.carts.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex gap-3 align-items-center">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        style={{ width: 80, borderRadius: 8 }}
                      />
                      {item.product.title}
                    </div>
                  </td>
                  <td className="text-center" style={{ width: 140 }}>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQty(item, item.qty - 1)}
                        disabled={item.qty === 1}
                      >
                        −
                      </button>

                      <span style={{ minWidth: 24, textAlign: 'center' }}>
                        {item.qty}
                      </span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQty(item, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-end">
                    NT${item.final_total}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h5>總金額：NT${cart.final_total}</h5>
          </div>

          <div className="text-end mt-3">
            <Link to="/products" className="btn btn-outline-secondary me-2">
              繼續選購
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/checkout')}
            >
              前往結帳
            </button>
          </div>
        </>
      )}
    </div>
  );
}