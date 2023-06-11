import React, {useMemo, useState} from "react";
import {useFetching} from "../utils/CustomHooks/useFetching";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Preloader from "../utils/Preloader/Preloader";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const history = useHistory()

    const [loadOrders, areOrdersLoading, error] = useFetching(() => {
        axios.get(`http://localhost:5000/api/history/getAll/${localStorage.getItem("email")}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => setOrders(res.data)).catch(e => history.push("/login/403"))
    })

    useMemo(() => {
      loadOrders()
    }, [])
    return (
        <div className=" d-flex justify-content-center align-items-center flex-column">
            {/* <div className="col-12 alert alert-info text-center mt-3">
        No Orders
        <Link
          className="btn btn-success mx-2 px-3 py-2"
          to="/"
          style={{
            fontSize: "12px",
          }}
        >
          START SHOPPING
        </Link>
      </div> */}

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*<tr className={"alert-success"}>*/}
                    {/*  <td>*/}
                    {/*    <a href={`/`} className="link">*/}
                    {/*      1*/}
                    {/*    </a>*/}
                    {/*  </td>*/}
                    {/*  <td>Paid</td>*/}
                    {/*  <td>Dec 12 2021</td>*/}
                    {/*  <td>$234</td>*/}
                    {/*</tr>*/}
                    {/*/!* Cancelled *!/*/}
                    {/*<tr className={"alert-danger"}>*/}
                    {/*  <td>*/}
                    {/*    <a href={`/`} className="link">*/}
                    {/*      2*/}
                    {/*    </a>*/}
                    {/*  </td>*/}
                    {/*  <td>Not Paid</td>*/}
                    {/*  <td>Dec 12 2021</td>*/}
                    {/*  <td>$34</td>*/}
                    {/*</tr>*/}
                    {areOrdersLoading
                        ? <Preloader/>
                        : orders.map(item => (
                            <tr className={"alert-success"}>
                                <td>
                                    <a href={`/`} className="link">
                                      {item._id}
                                    </a>
                                </td>
                                <td>
                                  {item.status}
                                </td>
                                <td>
                                    {item.createdAt.slice(0, 10)}
                                </td>
                                <td>
                                    {item.total}$
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
