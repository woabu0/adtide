document.addEventListener("DOMContentLoaded", function () {
  // Get all dropdown headings
  const dropdownHeadings = document.querySelectorAll(".menu-heading");

  // Add click event to each heading
  dropdownHeadings.forEach((heading) => {
    heading.addEventListener("click", function () {
      // Get the dropdown content and arrow for this heading
      const dropdownContent = this.nextElementSibling;
      const arrow = this.querySelector(".dropdown-arrow");

      // Toggle current dropdown
      const isOpening = !dropdownContent.classList.contains("active");

      // Close all other dropdowns first
      if (isOpening) {
        document.querySelectorAll(".dropdown-content").forEach((content) => {
          if (content !== dropdownContent) {
            content.classList.remove("active");
            const otherArrow =
              content.previousElementSibling.querySelector(".dropdown-arrow");
            otherArrow.style.transform = "rotate(0)";
          }
        });
      }

      // Toggle this dropdown
      dropdownContent.classList.toggle("active");

      // Rotate arrow
      arrow.style.transform = dropdownContent.classList.contains("active")
        ? "rotate(90deg)"
        : "rotate(0)";
    });
  });
});

// Dynamic input fields

function addDomainField() {
  // Get the container where new fields will go
  const container = document.querySelector(".domain-container");

  // Create a new domain input field
  const newField = document.createElement("div");
  newField.className = "input-field";
  newField.style.marginTop = "10px"; // optional spacing
  newField.innerHTML = `
    <label>Domain</label>
    <input
      type="text"
      name=""
      placeholder="Enter domain (e.g., example.com)"
    />
  `;

  // Append it to the container
  container.appendChild(newField);
}
