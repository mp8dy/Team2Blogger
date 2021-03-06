import { RiDeleteBinLine } from "react-icons/ri";
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext.js";
import { CartUpdate } from "../../contexts/CartUpdate.js";

/**
 * Allows signed in users to delete items in their carts. Used in DisplayCart.js
 * @param {Object} props - Contains itemID
 * @returns A button that on click deletes the proper item from the cart and updates the cart automatically
 */
export default function DeleteCartItem(props){
    const { user } = useContext(UserContext);
    const { setUpdate } = useContext(CartUpdate);
    const itemID = props.itemID;
    console.log("item", itemID);
    return (
        <div>
            {user ? <RiDeleteBinLine onClick={() =>
                    fetch(`http://localhost:5000/users/${user.id}/shopping-cart/${itemID}`, {
                      method: "DELETE",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }).then((obj) => {
                      console.log("deleting", obj);
                      setUpdate(Math.random());
                    })
                  }
                /> : null}
        </div>
    );
}