const XLSX = require('xlsx');
const stockService=require('../services/stocks');
module.exports={
 async readXlsxFile(){
     var workbook = XLSX.readFile('./public/data/Sensex_CSV_2018.xlsx',{cellDates: true});
     sheet_name_list = workbook.SheetNames;
    let stocksDataList=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
     let returnedData=[];
     for(let stocks of stocksDataList){
        returnedData.push(await stockService.addStocks(stocks));
     }
     console.log(stocksDataList.length)
    //  console.log(returnedData)
    }
}