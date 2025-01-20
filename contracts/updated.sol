// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "contracts/Manufacturer.sol";
import "contracts/Distributor.sol";
import "contracts/Consumer.sol";
import "contracts/Retailer.sol";

contract SupplyChainAll is Manufacturer, Distributor, Retailer, Consumer {
    // Owner of the contract
    address owner;

    // Mappings to store product details and their states
    uint256 productCodeCounter;
    mapping(uint256 => Item) items;
    mapping(uint256 => Txblocks) itemsHistory;
    mapping(uint256 => bool) public productExists;
    mapping(uint256 => uint256) public productStock;

    // States of a product lifecycle
    enum State {
        ProducedByManufacturer,  // 0
        ForSaleByManufacturer,   // 1
        PurchasedByDistributor,  // 2
        ShippedByManufacturer,   // 3
        ReceivedByDistributor,   // 4
        ForSaleByDistributor,    // 5
        PurchasedByRetailer,     // 6
        ShippedByDistributor,    // 7
        ReceivedByRetailer,      // 8
        ForSaleByRetailer,       // 9
        PurchasedByConsumer      // 10
    }

    State constant defaultState = State.ProducedByManufacturer;

    // Struct to store product details
    struct Item {
        uint256 stockUnit;
        uint256 productCode;
        uint256 productID;
        address ownerID;
        address manufacturerID;
        string manufacturerName;
        string manufacturerInformation;
        string productNotes;
        uint256 productDate;
        uint256 productPrice;
        State itemState;
        address distributorID;
        address retailerID;
        address consumerID;
    }

    // Struct to store transaction history
    struct Txblocks {
        uint256 MTD;  // Manufacturer to Distributor
        uint256 DTR;  // Distributor to Retailer
        uint256 RTC;  // Retailer to Consumer
    }

    // Events for each state transition
    event ProducedByManufacturer(uint256 productCode);
    event ForSaleByManufacturer(uint256 productCode);
    event PurchasedByDistributor(uint256 productCode);
    event ShippedByManufacturer(uint256 productCode);
    event ReceivedByDistributor(uint256 productCode);
    event ForSaleByDistributor(uint256 productCode);
    event PurchasedByRetailer(uint256 productCode);
    event ShippedByDistributor(uint256 productCode);
    event ReceivedByRetailer(uint256 productCode);
    event ForSaleByRetailer(uint256 productCode);
    event PurchasedByConsumer(uint256 productCode);

    // Modifier to check if the caller is a registered manufacturer
    modifier onlyRegisteredManufacturer(string memory _manufacturerName) {
        require(isManufacturer(msg.sender), "Manufacturer not registered");
        require(
            isManufacturerNameRegistered(msg.sender, _manufacturerName),
            "Manufacturer name not registered"
        );
        _;
    }

    // Contract constructor
    constructor() {
        owner = msg.sender;
    }

    // Function for manufacturer to create a product
    function produceItemByManufacturer(
        uint256 _stockUnit,
        uint256 _productCode,
        string memory _manufacturerName,
        string memory _manufacturerInformation,
        string memory _productNotes,
        uint256 _price
    ) public onlyRegisteredManufacturer(_manufacturerName) {
        require(!productExists[_productCode], "Product code already exists");
        require(_stockUnit > 0, "Stock units must be greater than zero");

        Item memory newItem = Item({
            stockUnit: _stockUnit,
            productCode: _productCode,
            productID: _productCode + _stockUnit,
            ownerID: msg.sender,
            manufacturerID: msg.sender,
            manufacturerName: _manufacturerName,
            manufacturerInformation: _manufacturerInformation,
            productNotes: _productNotes,
            productDate: block.timestamp,
            productPrice: _price,
            itemState: defaultState,
            distributorID: address(0),
            retailerID: address(0),
            consumerID: address(0)
        });

        items[_productCode] = newItem;
        productExists[_productCode] = true;
        productStock[_productCode] = _stockUnit;

        emit ProducedByManufacturer(_productCode);
    }

    // Manufacturer lists product for sale
    function sellItemByManufacturer(uint256 _productCode, uint256 _price)
        public
        onlyRegisteredManufacturer(getManufacturerName(msg.sender))
    {
        require(
            items[_productCode].itemState == State.ProducedByManufacturer,
            "Product not produced yet"
        );
        require(items[_productCode].ownerID == msg.sender, "Not the product owner");

        items[_productCode].itemState = State.ForSaleByManufacturer;
        items[_productCode].productPrice = _price;

        emit ForSaleByManufacturer(_productCode);
    }

    // Distributor purchases product
    function purchaseItemByDistributor(
        uint256 _productCode,
        uint256 _price,
        uint256 _quantity
    ) public {
        require(isDistributor(msg.sender), "Only distributors can purchase");
        require(productExists[_productCode], "Product does not exist");
        require(
            items[_productCode].itemState == State.ForSaleByManufacturer,
            "Product not for sale by manufacturer"
        );
        require(items[_productCode].productPrice == _price, "Incorrect price");
        require(items[_productCode].stockUnit >= _quantity, "Insufficient stock");

        items[_productCode].ownerID = msg.sender;
        items[_productCode].distributorID = msg.sender;
        items[_productCode].itemState = State.PurchasedByDistributor;
        itemsHistory[_productCode].MTD = block.number;

        emit PurchasedByDistributor(_productCode);
    }

    // Manufacturer ships the product
    function shippedItemByManufacturer(uint256 _productCode, uint256 _quantity)
        public
    {
        require(isManufacturer(msg.sender), "Only manufacturers can ship");
        require(
            items[_productCode].itemState == State.PurchasedByDistributor,
            "Product not purchased by distributor"
        );
        require(items[_productCode].stockUnit >= _quantity, "Insufficient stock");

        items[_productCode].stockUnit -= _quantity;
        items[_productCode].itemState = State.ShippedByManufacturer;

        emit ShippedByManufacturer(_productCode);
    }

    // Distributor receives the product
    function receivedItemByDistributor(uint256 _productCode, uint256 _quantity)
        public
    {
        require(isDistributor(msg.sender), "Only distributors can receive");
        require(
            items[_productCode].itemState == State.ShippedByManufacturer,
            "Product not shipped yet"
        );
        require(items[_productCode].stockUnit >= _quantity, "Stock mismatch");

        items[_productCode].itemState = State.ReceivedByDistributor;
        items[_productCode].stockUnit -= _quantity;

        emit ReceivedByDistributor(_productCode);
    }

    // Retailer purchases product
    function purchaseItemByRetailer(
        uint256 _productCode,
        uint256 _quantity,
        uint256 _price
    ) public {
        require(isRetailer(msg.sender), "Only retailers can purchase");
        require(
            items[_productCode].itemState == State.ForSaleByDistributor,
            "Product not for sale by distributor"
        );
        require(items[_productCode].productPrice == _price, "Incorrect price");

        items[_productCode].ownerID = msg.sender;
        items[_productCode].retailerID = msg.sender;
        items[_productCode].itemState = State.PurchasedByRetailer;
        itemsHistory[_productCode].DTR = block.number;

        emit PurchasedByRetailer(_productCode);
    }

    // Consumer buys the product
    function buyItemByConsumer(uint256 _productCode, uint256 _price)
        public
        onlyConsumer
    {
        require(
            items[_productCode].itemState == State.ForSaleByRetailer,
            "Product not for sale by retailer"
        );
        require(items[_productCode].productPrice == _price, "Incorrect price");

        items[_productCode].consumerID = msg.sender;
        items[_productCode].ownerID = msg.sender;
        items[_productCode].itemState = State.PurchasedByConsumer;
        itemsHistory[_productCode].RTC = block.number;

        emit PurchasedByConsumer(_productCode);
    }
}
