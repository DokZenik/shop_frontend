import {useState} from "react";


const CartItemCounter = ({counter, elemId, increment, decrement}) => {

    const [count, setCount] = useState(counter);

    return (
        <div className="counter__wrapper">
            <button className="plus" onClick={() => {
                setCount(count + 1)
                increment(elemId)
            }
            }>
                +
            </button>
            <div className="count">
                <p>{count}</p>
            </div>

            <button className="minus" onClick={() => {
                if (count > 1) {
                    setCount(count - 1)
                    decrement(elemId)
                }
            }}>
                -
            </button>
        </div>
    )
}
export default CartItemCounter