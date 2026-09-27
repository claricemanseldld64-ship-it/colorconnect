const form = document.getElementById("colorForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const color = document.getElementById("color").value.trim();

  try {
    const response = await fetch("/api/favourite-color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ color })
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    message.textContent = "Your answer has been submitted!";
    form.reset();
  } catch (error) {
    message.textContent = "Something went wrong. Try again.";
  }
});