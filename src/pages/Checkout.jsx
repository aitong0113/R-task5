import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitOrder } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    tel: '',
    address: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = () => {
    submitOrder({
      user: {
        name: form.name,
        email: form.email,
        tel: form.tel,
        address: form.address,
      },
      message: form.message,
    })
      .then((data) => {
        if (data?.success) {
          const orderId = data.orderId || data.order?.id || data.data?.orderId;
          if (orderId) {
            navigate(`/order-success/${orderId}`);
          } else {
            alert('訂單建立成功！但未取得訂單編號');
            navigate('/');
          }
        } else {
          alert(data?.message || '訂單建立失敗，請確認資料');
        }
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || err.message || '送出訂單時發生錯誤';
        alert(msg);
      });
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4">結帳</h1>

      {/* 表單 */}
      <div className="mb-3">
        <label className="form-label">姓名</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="請輸入姓名"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@mail.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">電話</label>
        <input
          type="tel"
          className="form-control"
          name="tel"
          value={form.tel}
          onChange={handleChange}
          placeholder="0912345678"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">地址</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="請輸入寄送地址"
        />
      </div>

      <div className="mb-4">
        <label className="form-label">備註</label>
        <textarea
          className="form-control"
          rows="3"
          name="message"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      {/* 操作按鈕 */}
      <div className="d-flex justify-content-between">
        <Link to="/cart" className="btn btn-outline-secondary">
          ← 返回購物車
        </Link>
        <button
          className="btn btn-primary"
          onClick={submit}
        >
          送出訂單
        </button>
      </div>
    </div>
  );
}