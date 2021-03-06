import { RiEditBoxLine } from "react-icons/ri";
import { useState, useContext } from 'react';
import { UserContext } from "../../contexts/UserContext.js";
import { CartUpdate } from "../../contexts/CartUpdate.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

/**
 * Allows signed in users to edit the quantities of items in their carts. Used in DisplayCart.js
 * @param {Object} props - Contains itemID and itemQuantity
 * @returns A button to open the edit modal and the edit modal itself
 */
export default function EditCartItem(props) {
    const { user } = useContext(UserContext);
    const { setUpdate } = useContext(CartUpdate);

    // Controls for Edit Modal ---------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ------------------------------------

    // Values for editing fields -----------
    const [quantity, setQuantity] = useState(props.itemQuantity);
    const id = props.itemID;
    // ------------------------------------

    // Handling edit submission -----------
    function handleSubmit() {
        console.log(`http://localhost:5000/items/update/${id}`)
        fetch(`http://localhost:5000/users/${user.id}/shopping-cart/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item_id: id,
                quantity: quantity,
            }),
        }).then(() => {
            setUpdate(Math.random());
        });
        setShow(false);
    }
    // ------------------------------------
    return (
        <div>
            <RiEditBoxLine onClick={handleShow} />

            {/* Edit Modal */}
            <Modal show={show} onHide={handleClose}>
                {/* Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quantity of {props.itemName}</Modal.Title>
                </Modal.Header>

                {/* Body */}
                <Modal.Body>
                    <Form.Group>

                        {/* Item Quantity */}
                        <Form.Row>
                            <Form.Label column="md" lg={2}>
                                Quantity
                    </Form.Label>
                            <Col>
                                <Form.Control size="lg" type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Modal.Body>
                <br /> <br /> <br />
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button style={{ float: "right", backgroundColor:"#4C6357", border:"none" }} variant="primary" onClick={handleSubmit}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}