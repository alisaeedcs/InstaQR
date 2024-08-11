// Function to generate a QR code
function generateQRCode() {
    const inputText = document.getElementById("qrInput").value;
    const qrCodeDiv = document.getElementById("qrCode");
    const generateButton = document.getElementById("generateButton");

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
        document.getElementById("copyButton").style.display = "inline";

        // Change the button color to indicate generation
        generateButton.classList.add("clicked");

        // Remove the class after a delay to reset the button
        setTimeout(() => {
            generateButton.classList.remove("clicked");
        }, 2000); // Adjust the delay as needed
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

function copyQRCode() {
    const qrCodeImg = document.querySelector("#qrCode img");

    if (!qrCodeImg) {
        alert("Please generate a QR code first.");
        return;
    }

    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = qrCodeImg.width;
    canvas.height = qrCodeImg.height;
    const context = canvas.getContext("2d");

    // Draw the GIF image onto the canvas
    context.drawImage(qrCodeImg, 0, 0);

    // Convert the canvas to a PNG data URL
    canvas.toBlob((blob) => {
        if (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]).then(() => {
                console.log("QR code image copied to clipboard as PNG!");
                copyButton.classList.add("success");
                setTimeout(() => {
                    copyButton.classList.remove("success"); }, 2000);
            }).catch(err => {
                console.error("Failed to copy image: ", err);
            });
        } else {
            console.error("Failed to convert canvas to blob.");
        }
    }, "image/png");

    
}




// Attach the functions to button click events
document.getElementById("generateButton").addEventListener("click", generateQRCode);
document.getElementById("saveButton").addEventListener("click", saveQRCode);
document.getElementById("copyButton").addEventListener("click", copyQRCode);
document.getElementById("saveButton").disabled = true;
document.getElementById("copyButton").style.display = "none";
