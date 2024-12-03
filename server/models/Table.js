const mongoose = require('mongoose')
const TableSchema =new mongoose.Schema ({
    globalName:String ,
    globalKey:String,
    entity:String,
    ProductCode: String,
    ProductName: String,
    ProductCost: Number,
    StartInventory: Number,
    ProductStock:Number,
    ProductSale:Number,
    ProductSaleQuantity:Number,
    ProductAddDate:Date,
})
const TableModel = mongoose.model("table", TableSchema)
module.exports=TableModel