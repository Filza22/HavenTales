      document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById("storyForm"); // Correctly reference the form by its ID

        function sendEmail() {

          let params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            emotion: document.getElementById("emotion").value,
            story: document.getElementById("story").value
          }

          emailjs.send('service_f0dq80t', 'template_o5zeila', params)
            .then(function (response) {
              // Hide form and show thank you
              document.getElementById("storyForm").style.display = "none";
              document.getElementById("formHeading").style.display = "none";
              document.getElementById("thankYou").style.display = "block";
              console.log("SUCCESS!", response.status, response.text);
            }, function (error) {
              alert("Failed to send email. Please try again.");
              console.error("FAILED...", error);
            });
        }

        // Add event listener for form submission
        form.addEventListener('submit', function (event) {
          event.preventDefault(); // Prevent default form submission initially
          event.stopPropagation(); // Stop propagation of the event

          if (form.checkValidity()) {
            // If the form is valid, then call sendEmail
            sendEmail();
          }

          form.classList.add('was-validated');
        });
      }); // End of DOMContentLoaded