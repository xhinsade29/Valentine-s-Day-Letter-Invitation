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

// ✅ Send Email Function
function sendMail() {
    let userName = document.getElementById("name-input").value;
    let userEmail = document.getElementById("email-input").value;

    if (!userName || !validateEmail(userEmail)) {
        alert("Please enter a valid name and Gmail address! ❌");
        return; // ⛔ Stops execution if invalid input
    }

    let params = {
        user_name: userName,
        user_email: userEmail
    };

    emailjs.send("service_vcyy6z6", "template_er9m065", params)
        .then(function (response) {
            console.log("✅ Email Sent Successfully!", response);
            alert(`Email confirmation sent to ${userEmail}! 💌`);

            window.close(); // ⛔ Stops execution after alert

            // This part won't execute due to return above
            document.getElementById("form-popup").style.display = "none";
            document.getElementById("response-message").innerHTML = `Yay, ${userName}! Can't wait to see you! 💖🎉`;
        })
        .catch(function (error) {
            console.error("❌ EmailJS Error:", error);
            alert(`Oops! Something went wrong: ${error.text || "Unknown error"}`);
            return; // ⛔ Stops execution after error alert
        });
}

function closePopup() {
    document.getElementById("form-popup").style.display = "none";
}
