import { useState, useEffect } from 'react';
import DisplayItems from './DisplayItems';
import Cart from './Cart';

export default function Store() {
    // Fetch request to get store items
    const [items, setItems] = useState([]); // array of items

    const getItems = () => {
        fetch("http://localhost:5000/items")
            .then((res) => {
                return res.json();
            })
            .then((obj) => {
                if (obj != null) {
                    console.log("API CALL", obj);
                    if (obj.length === 0) { // if obj array is empty, make it a dummy object
                        obj = [{
                            "price": 0,
                            "name": "Items not found",
                            "description": "Items not found",
                            "image": "",
                            "id": "notFound"
                        }];
                    }
                    setItems(obj);
                } else {
                    console.log("Error");
                }
            });
    };
    useEffect(() => {
        getItems();
    }, []); // add something to this dependency array later


    return (
        <div>
            {/* Header */}
            <div className="Header">
                <h1 style={{ padding: "15px" }}>Store</h1>

            </div>

            {/* Cart */}
            <Cart />
            <br />

            {/* Item Cards */}
            <div className="CardContainer" style={{ margin: "auto", width: "100%" }}>
                <DisplayItems items={items} />
            </div>
        </div>
    );
}