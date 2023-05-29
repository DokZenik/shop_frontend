import React from "react";
import {Link} from "react-router-dom";

const Pagination = ({maxPagesCount, changePage, currentPage}) => {

    let pages = []
    for (let i = 0; i < maxPagesCount; i++) {
        pages.push(i + 1)
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">

                {currentPage === 0
                    ? <li className={`page-item active`} onClick={() => changePage(pages[0] - 1)}>
                        <Link className="page-link" to={"#"}>
                            {pages[0]}
                        </Link>
                    </li>
                    : <li className={`page-item`} onClick={() => changePage(pages[0] - 1)}>
                        <Link className="page-link" to={"#"}>
                            {pages[0]}
                        </Link>
                    </li>
                }


                {currentPage - 2 > 0
                    ? <li className={`page-item dots`}>
                        <div className="page-link">
                            ...
                        </div>
                    </li>
                    : null
                }


                {currentPage - 1 > 0
                    ? <li className={`page-item `} onClick={() => changePage(currentPage - 1)}>
                        <Link className="page-link" to={"#"}>
                            {pages[currentPage - 1]}
                        </Link>
                    </li>
                    : null
                }

                {currentPage !== 0 && currentPage !== pages.length - 1
                    ? <li className={`page-item active`}>
                        <Link className="page-link" to={"#"}>
                            {pages[currentPage]}
                        </Link>
                    </li>
                    : null
                }

                {currentPage + 1 < pages.length - 1
                    ? <li className={`page-item `} onClick={() => changePage(currentPage + 1)}>
                        <Link className="page-link" to={"#"}>
                            {pages[currentPage + 1]}
                        </Link>
                    </li>
                    : null
                }


                {currentPage + 2 < pages.length - 1
                    ? <li className={`page-item dots`}>
                        <div className="page-link">
                            ...
                        </div>
                    </li>
                    : null
                }


                {pages.length !== 1
                    ? currentPage === pages.length - 1
                        ?
                        <li className={`page-item active`} onClick={() => changePage(pages[pages.length - 1] - 1)}>
                            <Link className="page-link" to={"#"}>
                                {pages[pages.length - 1]}
                            </Link>
                        </li>
                        : <li className={`page-item`} onClick={() => changePage(pages[pages.length - 1] - 1)}>
                            <Link className="page-link" to={"#"}>
                                {pages[pages.length - 1]}
                            </Link>
                        </li>
                    : null
                }

            </ul>
        </nav>
    );
};

export default Pagination;
