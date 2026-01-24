import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;
const PATH = import.meta.env.VITE_API_PATH;

const addToCart = (productId) => {
  fetch(`${API_BASE}/api/${PATH}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        product_id: productId,
        qty: 1,
      },
    }),
  })
    .then(res => res.json())
    .then(() => {
      alert('已加入購物車');
    });
};


export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/${PATH}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-3">專注與放鬆的聲音選品</h1>

      <p className="text-muted mb-4 col-md-8">
        為長時間工作、學習與情緒調節而挑選的聲音設備，
        協助你在日常生活中建立專注、安定與放鬆的聆聽空間。
      </p>

      <div className="row g-4">
        {products.map(product => (
          <div className="col-md-6 col-lg-4" key={product.id}>
            <div className="card h-100 shadow-sm">

              {/* 圖片區（新品疊在上面） */}
              <div className="position-relative">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: 200, objectFit: 'cover' }}
                />

                {product.is_new === 1 && (
                  <span
                    className="badge bg-success position-absolute"
                    style={{
                      top: 12,
                      left: 12,
                      fontSize: 12,
                      boxShadow: '0 2px 6px rgba(0,0,0,.2)',
                    }}
                  >
                    新品
                  </span>
                )}
              </div>

              {/* 文字內容 */}
              <div className="card-body d-flex flex-column">
                <small className="text-muted">
                  {product.category}
                </small>

                <h5 className="card-title mt-2">
                  {product.title}
                </h5>

                <p className="mt-auto mb-2">
                  <strong className="fs-5">
                    NT${product.price}
                  </strong>
                  <del className="text-muted ms-2">
                    NT${product.origin_price}
                  </del>
                </p>
                
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => addToCart(product.id)}
                >
                  加入購物車
                </button>

                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  查看商品詳情
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}