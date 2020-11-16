const Stocks=require('../models/stocks');
module.exports={
    async addStocks(stockData){
        let stocks=new Stocks();
        stocks.Date=stockData.Date;
        stocks.Open=stockData.Open;
        stocks.High=stockData.High;
        stocks.Low=stockData.Low;
        stocks.Close=stockData.Close;
        return await stocks.save();
    },
    async getStocks(page,perPage){
        let start=parseInt(page)||0;
        let per_page=(perPage)||30;
        let total=this.getJSONData(await Stocks.countDocuments({}));
        let data=this.getJSONData(await Stocks.find({},{__v:0})
        .sort({
             Date:-1
        })
        .skip(per_page * start)
        .limit(parseInt(perPage)));
        return {data,total};
    },
    getJSONData(data){
      return JSON.parse(JSON.stringify(data));
   }
}