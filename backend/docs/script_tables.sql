DROP TABLE IF EXISTS loans, books, authors, users CASCADE;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id_user SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  identification VARCHAR(20),
  email VARCHAR(100) UNIQUE ,
  phone VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS books;
CREATE TABLE books(
  isbn VARCHAR(100) PRIMARY KEY,
  title TEXT NOT NULL,
  publication_year INTEGER,
  author VARCHAR(100) DEFAULT NULL
);

DROP TYPE IF EXISTS enum_loan_state;
CREATE TYPE enum_loan_state AS ENUM('activo', 'entregado', 'retrasado');

DROP TABLE IF EXISTS loans;
CREATE TABLE loans(
  id_loan SERIAL PRIMARY KEY,
  id_user INTEGER REFERENCES users(id_user) ON DELETE SET NULL ON UPDATE CASCADE,
  isbn VARCHAR(100) REFERENCES books(isbn) ON DELETE SET NULL ON UPDATE CASCADE,
  loan_date DATE NOT NULL,
  return_date DATE,
  loan_state enum_loan_state NOT NULL,
  CHECK (return_date > loan_date)
);