export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const total = Math.max(1, totalPages);

  const handleChange = (p) => {
    if (p < 1 || p > total || p === currentPage) return;
    onPageChange?.(p);
  };

  return (
    <nav aria-label="頁碼導覽">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handleChange(currentPage - 1)}>上一頁</button>
        </li>

        {Array.from({ length: total }).map((_, idx) => {
          const p = idx + 1;
          return (
            <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleChange(p)}>{p}</button>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === total ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handleChange(currentPage + 1)}>下一頁</button>
        </li>
      </ul>
    </nav>
  );
}
