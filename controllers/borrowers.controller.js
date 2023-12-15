const express = require('express');
const router = express.Router();
const borrowerService = require('../services/borrowers.service');

router.get('/borrowers', async (req, res) => {
    const borrowers = await borrowerService.getAllBorrowers();
    res.send(borrowers);
});


router.get('/borrowers/:id', async (req, res) => {
    const borrower = await borrowerService.getBorrowerById(req.params.id);

    if (borrower.length === 0) {
        res.status(404).json('No borrower with given id: ' + req.params.id);
    } else {
        res.send(borrower);
    }
});

router.delete('/borrowers/:id', async (req, res) => {
    const affectedRows = await borrowerService.deleteBorrower(req.params.id);

    if (affectedRows > 0) {
        res.send('Borrower deleted successfully');
    } else {
        res.status(404).json('No borrower with given id: ' + req.params.id);
    }
});

router.post('/borrowers', async (req, res) => {
    console.log(req.body)
    const addedBorrower = await borrowerService.insertBorrower(req.body);

    if (addedBorrower) {
        res.status(200).json(addedBorrower);
    } else {
        res.status(500).json('Something went wrong!');
    }
});

router.put('/borrowers/:id', async (req, res) => {
    const borrowerId = req.params.id;
    const updatedBorrower = await borrowerService.updateBorrower(borrowerId, req.body);

    if (updatedBorrower) {
        res.status(200).json(updatedBorrower);
    } else {
        res.status(500).json('Something went wrong!');
    }
});

module.exports = router;
