import TableRow from "../models/tableRow.js"

class TableRowController {
  async create(req, res) {
    try {
      const {date,name,count,distance,authorId,_id} = req.body;
      const tableRow = await TableRow.create({date,name,count,distance,authorId,_id});
      return res.status(200).json(tableRow);
    } catch (e) {
      res.status(400).json({message: "TableRow create error"});
    }
  }
  async edit (req,res) {
    try {
      const TableRow = req.body
      if (!TableRow._id){
        res.status(400).json({message: 'Id не указан'})
      }
      const updatedTableRow = await TableRow.findByIdAndUpdate(TableRow._id,TableRow,{new:true})
      return res.status(200).json(updatedTableRow)
    } catch (e){
      res.status(500).json(e)
    }
  }
  async getTableRowsCount (req,res) {
    try{
      const { authorid } = req.headers;
      const TableRows = await TableRow.find()
      const currentAuthorTableRowsCount = TableRows?.filter((item) => item.authorId===authorid).length;
      return res.status(200).json(currentAuthorTableRowsCount)
    } catch (e){
      res.status(500).json(e)
    }

  }
  async getTableRows (req,res) {
    try{
      const { authorid } = req.headers;
      const {page,sortParam} = req.query;
      const TableRows = await TableRow.find()
      const currentAuthorTableRows = TableRows.filter((item) => item.authorId===authorid)
      if (sortParam === 'asc_count') {
        currentAuthorTableRows.sort((a,b) => b.count-a.count).reverse() 
      }
      if (sortParam === 'asc_distance'){
        currentAuthorTableRows.sort((a,b) => b.distance-a.distance).reverse()
      }
      if (sortParam === 'asc_name'){
        currentAuthorTableRows.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      }
      if (sortParam === 'desc_count'){
        currentAuthorTableRows.sort((a,b) => b.count-a.count)
      }
      if (sortParam === 'desc_distance'){
        currentAuthorTableRows.sort((a,b) => b.distance-a.distance)
      }
      if (sortParam === 'desc_name'){
        currentAuthorTableRows.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }).reverse()
      }
      return res.status(200).json(currentAuthorTableRows.slice((page-1)*10,page*10))
    } catch(e) {
      res.status(500).json(e);
    }
  }
  async getFilteredTableRows (req,res){
    try{
      const { authorid } = req.headers;
      const {rowParam,comparisonParam,value} = req.query;
      const TableRows = await TableRow.find()
      let currentAuthorTableRows = TableRows.filter((item) => item.authorId===authorid)
      if (!value) return res.status(200).json(currentAuthorTableRows.slice(0,10))
      if (rowParam==="name"){
        if(comparisonParam==="equal"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => value===item.name)
        }
        if(comparisonParam==="contain"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) =>item.name.toUpperCase().indexOf(value.toUpperCase()) > -1);
        }
        if(comparisonParam==="more"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.name>value);
        }
        if(comparisonParam==="less"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.name<value);
        }
      }
      if (rowParam==="count"){
        if(comparisonParam==="equal"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.count==value)
        }
        if(comparisonParam==="contain"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => String(item.count).indexOf(value.toUpperCase()) > -1);
        }
        if(comparisonParam==="more"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.count>Number(value))
        }
        if(comparisonParam==="less"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.count<Number(value))
        }
      }
      if (rowParam==="distance"){
        if(comparisonParam==="equal"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.distance==value)
        }
        if(comparisonParam==="contain"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => String(item.distance).indexOf(value.toUpperCase()) > -1);
        }
        if(comparisonParam==="more"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.distance>Number(value))
        }
        if(comparisonParam==="less"){
          currentAuthorTableRows = currentAuthorTableRows.filter((item) => item.distance<Number(value))
        }
      }
      return res.status(200).json(currentAuthorTableRows.slice(0,10))
    } catch(e) {
      res.status(500).json(e);
    }
  }
  async deleteTableRow (req,res) {
    try{
      const { _id } = req.body
      console.log('_id=',_id);
      const delTableRow = await TableRow.deleteOne({ _id })
      console.log('delTableRow=',delTableRow);
      return res.status(200).json(_id)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new TableRowController();