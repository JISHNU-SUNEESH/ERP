
from flask import Flask,request,jsonify
import logging
import os
from connection import cursor

filepath='purchase_order.log'
if os.path.exists(filepath):
    os.remove(filepath)
logging.basicConfig(filename='purchase_order.log',level=logging.INFO)

app=Flask(__name__)

@app.route('/pocreate',methods=['post'])
def po_creation():
    try:
        
        logging.info("Fetching data from UI")
        data=request.json
        po_number = data.get('po_number')
        date_issued = data.get('date_issued')
        vendor_name = data.get('vendor_name')
        vendor_contact = data.get('vendor_contact')
        item_description = data.get('item_description')
        quantity = data.get('quantity')
        unit_price = data.get('unit_price')
        total_price = quantity * unit_price

        logging.info(f"data collected successfully: {data}")

        logging.info("inserting data into table")


   
    

        query="INSERT INTO PurchaseOrder (PO_Number, DateIssued, VendorName, VendorContact, ItemDescription, Quantity, UnitPrice, TotalPrice) \
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val=(po_number, date_issued, vendor_name, vendor_contact, item_description, quantity, unit_price, total_price)
        
        logging.info(f"Query:{query}")
        
        cursor.execute(query,params=val)

        logging.info("data loaded to purchaseorder")
        cursor.execute("commit;")
        logging.info("closing the connection after commiting")
        connection.commit

        
        return jsonify({'message': 'Purchase order created successfully'}), 201
    
    except Exception as e:
        logging.info(f"Some Error occured: {e}")
        return ("Some error occured. Check logs")
    

if __name__=='__main__':
    app.run(debug=True,threaded=True)



