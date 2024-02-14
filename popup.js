// Function to generate a QR code
function generateQRCode() {
    const inputText = document.getElementById("qrInput").value;
    const qrCodeDiv = document.getElementById("qrCode");

    if (inputText.trim() === "") {
        qrCodeDiv.innerHTML = "Please enter text or a URL.";
    } else {
        // Create a QR Code
        const qr = qrcode(0, 'M');
        qr.addData(inputText);
        qr.make();

        // Display the QR Code
        qrCodeDiv.innerHTML = qr.createImgTag(4);

        // Enable the save and copy buttons
        document.getElementById("saveButton").disabled = false;
        document.getElementById("saveButton").style.display = "inline";
    }
}

// Function to save the QR code as an image
function saveQRCode() {
    const qrCodeImg = document.querySelector("#qrCode img");
    const qrCodeCanvas = document.createElement("canvas");
    qrCodeCanvas.width = qrCodeImg.width;
    qrCodeCanvas.height = qrCodeImg.height;
    const context = qrCodeCanvas.getContext("2d");
    context.drawImage(qrCodeImg, 0, 0);
    const qrCodeDataUrl = qrCodeCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = qrCodeDataUrl;
    a.download = "qrcode.png";
    a.click();
}


// Attach the generateQRCode function to the button click event
document.getElementById("generateButton").addEventListener("click", generateQRCode);
document.getElementById("saveButton").addEventListener("click", saveQRCode);
document.getElementById("saveButton").disabled = true;


