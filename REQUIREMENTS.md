# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `[GET] 'api/products/' `
- Show:  `[GET] 'api/products/:id' `
- Create: `[POST] 'api/products/'`
`(Bearer token required)
args =>  {
     name: string required,
     price: number required,
     category: string required
     }
     `
- Update `[PATCH] 'api/products/:id'`
` (Bearer token required)
args =>  {
     name: string required,
     price: number required,
     category: string required
      }
     `
- Delete ` [DELETE] 'api/products/:id' (Bearer token required)`
- Top 5 most popular products  `[GET] 'api/products/top' `
- Products by category `[GET] 'api/products/cat/:category' `
(args category)

#### Users
- Index `[GET] 'api/users/' (token required) `
- Show `[GET] 'api/users/:id' (token required) `
- Update `[PATCH] 'api/users/:id' (token required) `
`args =>  {
     username: string required,
     firstname: string required,
     lastname: string required,
     email: string required uniqe,
     password: string required,
      }
      `
#### Auth 
- Login `[POST] 'api/auth/login' `
`args =>  {
     email: string required,
     password: string required,
      }`
- Register `[POST] 'api/auth/register' `
`args =>  {
     username: string required,
     firstname: string required,
     lastname: string required,
     email: string required uniqe,
     password: string required,
      }`

#### Orders
- Index `[GET] 'api/orders/' (token required) `
- Show `[GET] 'api/orders/:id' (token required) `
- Create `[POST] 'api/orders/'  (Bearer token required)`
`args =>  {
     products: [
        {
            product_id: number required,
            quantity: number required,}
        ]
      }`
- add product: `[POST] 'api/orders/:id/addproduct'  (Bearer token required)`
`args =>  {
            product_id: number required,
            quantity: number required,
        }`

- Current Order by user `[GET] 'api/orders/current' (token required) `
- Delete unconfirmed order by user  ` [DELETE] 'api/orders/:id' (Bearer token required)`
- Confirm Order by user ` [POST] 'api/orders/:id/confirm' (Bearer token required)`
- Completed Orders by user `[GET] 'api/orders/completed' (token required) `

## Data Shapes
#### Product
-  id
- name
- price
- category
```
Table: products (
    id SERIAL [PRIMARY KEY],
    name VARCHAR(100) [NOT NULL],
    price INTEGER [NOT NULL],
    category VARCHAR(100) [NOT NULL]
)
```

#### User
- id
- email
- username
- firstName
- lastName
- password
```
 Table: users (
    id SERIAL [PRIMARY KEY],
    username VARCHAR(100) [NOT NULL],
    firstname VARCHAR(100) [NOT NULL],
    lastname VARCHAR(100) [NOT NULL],
    email VARCHAR(100) [NOT NULL] UNIQUE,
    password VARCHAR [NOT NULL]
)
```

#### Orders
- id
- user_id
- status of order (active or complete)
```
Table: orders (
    id SERIAL [PRIMARY KEY],
    status BOOLEAN [NOT NULL] DEFAULT false,
    user_id BIGINT [NOT NULL] [FOREIGN KEY TO users ON UPDATE CASCADE ON DELETE CASCADE
)
```

#### Order_products 
- id
- product_id
- order_id
- quantity
```
 Table: order_products (
    id SERIAL [PRIMARY KEY],
    quantity INTEGER [NOT NULL],
    order_id BIGINT [NOT NULL] [FOREIGN KEY TO orders ON UPDATE CASCADE ON DELETE CASCADE,
    product_id BIGINT [NOT NULL] [FOREIGN KEY TO products ON UPDATE CASCADE ON DELETE CASCADE]
)
```
