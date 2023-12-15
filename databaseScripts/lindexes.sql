-- Index 1: Title
CREATE INDEX idx_title ON books(title);

-- Index 2: Author
CREATE INDEX idx_author ON books(author);

-- Index 3: ISBN
CREATE INDEX idx_ISBN ON books(ISBN);

-- Index 4: Title + Author
CREATE INDEX idx_title_author ON books(title, author);

-- Index 5: Title + ISBN
CREATE INDEX idx_title_ISBN ON books(title, ISBN);

-- Index 6: Author + ISBN
CREATE INDEX idx_author_ISBN ON books(author, ISBN);

-- Index 7: Title + Author + ISBN
CREATE INDEX idx_all_columns ON books(title, author, ISBN);

-- Index 8: is_returned
CREATE INDEX idx_is_returned ON borrowings(is_returned);

-- Index 9: book_id
CREATE INDEX idx_book_id ON borrowings(book_id);

-- Index 10: borrower_id
CREATE INDEX idx_borrower_id ON borrowings(borrower_id);

-- Index 11: For is_returned and borrower_id
CREATE INDEX idx_is_returned_borrower_id ON borrowings(is_returned, borrower_id);

-- Index 12: For book_id and is_returned
CREATE INDEX idx_book_id_is_returned ON borrowings(book_id, is_returned);

-- Index 13: For book_id, borrower_id, and is_returned
CREATE INDEX idx_book_id_borrower_id_is_returned ON borrowings(book_id, borrower_id, is_returned);
