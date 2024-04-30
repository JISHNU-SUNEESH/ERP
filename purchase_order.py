
from flask import Flask,request,jsonify
import logging
import os
from connection import cursor

filepath='purchase_order.log'
if os.path.exists(filepath):
    os.remove(filepath)

logger_po=logging.getLogger('purchase_order')
logger_po.setLevel(logging.INFO)
po_handler=logging.FileHandler('purchase_order.log')
po_handler.setLevel(logging.INFO)
logger_po.addHandler(po_handler)


app=Flask(__name__)

@app.route('/pocreate',methods=['post'])
def po_creation():
    try:
        
        logger_po.info("Fetching data from UI")
        data=request.json
        po_number = data.get('po_number')
        date_issued = data.get('date_issued')
        vendor_name = data.get('vendor_name')
        vendor_contact = data.get('vendor_contact')
        item_description = data.get('item_description')
        quantity = data.get('quantity')
        unit_price = data.get('unit_price')
        total_price = quantity * unit_price

        logger_po.info(f"data collected successfully: {data}")

        logger_po.info("inserting data into table")


   
    

        query="INSERT INTO BI_ERP.PurchaseOrders (PO_Number, DateIssued, VendorName, VendorContact, ItemDescription, Quantity, UnitPrice, TotalPrice) \
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val=(po_number, date_issued, vendor_name, vendor_contact, item_description, quantity, unit_price, total_price)
        
        logger_po.info(f"Query:{query}")
        
        cursor.execute(query,params=val)

        logger_po.info("data loaded to purchaseorder")
        cursor.execute("commit;")
        logger_po.info("closing the connection after commiting")
        

        
        return jsonify({'message': 'Purchase order created successfully'}), 201
    
    except Exception as e:
        logger_po.info(f"Some Error occured: {e}")
        return ("Some error occured. Check logs")
    

@app.route('/poupdate',methods=['put'])
def po_update():
    try:
        logger_po.info("getting data for po update")
        data=request.json
        po_number=data.get('po_number')
        date_issued = data.get('date_issued')
        vendor_name = data.get('vendor_name')
        vendor_contact = data.get('vendor_contact')
        item_description = data.get('item_description')
        quantity = data.get('quantity')
        unit_price = data.get('unit_price')
        total_price = quantity * unit_price
        
        logger_po.info(f"data collected successfully: {data}")

        logger_po.info("Updating data into table")
        
        sql="update BI_ERP.PurchaseOrders set\
            DateIssued=%s,\
            VendorName=%s,\
            VendorContact=%s,\
            ItemDescription=%s,\
            Quantity=%s,\
            UnitPrice=%s,\
            TotalPrice=%s\
            where PO_Number=%s; "
        val=( date_issued, vendor_name, vendor_contact, item_description, quantity, unit_price, total_price,po_number)
        logger_po.info(f"Query being run: {sql}")
        cursor.execute(sql,val)
        logger_po.info("Updated the PO")
        cursor.execute("commit;")
        return jsonify({'message':'Po updated successfully'}),201
        
    except Exception as e:
        logger_po.info(e)
        return jsonify({'message':'some error occured !! Please check logs'})
         


@app.route('/podelete',methods=['delete'])
def delete_po():
    try:
        logger_po.info("fetching po for deletion")
        data=request.json
        po_number=data.get('po_number')
        
        sql="delete from BI_ERP.PurchaseOrders where po_number in (%s);"
        logger_po.info("deleting PO")
        
        cursor.execute(sql,params=(po_number,))
        logger_po.info("Po deleted")
        cursor.execute("commit;")
        return jsonify({'message':'Po deleted successfully'}),201
        
    except Exception as e:
        logger_po.info(e)
        return jsonify({'message:':'some error occured while deletion!!'})
    
if __name__=='__main__':
     app.run(debug=True,threaded=True)



