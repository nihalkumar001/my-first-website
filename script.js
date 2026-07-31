 let currentSweet = "";
let currentPricePerKg = 0;

function openOrderModal(sweetName, pricePerKg) {
    currentSweet = sweetName;
    currentPricePerKg = pricePerKg;
    document.getElementById("sweetName").innerText = sweetName;
    document.getElementById("orderModal").style.display = "flex";
    document.getElementById("totalPriceDisplay").innerText = "₹0";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
    document.getElementById("orderForm").reset();
}

function calculateTotal() {
    const kgValue = parseFloat(document.getElementById("quantity").value);
    if (!isNaN(kgValue) && kgValue > 0) {
        document.getElementById("totalPriceDisplay").innerText = "₹" + (kgValue * currentPricePerKg);
    } else {
        document.getElementById("totalPriceDisplay").innerText = "₹0";
    }
}

function submitOrder(event) {
    event.preventDefault();
    
    const kgValue = document.getElementById("quantity").value;
    const nameValue = document.getElementById("customerName").value;
    const phoneValue = document.getElementById("customerPhone").value;
    const addressValue = document.getElementById("customerAddress").value; 
    const finalPrice = kgValue * currentPricePerKg;

    // Sahi Formatting Waala Number
    const shopWhatsAppNumber = "917838812625"; 
    
    const message = "*Naya Mithai Order Aaya Hai!* 🏪\n\n" +
                    "*Mithai:* " + currentSweet + "\n" +
                    "*Quantity:* " + kgValue + " KG\n" +
                    "*Total Price:* ₹" + finalPrice + "\n\n" +
                    "*Customer Details:*\n" +
                    "- Name: " + nameValue + "\n" +
                    "- Contact No: " + phoneValue + "\n" +
                    "- Address: " + addressValue;
                  
    const encodedMessage = encodeURIComponent(message);
    
    // FIXED: Yahan forward slash (/) lagaya hai taaki link tootey nahi
    const whatsappURL = "https://wa.me/" + shopWhatsAppNumber + "?text=" + encodedMessage;
    
    closeOrderModal();
    document.getElementById("successModal").style.display = "flex";
    
    const whatsappBtn = document.getElementById("whatsappLinkBtn");
    if (whatsappBtn) {
        whatsappBtn.href = whatsappURL;
    }

    // AUTOMATIC REDIRECT: Form submit hote hi customer ko seedhe WhatsApp par bhejne ke liye
    window.open(whatsappURL, '_blank');
}

window.onclick = function(event) {
    const orderModal = document.getElementById("orderModal");
    const successModal = document.getElementById("successModal");
    
    if (event.target == orderModal) {
        closeOrderModal();
    }
    if (event.target == successModal) {
        document.getElementById("successModal").style.display = "none";
    }
}
