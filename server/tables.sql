CREATE TABLE products(
    product_id SERIAL PRIMARY KEY NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    image JSONB NOT NULL,
    category VARCHAR(255) NOT NULL,
    category_image JSONB NOT NULL,
    new BOOLEAN NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    weight NUMERIC(5, 2) NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL,
    includes JSONB NOT NULL,
    gallery JSONB NOT NULL,
    others JSONB NOT NULL);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    email_verified BOOLEAN NOT NULL);

CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW());

CREATE TABLE cart_items(
    cart_item_id INT NOT NULL UNIQUE,
    cart_id INT REFERENCES carts(cart_id),
    product_id INT REFERENCES products(product_id),
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    total NUMERIC(5, 2) NOT NULL,
    weight NUMERIC(5, 2) NOT NULL);

CREATE TABLE verifications(
    verification_id SERIAL PRIMARY KEY NOT NULL,
    verification_date TIMESTAMP DEFAULT NOW(),
    user_id INT REFERENCES users(user_id),
    is_verification_sent BOOLEAN NOT NULL,
    is_verification_expired BOOLEAN NOT NULL);

ALTER TABLE verifications
    ADD COLUMN is_verification_sent BOOLEAN NOT NULL,
    ADD COLUMN is_verification_expired BOOLEAN NOT NULL;


CREATE TABLE tokens(
    token_id SERIAL PRIMARY KEY NOT NULL,
    verifications_id INT REFERENCES verifications(verification_id) NOT NULL,
    token VARCHAR(10000)
    token_date TIMESTAMP DEFAULT NOW(),
    is_token_expired BOOLEAN NOT NULL,
    user_id INT REFERENCES verifications(verification_id) NOT NULL,
);

CREATE TABLE orders(
    user_id INT REFERENCES users(user_id),
    order_id SERIAL PRIMARY KEY NOT NULL,
    shipping_price NUMERIC (10, 2) NOT NULL,
    cart JSONB NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    tax NUMERIC (10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE verifications(
    verification_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(user_id),
    is_verification_sent BOOLEAN NOT NULL,
    is_verification_expired BOOLEAN NOT NULL,
    verification_email_date TIMESTAMP,
    is_token_expired BOOLEAN NOT NULL,
    token_date TIMESTAMP,
    token VARCHAR(10000));

CREATE TABLE carts(
    user_id INT REFERENCES users(user_id) NOT NULL,
    cart_items JSONB);
    