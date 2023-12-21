const db = require('../db')

module.exports = class OrderModel {
    async addCartItemsToOrderItems(cart, orderId){
        
        let statement =   `INSERT INTO ordered_items
                            (order_id, product_id, quantity)
                            VALUES`
        const values = []
        
                    for (let x = 1; x < cart.length + 1; x++){
                values.push(orderId, cart[x - 1].fk_product_id, cart[x - 1].quanity)
                let valueMap = x * 3
                statement += ` ($${valueMap-2}, $${valueMap-1}, $${valueMap})`
                if (x != cart.length){
                    statement += ','
                } 
            }
            statement += ' RETURNING *;'
        
        try{

            const response = await db.query(statement, values)
            if(response.rows.length === 0){
                return null
            }
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
        
    }

    async setUpOrder(customerId, shippingAddress){

        const statement =   `INSERT INTO orders
                            (customer_id, data_ordered, shipping_addres)
                            VALUES ($1, $2, $3)
                            RETURNING *;`
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString();
        const values = [customerId, formattedDate, shippingAddress]

        try{
            const response = await db.query(statement, values)
            if(response.rows.length === 0){
                return null
            }
            
            return response.rows[0]
        }
        catch(err){
            throw new Error(err)
        }

    }
}