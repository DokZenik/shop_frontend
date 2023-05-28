import React from "react";
import {useHistory} from "react-router-dom";

const SavePage = ({currentPage}) => {
    const history = useHistory();

    const stayOnPage = () => {
        history.push(currentPage)
    }

    return(
        <div></div>
    )
}
export default SavePage