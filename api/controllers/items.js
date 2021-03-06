const ItemController = (app, db) => {
  app.get("/items", (req, res) => {
    const items = [];
    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
      })
      .then(() => res.json(items));
  });

  app.post("/items", (req, res) => {
    const item = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };

    if (!item.name || !item.description || !item.price || !item.image) {
      res.status(400).json({ msg: "Post request data not valid" });
    }

    db.collection("items")
      .add(item)
      .then((doc) => {
        res.json({ ...item, id: doc.id });
      })
      .catch(() => {
        res.status(400).json({ msg: "Error creating item" });
      });
  });

  app.put("/items/:id", async (req, res) => {
    const item = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };

    if (!item.name || !item.description || !item.price || !item.image) {
      res.status(400).json({ msg: "PUT request data not valid" });
    }

    db.collection("items")
      .doc(req.params.id)
      .set(item)
      .then((doc) => {
        res.json({ ...item, id: doc.id });
      })
      .catch(() => {
        res.status(400).json({ msg: "Error updating item" });
      });
  });

  app.delete("/items/:id", (req, res) => {
    db.collection("items")
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.json({ msg: `Item with ID ${req.params.id} deleted` });
      })
      .catch(() => {
        res
          .status(400)
          .json({ msg: `Error deleting item with ID ${req.params.id}` });
      });
  });
};

module.exports = ItemController;
