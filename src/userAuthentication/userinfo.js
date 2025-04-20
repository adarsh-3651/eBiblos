document.getElementById('user-info-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission to the server

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    // Validation (for example, ensuring name and email are not empty)
    if (name && email && bio) {
        const userInfo = `
            <strong>Name:</strong> ${name} <br>
            <strong>Email:</strong> ${email} <br>
            <strong>Bio:</strong> ${bio}
        `;
        
        // Displaying user information below the form
        document.getElementById('user-info-output').innerHTML = userInfo;
    } else {
        document.getElementById('user-info-output').innerHTML = '<span style="color:red;">Please fill in all fields.</span>';
    }
});
