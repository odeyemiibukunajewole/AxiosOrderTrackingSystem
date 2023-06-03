# AxiosOrderTrackingSystem

# NodeJs: Build The Complete E-Commerce Web Tracking API

# Introduction
This repository is purely for documentation purposes of Axios E-Commerce web tracking system and will be released soon with the features below as documented in this release notes under the various section of this documentation for the Axios E-Commerce web tracking system.

# Run

### Install

```
npm install
```

### Start API

```
npm start
```

# Routes

### Products

```
GET      /api/v1/product/get-product
GET      /api/v1/products/get-product/:id
POST     /api/v1/products/create-product

```

### Orders

```
GET      /api/v1/order/get-order
POST      /api/v1/order/update-order/:id
POST     /api/v1/order/create-order
```


### Orders Tracking

```
GET      /api/v1/order-tracking/get-product
GET      /api/v1/order-tracking/get-product/:id
```

### Order Detail

```
PUT      /api/v1/order-detail/update-order-detail/id
GET      /api/v1/order-detail/get-order-detail

```

#### Register new user

```
POST      /api/v1/auth/register
```

#### Login user

To login the user and get the auth token you can use:

```
POST      /api/v1/auth/login
```

