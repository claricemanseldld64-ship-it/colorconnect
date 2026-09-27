const form = document.getElementById("colorForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const color = document.getElementById("color").value.trim();

  if (!color || color.length > 40) {
    message.textContent = "Please enter a valid favourite color.";
    return;
  }

  message.textContent = "Submitting...";

  try {
    const response = await fetch("/api/favourite-color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ color })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Submission failed.");
    }

    // Clear the form
    form.reset();

    // Show thank-you popup
    alert(
      "Thank you! 🎨\n\n" +
      "Your favourite color has been submitted successfully.\n\n" +
      "Have a wonderful and successful week! ✨"
    );

    message.textContent = "";

  } catch (error) {
    console.error("Submission error:", error);
    message.textContent =
      error.message || "Something went wrong. Please try again.";
  }
});