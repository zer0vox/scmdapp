// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "contracts/Manufacturer.sol";
import "contracts/Distributor.sol";
import "contracts/Consumer.sol";
import "contracts/Retailer.sol";

// Defining the contract

contract supplychain111 is 
Manufacturer,
Distributor,
Retailer,
Consumer
{
 // defining the owner for the contract
    address  owner;
    // defining the unique product code 
    uint productCode;
    // Tracking the unit for the stocks
    uint stockUnit;
    // mapping the product code for an item
    mapping(uint256=>Item) items;

    
    // Define a public mapping 'itemsHistory' to track the product journey through supply chain
    mapping(uint256 => Txblocks) itemsHistory;

    
    // TO check if the product exists with the product code. So the product code must be unique
     mapping(uint256 => bool) public productExists;
     mapping(uint256 => uint256) productStock;

    

     // defining the states at the different levels for product movement

    enum State {
        produceByManufacturer,// 0
        forSaleByManufacturer, // 1
        purchasedByDistributor, // 2
        shippedByManufacturer, // 3
        receivedByDistributor, //4
        forSaleByDistributor, //6
        purchasedByRetailer, //7
        shippedByDistributor, //8
        receivedByRetailer, //9
        forSaleByRetailer, //10
        purchaseByConsumer // 11


    }

     State constant defaultState=State.produceByManufacturer;


     
    // define the struct item for the product
    struct Item {
        uint256 stockUnit;
        uint256 productCode;
        address ownerID; // To track the address of the owner currently holding the product
        address manufacturerID; // address of the manufacturers
        string manufacturerName;// manufacturers name
        string manufacturerInformation; // to add manufacturers information
        uint productID; // combination of both product code and stock unit
        string productNotes; // information about product
        uint256 productDate; // product creation date
        uint productPrice; // product price
        State itemState; // product states as represented as above enum
        address distributorID; 
        address retailerID;
        address consumerID;


    }

    // defining the structure for block number
    struct Txblocks {
        uint256 MTD;
        uint256 DTR;
        uint256 RTC;
    }

      // defining the events for emitting different level of transactions
    event ProduceByManufacturer(uint productCode);
    event forSaleByManufacturer(uint256 productCode);
    event purchasedByDistributor(uint productCode);
    event ShippedByManufacturer(uint256 productCode);
    event ReceivedByDistributor(uint256 productCode);
    event ForSaleByDistributor(uint256 productCode);
    event PurchasedByRetailer(uint productCode);
    event ShippedByDistributor(uint productCode);
    event ReceivedByRetailer(uint productCode);
    event ForSaleByRetailer(uint productCode);
    event PurchasedByConsumer(uint productCode);


 // for registering the manufacturers so that only that manufacturer can be used to trade
    modifier onlyRegisteredManufacturer(string memory _manufacturerName) {
        require(isManufacturer(msg.sender), "Manufacturer not registered");
        require(isManufacturerNameRegistered(msg.sender, _manufacturerName), "Manufacturer name not registered");
        _;
    }


  // constructor setup
    constructor(){
        owner=msg.sender;

    }

      // allow the manufacturer to create product
    function produceItemByManufacturer(
        uint _stockUnit,
        uint256 _productCode,
        string memory _manufacturerName,
        string memory _manufacturerInformation,
        string memory _productNotes,
        uint256 _price
    ) public// onlyManufacturer  // check whether the address belongs to the manufacturer or not
      onlyRegisteredManufacturer(_manufacturerName)
     
    {
         require(!productExists[_productCode], "Product code already exists");
         require(_stockUnit>0,"Stock units not available");
       address distributorID; // empty distributorID address
       address retailerID; // empty retailerID address
       address consumerID; // empty consumerID address
       
        Item memory newProduceItem;
        newProduceItem.manufacturerInformation=_manufacturerInformation;
        newProduceItem.stockUnit=_stockUnit;
        newProduceItem.productCode=_productCode;
        newProduceItem.manufacturerName=_manufacturerName;
        newProduceItem.productNotes=_productNotes;
        newProduceItem.manufacturerID=msg.sender;
        newProduceItem.ownerID=msg.sender;
        newProduceItem.productID=_productCode+stockUnit;
        newProduceItem.productNotes=_productNotes;
        newProduceItem.productPrice=_price;
        newProduceItem.productDate=block.timestamp;
        newProduceItem.itemState=defaultState;
        newProduceItem.distributorID=distributorID;
        newProduceItem.retailerID=retailerID;
        newProduceItem.consumerID=consumerID;
        items[_productCode]=newProduceItem;
        uint256 placeholder;
        Txblocks memory txBlock;
        txBlock.MTD=placeholder;
        txBlock.DTR=placeholder;
        txBlock.RTC=placeholder;
        itemsHistory[_productCode]=txBlock;

         productExists[_productCode] = true;
    productStock[_productCode] = _stockUnit;

     items[_productCode].itemState=State.produceByManufacturer;
        // emitting the event after listing the product

        emit ProduceByManufacturer(_productCode);


    }

    // After the creation of products by manufacturer. Then the product can be sold to distributor
    function sellItemByManufacturer(uint _productCode,uint _price)
    public 
   // onlyManufacturer


   
   onlyRegisteredManufacturer(getManufacturerName(msg.sender)){
    require(items[_productCode].itemState == State.produceByManufacturer, "Item not produced yet");
    require(items[_productCode].ownerID == msg.sender, "Not the item owner");
    require(productExists[_productCode], "Product does not exist");
    require(productStock[_productCode] > 0, "Stock units not available");

    
   
        items[_productCode].itemState=State.forSaleByManufacturer;
        items[_productCode].productPrice=_price;
        emit forSaleByManufacturer(_productCode); 

    }

    function purchaseItemByDistributor(uint _productCode, uint _price, uint _quantity) public {
    require(isDistributor(msg.sender), "Not a registered distributor");
    require(isDistributorNameRegistered(msg.sender, getDistributorName(msg.sender)), "Distributor name not registered");
    require(productExists[_productCode], "Product does not exist");
    require(productStock[_productCode] > 0, "Stock units not available");
    require(items[_productCode].itemState == State.forSaleByManufacturer, "Item not available for purchase");
    require(items[_productCode].productPrice == _price, "Incorrect price for the item");
    require(items[_productCode].stockUnit >= _quantity, "Insufficient stock");


    
    items[_productCode].ownerID=msg.sender;
    items[_productCode].distributorID=msg.sender;
    items[_productCode].itemState=State.purchasedByDistributor;
    itemsHistory[_productCode].MTD=block.number; // add block number
    emit purchasedByDistributor(_productCode);

    
}

// function that alllows the manufacturers to ship the product after the distributor prurchase it
function shippedItemByManufacturer(uint _productCode,uint _quantity) public {
    require(isManufacturer(msg.sender), "Only registered manufacturers can perform this action");
    require(items[_productCode].itemState == State.purchasedByDistributor, "Item not purchased by distributor");
    require(items[_productCode].stockUnit >= _quantity, "Insufficient stock for shipment");

    // Ensuring the manufacturer owns the product before shipping
    require(items[_productCode].manufacturerID == msg.sender, "You don't own this product");

    // Update item state to reflect shipment
    items[_productCode].itemState = State.shippedByManufacturer;
    
    emit ShippedByManufacturer(_productCode);

}


// function that allows the Distributor to recieve the product once shipped by the manufacturers
function receivedItemByDistributor(uint _productCode, uint _quantity) public {
    require(isDistributor(msg.sender), "Only registered distributors can perform this action");
    require(items[_productCode].itemState == State.shippedByManufacturer, "Item not shipped yet");
    require(items[_productCode].stockUnit >= _quantity, "Received quantity exceeds available stock");


    // For ensuring the distributor owns the product before marking it received
    require(items[_productCode].distributorID == msg.sender, "You don't own this product");

    // Update item state to reflect reception by distributor
    items[_productCode].itemState = State.receivedByDistributor;
    items[_productCode].stockUnit -= _quantity;  //  only after receiving the produxt Deduct the received quantity from available stock
   
   emit ReceivedByDistributor(_productCode);
}




// function to allow the distributor to sell the product to the retialers
function sellItemByDistributor(uint _productCode, uint _price) public {
    require(isDistributor(msg.sender), "Only registered distributors can perform this action");
    require(items[_productCode].itemState == State.receivedByDistributor, "Item not packaged yet");
   
    // Ensuring the distributor owns the product before selling it
    require(items[_productCode].distributorID == msg.sender, "You don't own this product");

    // Update item state to reflect sale by the distributor
    items[_productCode].itemState = State.forSaleByDistributor;
    items[_productCode].productPrice = _price;

    emit ForSaleByDistributor(_productCode);

     
}
// function that allows the retailers to buy the product 
function purchaseItemByRetailer(uint _productCode, uint _quantity, uint _price) public {
    require(isRetailer(msg.sender), "Only registered retailers can perform this action");
    require(items[_productCode].itemState == State.forSaleByDistributor, "Item not available for purchase");
    require(items[_productCode].productPrice == _price, "Incorrect price for the item");
    require(_quantity > 0, "Invalid quantity");

  

    // Update ownership and item state to reflect purchase by the retailer
    items[_productCode].ownerID = msg.sender;
    items[_productCode].retailerID = msg.sender;
    items[_productCode].itemState = State.purchasedByRetailer;
     itemsHistory[_productCode].DTR=block.number;


    emit PurchasedByRetailer(_productCode);
}

// allow distributor to shipped item to retailer
function shippedItemByDistributor(uint _productCode) public {
    require(isDistributor(msg.sender), "Only registered distributors can perform this action");
    require(items[_productCode].itemState == State.purchasedByRetailer, "Item not purchased by retailer");
  
    // Ensuring the distributor owns the product before shipping
    require(items[_productCode].distributorID == msg.sender, "You don't own this product");

    // Update item state to reflect shipment
    items[_productCode].itemState = State.shippedByDistributor;
    emit ShippedByDistributor(_productCode);
}

// function to receive the product by retailer
function receivedItemByRetailer(uint _productCode) public {
    require(isRetailer(msg.sender), "Only registered retailers can perform this action");
    require(items[_productCode].itemState == State.shippedByDistributor, "Item not shipped by distributor");

    // Ensuring the retailer owns the product before marking it received
    require(items[_productCode].retailerID == msg.sender, "You don't own this product");

    // Update item state to reflect reception by retailer
    items[_productCode].itemState = State.receivedByRetailer;
   
    emit ReceivedByRetailer(_productCode);
}

// items sold by retailers 
function sellItemByRetailer(uint _productCode, uint _price) public {
    require(isRetailer(msg.sender), "Only registered retailers can perform this action");
    require(items[_productCode].itemState == State.receivedByRetailer, "Item not received by retailer");
   
    // Ensuring the retailer owns the product before selling it
    require(items[_productCode].retailerID == msg.sender, "You don't own this product");

    // Update item state to reflect sale by the retailer
    items[_productCode].itemState = State.forSaleByRetailer;
    items[_productCode].productPrice = _price;

    emit ForSaleByRetailer(_productCode);
}
 
 // to buy by consumers
function buyItemByConsumer(uint _productCode, uint _price) public onlyConsumer {
    require(items[_productCode].itemState == State.forSaleByRetailer, "Item not available for purchase");
    require(items[_productCode].productPrice == _price, "Incorrect price for the item");
    items[_productCode].consumerID=msg.sender;
    items[_productCode].ownerID=msg.sender;
    items[_productCode].itemState=State.purchaseByConsumer;
    itemsHistory[_productCode].RTC=block.number;
    emit PurchasedByConsumer(_productCode);
}  
 // defining the function to fetch the data

    
    function fetchItemtwo(uint256 _productCode)
    public 
    view 
    returns (
        uint256 itemstockUnit,
        uint256 itemproductcode,
        uint256 productID,
        string memory productNotes,
        uint256 productPrice,
        uint256 productDate,
        State itemState,
        address distributorID,
        address retailerID,
        address consumerID,
        string memory manufacturerName,
        string memory manufacturerInformation
       
    )
    // assigning values

    {
        Item memory item=items[_productCode];
        return (
            item.stockUnit,
            item.productCode,
            item.productID,
            item.productNotes,
            item.productPrice,
            item.productDate,
            item.itemState,
            item.distributorID,
            item.retailerID,
            item.consumerID,
            item.manufacturerName,
            item.manufacturerInformation
        );


    }
     // Define a function 'fetchItemHistory' that fetaches the data
    function fetchitemHistory(uint256 _productCode)
        public
        view
        returns (
            uint256 blockManufacutrerToDistributor,
            uint256 blockDistributorToRetailer,
            uint256 blockRetailerToConsumer
        )
    {
        // Assign value to the parameters
        Txblocks memory txblock = itemsHistory[_productCode];
        return (txblock.MTD, txblock.DTR, txblock.RTC);
    }

}