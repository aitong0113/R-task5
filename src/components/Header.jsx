import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        {/* 品牌 */}
        <NavLink className="navbar-brand fw-bold" to="/">
          InnerSound
        </NavLink>

        {/* 手機版按鈕 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 選單 */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'fw-bold text-primary' : ''}`
                }
              >
                首頁
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'fw-bold text-primary' : ''}`
                }
              >
                產品
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'fw-bold text-primary' : ''}`
                }
              >
                購物車
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}