CREATE DATABASE IF NOT EXISTS my_db;
USE my_db;

CREATE TABLE categories (
  categoryName VARCHAR(100) PRIMARY KEY NOT NULL,
  createdAt VARCHAR(100) NOT NULL,
  categoryDescription VARCHAR(200) NOT NULL
) ENGINE=INNODB;

CREATE TABLE recipes (
  recipeId VARCHAR(100) PRIMARY KEY,
  recipeTitle VARCHAR(100) NOT NULL,
  recipeAuthor VARCHAR(100) NOT NULL,
  createdAt VARCHAR(100) NOT NULL,
  recipeContent VARCHAR(10000) NOT NULL,
  recipeCategory VARCHAR(100),
  CONSTRAINT fk_category FOREIGN KEY (recipeCategory)
  REFERENCES categories(categoryName)
) ENGINE=INNODB;
