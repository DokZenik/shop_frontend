import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({maxPagesCount, changePage, currentPage}) => {

  let pages = []
  for (let i = 0; i < maxPagesCount; i++) {
    pages.push(i + 1)
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map(elem => {
            if(elem === currentPage + 1)
                return (
            <li className={`page-item active`} key={elem} onClick={() => changePage(elem - 1)}>
              <Link className="page-link" to={"#"}>
                {elem}
              </Link>
            </li>
                )
            else
                return (
                    <li className={`page-item`} key={elem} onClick={() => changePage(elem - 1)}>
                        <Link className="page-link" to={"#"}>
                            {elem}
                        </Link>
                    </li>
                )
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
