import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange, totalElements }) => {

    const handlePageChange = (pageNum) => {
        if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) return;
        onPageChange(pageNum);
    };

    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="row">
            <div className="col-8">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(1)}>First</a>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                        </li>
                        {getPageNumbers().map(pageNum => (
                            <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(pageNum)}>{pageNum}</a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(totalPages)}>Last</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="col-4">
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor="results" className="mr-2 mb-0">Results per page: </label>
                    <select
                        id="results"
                        className="form-control custom-select"
                        style={{ maxWidth: '100px' }}
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="1000">1000</option>
                    </select>
                    <span className="ms-1 me-1"> / Total: </span>
                    <b className="ms-1">{totalElements}</b>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
