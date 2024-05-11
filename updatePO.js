function UpdateForm() {
    const updateWindow = window.open('', 'Update Purchase Order', 'width=device-width,height=600');
    updateWindow.document.write(`
    <html>
    <head>
        <title>Update Purchase Order</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="update-form-container">
            <h2>Update Purchase Order</h2>
            <form id="updateForm">
                <label for="update_po_number">PO Number:</label>
                <input type="text" id="update_po_number" required><br><br>
                <label for="update_date_issued">Date Issued:</label>
                <input type="date" id="update_date_issued" required><br><br>
                <label for="update_vendor_name">Vendor Name:</label>
                <input type="text" id="update_vendor_name" required><br><br>
                <label for="update_vendor_contact">Vendor Contact:</label>
                <input type="text" id="update_vendor_contact" required><br><br>
                <label for="update_item_description">Item Description:</label>
                <input type="text" id="update_item_description" required><br><br>
                <label for="update_quantity">Quantity:</label>
                <input type="number" id="update_quantity" required><br><br>
                <label for="update_unit_price">Unit Price:</label>
                <input type="number" id="update_unit_price" required><br><br>
                <button type="submit" class="action-button">Update</button>
            </form>
        </div>
    </body>
    </html>
    `);

    updateWindow.document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const po_number =updateWindow. document.getElementById('update_po_number').value;
        const date_issued = updateWindow.document.getElementById('update_date_issued').value;
        const vendor_name = updateWindow.document.getElementById('update_vendor_name').value;
        const vendor_contact = updateWindow.document.getElementById('update_vendor_contact').value;
        const item_description = updateWindow.document.getElementById('update_item_description').value;
        const quantity = updateWindow.document.getElementById('update_quantity').value;
        const unit_price = updateWindow.document.getElementById('update_unit_price').value;

        
        // Close the window and handle the update operation with the provided details
        updateWindow.close();
        updatePO(po_number,date_issued,vendor_name,vendor_contact,item_description,quantity,unit_price );
        console.log(po_number,date_issued,vendor_name,vendor_contact,item_description,quantity,unit_price );
    });
}



// Function to handle update operation with provided details
function updatePO(po_number,date_issued,vendor_name,vendor_contact,item_description,quantity,unit_price ) {
    // Perform update operation with the provided details
    // You can use fetch or other methods to send the update request to the server
    const data = {
        po_number: po_number,
        date_issued: date_issued,
        vendor_name: vendor_name,
        vendor_contact: vendor_contact,
        item_description: item_description,
        quantity: quantity,
        unit_price: unit_price
    };
    console.log(data)

    try {
        const response =   fetch('http://127.0.0.1:5000/poupdate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
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
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while creating the purchase order. Please try again later.');
    }
    // Display a message or perform additional actions as needed
    alert("Purchase order updated successfully.");
}