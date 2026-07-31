  let currentSweet = "";
let currentPricePerKg = 0;

// Modal Open Karne Ka Function
function openOrderModal(sweetName, pricePerKg) {
    currentSweet = sweetName;
    currentPricePerKg = pricePerKg;
    
    document.getElementById("sweetName").innerText = sweetName;
    document.getElementById("totalPriceDisplay").innerText = "₹0";
    
    // Modal ko screen par open (display: flex) karna
    document.getElementById("orderModal").style.display = "flex";
}

// Modal Close Karne Ka Function
function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
    document.getElementById("orderForm").reset();
}

// Pricing System Calculator
function calculateTotal() {
    const kgValue = parseFloat(document.getElementById("quantity").value);
    if (!isNaN(kgValue) && kgValue > 0) {
        document.getElementById("totalPriceDisplay").innerText = "₹" + (kgValue * currentPricePerKg);
    } else {
        document.getElementById("totalPriceDisplay").innerText = "₹0";
    }
}

// Order Form Submit & WhatsApp Redirection Handler
function submitOrder(event) {
    event.preventDefault();
    
    const kgValue = document.getElementById("quantity").value;
    const nameValue = document.getElementById("customerName").value;
    const phoneValue = document.getElementById("customerPhone").value;
    const addressValue = document.getElementById("customerAddress").value; 
    const finalPrice = kgValue * currentPricePerKg;

    // Aapka WhatsApp Target Number (Country Code 91 Ke Sath)
    const shopWhatsAppNumber = "917838812625"; 
    
    // Premium Order Template Format
    const message = "*Naya Mithai Order Aaya Hai!* 🏪\n\n" +
                    "*Mithai Name:* " + currentSweet + "\n" +
                    "*Quantity:* " + kgValue + " KG\n" +
                    "*Total Estimated Price:* ₹" + finalPrice + "\n\n" +
                    "*Customer Delivery Profile:*\n" +
                    "- Name: " + nameValue + "\n" +
                    "- Contact No: " + phoneValue + "\n" +
                    "- Full Address: " + addressValue;
                  
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = "https://wa.me" + shopWhatsAppNumber + "?text=" + encodedMessage;
    
    // Modals reset state control logic
    closeOrderModal();
    document.getElementById("successModal").style.display = "flex";
    
    // Fallback Backup Button Integration
    const whatsappBtn = document.getElementById("whatsappLinkBtn");
    if (whatsappBtn) {
        whatsappBtn.href = whatsappURL;
    }

    // INTERACTIVE AUTOMATIC REDIRECT: Tab switch routing sub-process
    window.open(whatsappURL, '_blank');
}

// Modal Container Window Matrix Controller
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
