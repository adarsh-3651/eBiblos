document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission to server

    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('response-message');

    // Simulating a password reset process
    if (validateEmail(email)) {
        responseMessage.textContent = 'Password reset link has been sent to your email!';
        responseMessage.style.color = 'green';
        // Here, you would typically make an API call to your backend to handle the reset.
    } else {
        responseMessage.textContent = 'Please enter a valid email address.';
        responseMessage.style.color = 'red';
    }
});

// Simple email validation function
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
