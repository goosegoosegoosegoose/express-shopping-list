const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");
const ExpressError = require("../expressError");

router.get("/", (req, res) => {
    return res.json(items);
});

router.post("/", (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new ExpressError("Items required", 404);
    };
    const newItem = {name: req.body.name, price: req.body.price};
    items.push(newItem);
    return res.status(201).json({added: newItem});
});

router.get("/:name", (req, res) => {
    const findItem = items.find(item => item.name === req.params.name);
    if (!findItem) {
        throw new ExpressError("Item not found", 404)
    }
    return res.json(findItem);
});

router.patch("/:name", (req, res) => {
    const findItem = items.find(item => item.name === req.params.name);
    if (!findItem) {
        throw new ExpressError("Item not found", 404)
    };
    findItem.name = req.body.name;
    findItem.price = req.body.price;
    return res.json({updated: findItem});
});

router.delete("/:name", (req, res) => {
    const findItem = items.find(item => item.name === req.params.name);
    if (!findItem) {
        throw new ExpressError("Item not found", 404)
    };
    items.splice(findItem, 1)
    return res.json({message: "deleted"});
});

module.exports = router;

// nodemon no run