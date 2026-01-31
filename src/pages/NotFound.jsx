import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container py-5 text-center">
      <h1 className="display-5 fw-semibold mb-3">找不到頁面</h1>
      <p className="text-muted mb-4">您輸入的路由不存在，請確認網址是否正確。</p>
      <div className="d-flex gap-2 justify-content-center">
        <Link to="/" className="btn btn-primary">返回首頁</Link>
        <Link to="/products" className="btn btn-outline-secondary">逛逛商品</Link>
      </div>
    </section>
  );
}
