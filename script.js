function processImage() {
    let imageInput = document.getElementById('imageInput').files[0];

    if (!imageInput) {
        alert("Please upload an image first!");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(imageInput);
    reader.onload = function (event) {
        let imageUrl = event.target.result;
        Tesseract.recognize(imageUrl, 'eng', {
            logger: m => console.log(m)
        }).then(({ data: { text } }) => {
            document.getElementById("extractedText").innerText = text;
            checkForErrors(text);
        });
    };
}

function checkForErrors(text) {
    let errors = [];
    
    // Basic error detection
    if (!text.match(/\d{1,3}(mg|ml|g)/)) {
        errors.push("❌ No dosage found (e.g., 500mg, 5ml).");
    }
    
    if (text.length < 5) {
        errors.push("❌ Unreadable or very short text detected.");
    }

    if (errors.length > 0) {
        document.getElementById("errorMessage").innerHTML = errors.join("<br>");
    } else {
        document.getElementById("errorMessage").innerHTML = "✅ No major errors detected.";
    }
}