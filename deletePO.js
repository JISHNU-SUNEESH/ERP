function DeleteForm() {
    const deleteWindow = window.open('', 'Delete Purchase Order', 'width=device-width,height=400');
    deleteWindow.document.write(`
    <html>
    <head>
        <title>Delete Purchase Order</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="delete-form-container">
            <h2>Delete Purchase Order</h2>
            <form id="deleteForm">
                <label for="delete_po_number">PO Number:</label>
                <input type="text" id="delete_po_number" required><br><br>
                <button type="submit" class="action-button">Delete</button>
            </form>
        </div>
    </body>
    </html>
    `);

    // Add event listener to the form submission
    deleteWindow.document.getElementById('deleteForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const poNumber = deleteWindow.document.getElementById('delete_po_number').value; // Retrieve PO number from the form
        deleteWindow.close(); // Close the window
        deletePurchaseOrder(poNumber); // Call deletePurchaseOrder function with the PO number
    });
}

function deletePurchaseOrder(poNumber) {
    // Perform delete operation with the provided PO number
    const data = { po_number: poNumber };

    fetch('http://127.0.0.1:5000/podelete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete purchase order.');
        }
        return response.json();
    })
    .then(data => {
        // Display success message
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the purchase order. Please try again later.');
    });
}