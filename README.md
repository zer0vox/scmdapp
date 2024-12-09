# Documentation for Supply Chain Project

The `supplychainall` smart contract is a Solidity-based implementation of a supply chain management system. This contract tracks the lifecycle of products as they move through the supply chain, from manufacturers to consumers. The following sections describe the structure, functionality, and purpose of each component within the contract.

---

## Table of Contents
1. [Contract Overview](#contract-overview)
2. [Key Components](#key-components)
    - [Structs](#structs)
    - [Enums](#enums)
3. [Mappings](#mappings)
4. [Events](#events)
5. [Modifiers](#modifiers)
6. [Contract Functions](#contract-functions)
    - [Manufacturer Functions](#manufacturer-functions)
    - [Distributor Functions](#distributor-functions)
    - [Retailer Functions](#retailer-functions)
    - [Consumer Functions](#consumer-functions)
    - [Data Retrieval Functions](#data-retrieval-functions)

---

## Contract Overview

This contract inherits functionality from four sub-contracts:
- `Manufacturer`: Handles manufacturer-related actions.
- `Distributor`: Manages distributor-related actions.
- `Retailer`: Covers retailer-related operations.
- `Consumer`: Manages consumer-related actions.

The contract facilitates a seamless flow of products through the supply chain and tracks ownership and state transitions.

---

## Key Components

### Structs

#### `Item`
Represents a product in the supply chain.

- **Attributes:**
  - `uint256 stockUnit`: Number of items in stock.
  - `uint256 productCode`: Unique product identifier.
  - `address ownerID`: Current owner's address.
  - `address manufacturerID`: Manufacturer's address.
  - `string manufacturerName`: Manufacturer's name.
  - `string manufacturerInformation`: Additional manufacturer information.
  - `uint256 productID`: A composite ID (`productCode + stockUnit`).
  - `string productNotes`: Notes or description about the product.
  - `uint256 productDate`: Timestamp of product creation.
  - `uint256 productPrice`: Price of the product.
  - `State itemState`: Current state of the product.
  - `address distributorID`: Distributor's address.
  - `address retailerID`: Retailer's address.
  - `address consumerID`: Consumer's address.

#### `Txblocks`
Tracks the product's movement through the supply chain.

- **Attributes:**
  - `uint256 MTD`: Block number for Manufacturer to Distributor.
  - `uint256 DTR`: Block number for Distributor to Retailer.
  - `uint256 RTC`: Block number for Retailer to Consumer.

---

### Enums

#### `State`
Represents the various states of a product in the supply chain.

- **States:**
  - `produceByManufacturer`: Product created by the manufacturer.
  - `forSaleByManufacturer`: Available for sale by the manufacturer.
  - `purchasedByDistributor`: Purchased by a distributor.
  - `shippedByManufacturer`: Shipped by the manufacturer.
  - `receivedByDistributor`: Received by the distributor.
  - `forSaleByDistributor`: Available for sale by the distributor.
  - `purchasedByRetailer`: Purchased by a retailer.
  - `shippedByDistributor`: Shipped by the distributor.
  - `receivedByRetailer`: Received by the retailer.
  - `forSaleByRetailer`: Available for sale by the retailer.
  - `purchaseByConsumer`: Purchased by a consumer.

---

## Mappings

### `items`
Tracks product details using the `productCode` as the key.

### `itemsHistory`
Tracks the product's transaction history.

### `productExists`
Ensures the uniqueness of product codes.

### `productStock`
Tracks the stock quantity of each product.

---

## Events

The contract emits the following events to signal key actions:

- `ProduceByManufacturer(uint productCode)`
- `ForSaleByManufacturer(uint256 productCode)`
- `PurchasedByDistributor(uint productCode)`
- `ShippedByManufacturer(uint256 productCode)`
- `ReceivedByDistributor(uint256 productCode)`
- `ForSaleByDistributor(uint256 productCode)`
- `PurchasedByRetailer(uint productCode)`
- `ShippedByDistributor(uint productCode)`
- `ReceivedByRetailer(uint productCode)`
- `ForSaleByRetailer(uint productCode)`
- `PurchasedByConsumer(uint productCode)`

---

## Modifiers

- `onlyRegisteredManufacturer(string memory _manufacturerName)`: Restricts access to registered manufacturers.
- `onlyConsumer`: Restricts access to consumers.

---

## Contract Functions

### Manufacturer Functions

1. **`produceItemByManufacturer`**
   - Creates a new product.
   - **Parameters:**
     - `_stockUnit`: Quantity of stock.
     - `_productCode`: Unique product code.
     - `_manufacturerName`: Manufacturer's name.
     - `_manufacturerInformation`: Manufacturer details.
     - `_productNotes`: Product description.
     - `_price`: Product price.

2. **`sellItemByManufacturer`**
   - Marks the product as for sale.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_price`: Sale price.

3. **`shippedItemByManufacturer`**
   - Marks the product as shipped.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_quantity`: Quantity being shipped.

---

### Distributor Functions

1. **`purchaseItemByDistributor`**
   - Allows a distributor to purchase a product.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_price`: Product price.
     - `_quantity`: Quantity being purchased.

2. **`receivedItemByDistributor`**
   - Marks a product as received by the distributor.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_quantity`: Quantity received.

3. **`sellItemByDistributor`**
   - Marks the product as available for sale by the distributor.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_price`: Sale price.

4. **`shippedItemByDistributor`**
   - Marks the product as shipped to a retailer.
   - **Parameters:**
     - `_productCode`: Product code.

---

### Retailer Functions

1. **`purchaseItemByRetailer`**
   - Allows a retailer to purchase a product.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_quantity`: Quantity being purchased.
     - `_price`: Product price.

2. **`receivedItemByRetailer`**
   - Marks the product as received by the retailer.
   - **Parameters:**
     - `_productCode`: Product code.

3. **`sellItemByRetailer`**
   - Marks the product as for sale by the retailer.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_price`: Sale price.

---

### Consumer Functions

1. **`buyItemByConsumer`**
   - Allows a consumer to purchase a product.
   - **Parameters:**
     - `_productCode`: Product code.
     - `_price`: Product price.

---

### Data Retrieval Functions

1. **`fetchItemtwo`**
   - Retrieves product details.
   - **Parameters:**
     - `_productCode`: Product code.
   - **Returns:**
     - Various product attributes including stock, owner, state, and more.

2. **`fetchitemHistory`**
   - Fetches product transaction history.
   - **Parameters:**
     - `_productCode`: Product code.
   - **Returns:**
     - Block numbers for transitions between Manufacturer, Distributor, Retailer, and Consumer.

---

This contract provides a comprehensive solution for tracking product movement, ownership, and state transitions within a supply chain. It ensures transparency and accountability at each stage.
