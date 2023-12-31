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
    console.log({bookId, returnDate})
    const result = await db.query(returnProcedure, returnParams);
    console.log(222)
    return result;
};
 

module.exports.getBorrowedBooksByUserId = async (borrowerId) => {
    const query = `
      SELECT *
      FROM books
      WHERE books.Id IN (SELECT book_id FROM borrowings WHERE borrower_id = ? AND is_returned = FALSE);
    `;

    const [borrowedBooks] = await db.query(query, [borrowerId]);
    return [borrowedBooks];
};


module.exports.getOverDueBooks = async (overDueDate) => {
    const query = `
        SELECT *
        FROM books bk
        JOIN borrowings bw
        WHERE bk.Id = bw.book_id AND is_returned = FALSE AND due_date < ?;
    `;
    console.log(overDueDate)
    const [overDueBooks] = await db.query(query, [overDueDate]); // Assuming overDueDate is in a compatible format
    return [overDueBooks];
};
