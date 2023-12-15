const db = require('../db');

module.exports.checkoutBook = async (bookId, borrowerId, checkoutDate, dueDate) => {
    const checkoutProcedure = 'CALL CheckoutBook(?, ?, ?, ?)';
    const checkoutParams = [bookId, borrowerId, checkoutDate, dueDate];
    const result = await db.query(checkoutProcedure, checkoutParams);
    return result;
};

module.exports.returnBook = async (bookId, returnDate) => {
    const returnProcedure = 'CALL ReturnBook(?, ?)';
    const returnParams = [bookId, returnDate];
    const result = await db.query(returnProcedure, returnParams);
    return result;
};

