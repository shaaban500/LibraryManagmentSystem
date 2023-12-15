const db = require('../db')

module.exports.getAllBooks = async() => {
    const query = "SELECT * FROM books"
    const [books] = await db.query(query)
    return books;
}

module.exports.getBookById = async(id) => {
    const query = "SELECT * FROM books WHERE id = ?";
    const [book] = await db.query(query, [id])
    return book;
}

module.exports.deleteBook = async(id) => {
    const query = "DELETE FROM books WHERE id = ?";
    const [result] = await db.query(query, [id])
    return result.affectedRows;
}



module.exports.insertBook = async (bookData) => {
    const { title, author, ISBN, quantity, shelf_location } = bookData;

    // Checking if any required fields are null or undefined
    if (!title || !author || !ISBN || !quantity || !shelf_location) {
        return null;
    }

    const query = 'INSERT INTO books (title, author, ISBN, quantity, shelf_location) VALUES (?, ?, ?, ?, ?)';
    const values = [title, author, ISBN, quantity, shelf_location];

    const [result] = await db.query(query, values);
    return { id: result.insertId, ...bookData };
};




module.exports.updateBook = async (bookId, updatedBookData) => {
    const { title, author, ISBN, quantity, shelf_location } = updatedBookData;

    // Checking if any required fields are null or undefined
    if (!title || !author || !ISBN || !quantity || !shelf_location) {
        return null;
    }

    const query = 'UPDATE books SET title = ?, author = ?, ISBN = ?, quantity = ?, shelf_location = ? WHERE id = ?';
    const values = [title, author, ISBN, quantity, shelf_location, bookId];

    const [result] = await db.query(query, values);
    if (result.affectedRows > 0) {
        return { id: bookId, ...updatedBookData }; 
    }
    return null;
};




module.exports.searchBooks = async (searchQuery) => {
    const title = searchQuery.title;
    const author = searchQuery.author;
    const ISBN = searchQuery.ISBN;

    let query = 'SELECT * FROM books WHERE 1 = 1'; // Base query

    const values = [];

    if (title) {
        query += ' AND title LIKE ?';
        values.push(`%${title}%`);
    }
    if (author) {
        query += ' AND author LIKE ?';
        values.push(`%${author}%`);
    }
    
    if (ISBN) {
        query += ' AND ISBN = ?';
        values.push(ISBN);
    }
    const [searchResults] = await db.query(query, values);
    return searchResults;
};
