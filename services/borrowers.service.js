const db = require('../db');
const moment = require('moment');

module.exports.getAllBorrowers = async () => {
    const query = "SELECT * FROM borrowers";
    const [borrowers] = await db.query(query);
    return borrowers;
};

module.exports.getBorrowerById = async (id) => {
    const query = "SELECT * FROM borrowers WHERE id = ?";
    const [borrower] = await db.query(query, [id]);
    return borrower;
};

module.exports.deleteBorrower = async (id) => {
    const query = "DELETE FROM borrowers WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
};

module.exports.insertBorrower = async (borrowerData) => {
    const { name, email, registered_date } = borrowerData;
    
    // Checking if any required fields are null or undefined
    if (!name || !email || !registered_date) {
        return null;
    }
    const query = 'INSERT INTO borrowers (name, email, registered_date) VALUES (?, ?, ?)';
    const values = [name, email, registered_date];

    const [result] = await db.query(query, values);
    return { id: result.insertId, ...borrowerData };
};

module.exports.updateBorrower = async (borrowerId, updatedBorrowerData) => {
    const { name, email, registered_date } = updatedBorrowerData;

    // Checking if any required fields are null or undefined
    if (!name || !email || !registered_date) {
        return null;
    }

    const query = 'UPDATE borrowers SET name = ?, email = ?, registered_date = ? WHERE id = ?';
    const values = [name, email, registered_date, borrowerId];

    const [result] = await db.query(query, values);
    if (result.affectedRows > 0) {
        return { id: borrowerId, ...updatedBorrowerData };
    }
    return null;
};

