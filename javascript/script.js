document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("storyForm");
  const categorySelect = document.getElementById("category");
  const emotionSelect = document.getElementById("emotion");

  // Function to handle sending the email
  function sendEmail() {
    let params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      title: document.getElementById("title").value,
      category: document.getElementById("category").value,
      emotion: document.getElementById("emotion").value,
      story: document.getElementById("story").value,
    };

    emailjs.send("service_f0dq80t", "template_o5zeila", params).then(
      function (response) {
        // Hide form and show thank you message
        document.getElementById("storyForm").style.display = "none";
        document.getElementById("formHeading").style.display = "none";
        document.getElementById("thankYou").style.display = "block";
        document.getElementById("formContainer").style.display = "none"; // Hide the form container

        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        alert("Failed to send email. Please try again.");
        console.error("FAILED...", error);
      }
    );
  }

  // Event listener for category dropdown
  categorySelect.addEventListener("change", function () {
    if (categorySelect.value !== "") {
      emotionSelect.disabled = true;
      document.getElementById("emotionError").innerText = ""; // Clear emotion error if category is selected
    } else {
      emotionSelect.disabled = false;
    }
    document.getElementById("categoryError").innerText = ""; // Clear category error on change
  });

  // Event listener for emotion dropdown
  emotionSelect.addEventListener("change", function () {
    if (emotionSelect.value !== "") {
      categorySelect.disabled = true;
      document.getElementById("categoryError").innerText = ""; // Clear category error if emotion is selected
    } else {
      categorySelect.disabled = false;
    }
    document.getElementById("emotionError").innerText = ""; // Clear emotion error on change
  });

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset previous errors
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("titleError").innerText = "";
    document.getElementById("storyError").innerText = "";
    document.getElementById("categoryError").innerText = "";
    document.getElementById("emotionError").innerText = "";

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const title = document.getElementById("title").value.trim();
    const story = document.getElementById("story").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const namePattern = /^[a-zA-Z\s]+$/;

    if (name === "") {
      document.getElementById("nameError").innerText = "Name is required";
      isValid = false;
    } else if (!namePattern.test(name)) {
      // Corrected: test name against namePattern
      document.getElementById("nameError").innerText =
        "Please enter a valid name using only letters.";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("emailError").innerText = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById("emailError").innerText =
        "Invalid email format (e.g. yourname@gmail.com)";
      isValid = false;
    }

    if (title === "") {
      document.getElementById("titleError").innerText =
        "Story title is required";
      isValid = false;
    }

    if (story === "") {
      document.getElementById("storyError").innerText =
        "Please write your story";
      isValid = false;
    }

    // Check if either category or emotion is selected (and not both or neither)
    const categorySelected = categorySelect.value !== "";
    const emotionSelected = emotionSelect.value !== "";

    if (!categorySelected && !emotionSelected) {
      document.getElementById("categoryError").innerText =
        "Please select either a category or an emotion.";
      document.getElementById("emotionError").innerText =
        "Please select either a category or an emotion.";
      isValid = false;
    } else if (categorySelected && emotionSelected) {
      // This case should ideally not happen due to disabled logic, but as a fallback
      document.getElementById("categoryError").innerText =
        "Please select only one: category or emotion.";
      document.getElementById("emotionError").innerText =
        "Please select only one: category or emotion.";
      isValid = false;
    }

    if (isValid) {
      sendEmail();
      // Form reset is now handled after successful email send, not here
      form.reset(); // Removed here, moved to sendEmail success
    }
  });
});
