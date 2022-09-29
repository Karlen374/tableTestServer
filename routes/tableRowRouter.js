import { Router } from "express";
import TableRowController from "../controllers/TableRowController.js";

const TableRowRouter = new Router()

TableRowRouter.post('/create', TableRowController.create)
TableRowRouter.post('/edit', TableRowController.edit)
TableRowRouter.get('/get', TableRowController.getTableRows)
TableRowRouter.get('/getFiltered', TableRowController.getFilteredTableRows)
TableRowRouter.delete('/delete', TableRowController.deleteTableRow)
TableRowRouter.get('/getCount', TableRowController.getTableRowsCount)

export default TableRowRouter;