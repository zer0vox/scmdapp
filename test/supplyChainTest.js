import { expect } from "chai";
import { ethers } from "hardhat";

describe("Supply Chain Test Suite", function () {
  let manufacturer, distributor, retailer, consumer;
  let Manufacturer, Distributor, Retailer, Consumer, SupplyChainAll;
  let manufacturerContract, distributorContract, retailerContract, consumerContract, supplyChain;

  before(async () => {
    // Sign in to the account 
    [owner, manufacturer, distributor, retailer, consumer] = await ethers.getSigners();

    // Deploy Manufacturer
    Manufacturer = await ethers.getContractFactory("Manufacturer");
    manufacturerContract = await Manufacturer.deploy();
    await manufacturerContract.deployed();

    // Deploy Distributor
    Distributor = await ethers.getContractFactory("Distributor");
    distributorContract = await Distributor.deploy();
    await distributorContract.deployed();

    // Deploy Retailer
    Retailer = await ethers.getContractFactory("Retailer");
    retailerContract = await Retailer.deploy();
    await retailerContract.deployed();

    // Deploy Consumer
    Consumer = await ethers.getContractFactory("Consumer");
    consumerContract = await Consumer.deploy();
    await consumerContract.deployed();

    // Deploy SupplyChainAll
    SupplyChainAll = await ethers.getContractFactory("supplychainall");
    supplyChain = await SupplyChainAll.deploy();
    await supplyChain.deployed();
  });

  it("Should register roles", async () => {
    // Manufacturer registration
    await manufacturerContract.addManufacturer(manufacturer.address, "Manufacturer A");
    await manufacturerContract.connect(manufacturer).registerManufacturerName("Manufacturer A");
    expect(await manufacturerContract.isManufacturer(manufacturer.address)).to.be.true;

    // Distributor registration
    await distributorContract.addDistributor(distributor.address, "Distributor A");
    await distributorContract.connect(distributor).registerDistributorName("Distributor A");
    expect(await distributorContract.isDistributor(distributor.address)).to.be.true;

    // Retailer registration
    await retailerContract.addRetailer(retailer.address, "Retailer A");
    await retailerContract.connect(retailer).registerRetailerName("Retailer A");
    expect(await retailerContract.isRetailer(retailer.address)).to.be.true;

    // Consumer registration
    await consumerContract.addConsumer(consumer.address, "Consumer A", "Address A", 12345);
    expect(await consumerContract.getConsumer(consumer.address)).to.deep.include("Consumer A");
  });

  it("Should allow manufacturer to produce and sell a product", async () => {
    // Produce item
    await supplyChain.connect(manufacturer).produceItemByManufacturer(
      100, // stockUnit
      1, // productCode
      "Manufacturer A",
      "Info about Manufacturer A",
      "Product Notes",
      10 // price
    );

    const item = await supplyChain.fetchItemtwo(1);
    expect(item.itemState).to.equal(0); // State: produceByManufacturer-0
    expect(item.stockUnit).to.equal(100);
  });

  it("Should allow distributor to purchase the product", async () => {
    // Manufacturer sells the product
    await supplyChain.connect(manufacturer).sellItemByManufacturer(1, 15);
    const updatedItem = await supplyChain.fetchItemtwo(1);
    expect(updatedItem.itemState).to.equal(1); // State: forSaleByManufacturer-1

    // Distributor purchases the product
    await supplyChain.connect(distributor).purchaseItemByDistributor(1, 15, 50);
    const purchasedItem = await supplyChain.fetchItemtwo(1);
    expect(purchasedItem.itemState).to.equal(2); // State: purchasedByDistributor-2
  });

  it("Should track shipment and reception by distributor", async () => {
    // Manufacturer ships the product
    await supplyChain.connect(manufacturer).shippedItemByManufacturer(1, 50);
    const shippedItem = await supplyChain.fetchItemtwo(1);
    expect(shippedItem.itemState).to.equal(3); // State: shippedByManufacturer-3

    // Distributor receives the product
    await supplyChain.connect(distributor).receivedItemByDistributor(1, 50);
    const receivedItem = await supplyChain.fetchItemtwo(1);
    expect(receivedItem.itemState).to.equal(4); // State: receivedByDistributor-4
  });

  it("Should allow distributor to ship product to retailer", async () => {
    // Distributor sells the product to retailer
    await supplyChain.connect(distributor).sellItemByDistributor(1, 20);
    const itemForSale = await supplyChain.fetchItemtwo(1);
    expect(itemForSale.itemState).to.equal(5); // State: forSaleByDistributor-5

    // Retailer purchases the product
    await supplyChain.connect(retailer).purchaseItemByRetailer(1, 10, 20);
    const purchasedItem = await supplyChain.fetchItemtwo(1);
    expect(purchasedItem.itemState).to.equal(6); // State: purchasedByRetailer-6

    // Distributor ships the product to the retailer
    await supplyChain.connect(distributor).shippedItemByDistributor(1, 10);
    const shippedItem = await supplyChain.fetchItemtwo(1);
    expect(shippedItem.itemState).to.equal(7); // State: shippedByDistributor-7
  });

  it("Should allow retailer to sell the product to consumer", async () => {
    // Retailer receives the product
    await supplyChain.connect(retailer).receivedItemByRetailer(1);
    const receivedItem = await supplyChain.fetchItemtwo(1);
    expect(receivedItem.itemState).to.equal(8); // State: receivedByRetailer-8

    // Retailer sells the product to consumer
    await supplyChain.connect(retailer).sellItemByRetailer(1, 30);
    const itemForSale = await supplyChain.fetchItemtwo(1);
    expect(itemForSale.itemState).to.equal(9); // State: forSaleByRetailer-9
  });

  it("Should allow consumer to buy the product", async () => {
    // Consumer purchases the product
    await supplyChain.connect(consumer).buyItemByConsumer(1, 30);
    const purchasedItem = await supplyChain.fetchItemtwo(1);
    expect(purchasedItem.itemState).to.equal(11); // State: purchaseByConsumer-10
  });
});