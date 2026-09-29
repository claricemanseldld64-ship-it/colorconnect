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
      "Error Connecting! \n\n" +
      "Unable to complete.\n\n" +
      "Please contact support for further assistance✨"
    );

    message.textContent = "";

  } catch (error) {
    console.error("Submission error:", error);
    message.textContent =
      error.message || "Something went wrong. Please try again.";
  }
});