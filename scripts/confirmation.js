document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("LeGSwnqcXJ-xai3OW"); // ✅ Replace with your actual Public Key

    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");
    const formPopup = document.getElementById("form-popup");
    const submitButton = document.getElementById("submit-button");

    // Yes Button: Show Confetti & Display Form
    yesButton.addEventListener("click", function () {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            formPopup.style.display = "block";
        }, 1000);
    });

    // Handle Form Submission & Send Email
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        sendMail();
    });

    // No Button Moves Away
    noButton.addEventListener("mouseover", moveButton);
    noButton.addEventListener("click", moveButton);

    function moveButton() {
        noButton.style.position = "absolute";
        noButton.style.left = `${Math.random() * 80}vw`;
        noButton.style.top = `${Math.random() * 80}vh`;
    }
});

// ✅ Email Validation Function
function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
}


    function sendMail() {
        // Kuha ang values gikan sa form inputs
        const userName = document.getElementById("name-input").value;
        const userEmail = document.getElementById("email-input").value;

        // Check kung dili empty ang fields ug valid ang email
        if (userName && userEmail && validateEmail(userEmail)) {
            // Prepare ang email params
            const templateParams = {
                to_name: userName,
                user_email: userEmail,
                from_name: "Your Beloved", // Add your name here
            };

            // Gamit ang EmailJS service ug template
            emailjs.send("service_vcyy6z6", "template_er9m065", templateParams)
                .then(function(response) {
                    alert("Email sent successfully! 🥰");
                    console.log("SUCCESS!", response.status, response.text);
                }, function(error) {
                    alert("Failed to send email. 😢");
                    console.log("FAILED...", error);
                });
        } else {
            alert("Please fill out all the fields!");
        }
    }

        function closePopup() {
            document.getElementById("form-popup").style.display = "none";
        }
