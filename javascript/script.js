// Check if user is signed up before allowing story submission
function checkSignupBeforeSubmit() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storyForm = document.getElementById("storyForm");

  if (!isLoggedIn || isLoggedIn !== "true") {
    // Always block form submission
    if (storyForm) {
      storyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Please sign up to submit your story.");
        return false;
      });
      // Optionally disable all fields
      Array.from(storyForm.elements).forEach((el) => (el.disabled = true));
    }

    // Hide form container and heading if they exist
    const formContainer = document.getElementById("formContainer");
    if (formContainer) formContainer.style.display = "none";
    const formHeading = document.getElementById("formHeading");
    if (formHeading) formHeading.style.display = "none";

    // Show message in a guaranteed visible place
    let msg = document.createElement("div");
    msg.className = "thankyou-message";
    msg.innerHTML = `<h2 class=\"heading-2\">Please sign up to submit your story.</h2>
      <a href=\"signup.html\" class=\"btns mt-5\">Go to Signup</a>`;

    // Try to append to main content, fallback to body
    let parent =
      document.querySelector(".container .row .col-12") ||
      document.querySelector(".container") ||
      document.body;
    parent.appendChild(msg);
    return false; // Block further logic
  }
  return true; // Allow further logic
}

// Run signup check first, before any other DOMContentLoaded logic
if (window.location.pathname.includes("submit.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    if (!checkSignupBeforeSubmit()) return; // If not signed up, block further logic

    const form = document.getElementById("storyForm");
    const categorySelect = document.getElementById("category");

    // Function to handle sending the email
    function sendEmail() {
      let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
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

    // Form submission handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Reset previous errors
      document.getElementById("nameError").innerText = "";
      document.getElementById("emailError").innerText = "";
      document.getElementById("titleError").innerText = "";
      document.getElementById("storyError").innerText = "";
      document.getElementById("categoryError").innerText = "";

      let isValid = true;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const category = document.getElementById("category").value.trim();
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

      if (category === "") {
        document.getElementById("categoryError").innerText =
          "Cayegory is required";
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

      // Check if either category is selected (and not both or neither)
      const categorySelected = categorySelect.value !== "";

      if (isValid) {
        sendEmail();
        // Form reset is now handled after successful email send, not here
        form.reset(); // Removed here, moved to sendEmail success
      }
    });
  });
}

// Singup Page
function togglePassword(fieldId, iconSpan) {
  let input = document.getElementById(fieldId);
  let icon = iconSpan.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    let namePattern = /^[a-zA-Z\s]+$/;
    if (name === "" || !namePattern.test(name)) {
      nameError.textContent = "Please enter a valid name.";
      isValid = false;
    }

    let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (email === "" || !emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid Gmail address.";
      isValid = false;
    }

    if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (confirmPassword !== password) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }

    if (isValid) {
      let userData = { name, email, password };
      localStorage.setItem("haventalesUser", JSON.stringify(userData));
      alert("Signup successful!");
      document.getElementById("signupForm").reset();
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("signupModal")
      );
      modal.hide();
      window.location.href = "index.html";
    }
  });



  // AI Chat Bot
   const API_KEY = "AIzaSyA0m5vNEcTg6CWVjoojUU71nR_l2j7q05Q"; // apni key yahan dalna
    const MODEL = "gemini-1.5-flash";

    const messagesEl = document.getElementById('messages');
    const inputEl = document.getElementById('user-input');
    const sendBtn = document.getElementById('sendBtn');

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    function toggleChat() {
      const chatbox = document.getElementById('chatbox');
      chatbox.style.display = (chatbox.style.display === 'flex') ? 'none' : 'flex';
      chatbox.style.flexDirection = 'column';
    }

    async function sendMessage() {
      const userMessage = inputEl.value.trim();
      if (!userMessage) return;

      appendMessage('You', userMessage, 'user-msg');
      inputEl.value = '';

      const botReply = await getBotReply(userMessage);
      appendMessage('Bot', botReply, 'bot-msg');
    }

    function appendMessage(sender, text, className) {
      const msgEl = document.createElement('div');
      msgEl.className = `message ${className}`;
      msgEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
      messagesEl.appendChild(msgEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    async function getBotReply(message) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: message }] }]
            })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          return `Error: ${response.status} - Check API key or model name.`;
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from AI.";
      } catch (err) {
        console.error(err);
        return "Sorry, something went wrong.";
      }
    }
