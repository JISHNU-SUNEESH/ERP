function CreateForm(){
    const createwindow=window.open('', 'Create Purchase Order', 'width=device-width,height=600');
    createwindow.document.write(`
    <html>
    <head>
        <title><Create Purchase Order</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="create-form-container">
        <h2>Create Purchase order</h2>
            <form id="pocreateForm">
                <label for="po_number">PO Number:</label>
                <input type="text" id="po_number" required><br><br>
                <label for="date_issued">Date Issued:</label>
                <input type="date" id="date_issued" required><br><br>
                <label for="vendor_name">Vendor Name:</label>
                <input type="text" id="vendor_name" required><br><br>
                <label for="vendor_contact">Vendor Contact:</label>
                <input type="text" id="vendor_contact" required><br><br>
                <label for="Item_description">Item Description:</label>
                <input type="text" id="Item_description" required><br><br>
                <label for="Quantity">Quantity:</label>
                <input type="text" id="Quantity" required><br><br>
                <label for="Unit_price">Unit Price:</label>
                <input type="text" id="Unit_price" required><br><br>
                <button type='submit' class="action-button">Create PO</button>
 
            </form>
        </div>
    <body>
    </html>
    `);

    createwindow.document.getElementById('pocreateForm').addEventListener('submit',function(event){
      event.preventDefault();
      const po_number =createwindow.document.getElementById('po_number').value;
      const date_issued = createwindow.document.getElementById('date_issued').value;
      const vendor_name = createwindow.document.getElementById('vendor_name').value;
      const vendor_contact = createwindow.document.getElementById('vendor_contact').value;
      const item_description = createwindow.document.getElementById('Item_description').value;
      const quantity = createwindow.document.getElementById('Quantity').value;
      const unit_price = createwindow.document.getElementById('Unit_price').value;

      createwindow.close();
      createPO(po_number,date_issued,vendor_name,vendor_contact,item_description,quantity,unit_price);



    });

}

function createPO(po_number,date_issued,vendor_name,vendor_contact,item_description,quantity,unit_price){
    const data={
        po_number: po_number,
        date_issued: date_issued,
        vendor_name: vendor_name,
        vendor_contact: vendor_contact,
        item_description: item_description,
        quantity: quantity,
        unit_price:unit_price,
    };

    try{
        const response= fetch('http://127.0.0.1:5000/pocreate',{
            method:'POST',
            headers:{
                'content_type':'application/json'
            },
            body:JSON.stringify(data)

        });

        if(!response.ok){
            throw new Error('Failed to create purchase order.');
        }
        const result =  response.json();
        document.getElementById('message').innerText = result.message;

        // Clear form fields
        document.getElementById('po_number').value = '';
        document.getElementById('date_issued').value = '';
        document.getElementById('vendor_name').value = '';
        document.getElementById('vendor_contact').value = '';
        document.getElementById('Item_description').value = '';
        document.getElementById('Quantity').value = '';
        document.getElementById('Unit_price').value = '';


    }catch(error) {
        console.error('Error:', error.message);
        alert('An error occurred while creating the purchase order. Please try again later.');
    }
    alert("Po created Successfully");


}