const stockService=require('../services/stocks');
module.exports={
    addStocks(req,res){
        try{
               const stockData=req.body;
               stockService.addStocks(stockData).then(data=>{
                    return res.status(201).send(data);
                })
        }catch(err){
            return res.status(500).send({message:'Internal server error.'})
        }
    },
    getStocks(req,res){
        try{
                let page=req.query.page;
                let perPage=req.query.perPage;
                stockService.getStocks(page,perPage).then(data=>{
                    return res.status(200).send(data);
                })
        }catch(err){
            return res.status(500).send({message:'Internal server error.'})
        }
    },
}