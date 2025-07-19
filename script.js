class Sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="sidebar">
        <div class="logo">Kolorowey</div>
        <ul class="menu">
          <li class="menu-item" data-page="dashboard">
            <a href="/dashboard/dashboard.html" class="dash">
              <img src="/assets/home.png" alt="dashboard" />
              Dashboard
            </a>
          </li>
          <li class="menu-dropdown">
            <div class="menu-heading">
              <img src="/assets/create.png" alt="create" />
              <span>Create</span>
              <span class="dropdown-arrow">></span>
            </div>
            <ul class="dropdown-content">
              <li class="menu-item" data-page="partner">
                <a href="/create/create-partner.html"
                  ><span>Create Partner</span></a
                >
              </li>
              <li class="menu-item" data-page="publisher">
                <a href="/create/create-publisher.html"
                  ><span>Create Publisher</span></a
                >
              </li>
              <li class="menu-item" data-page="unit">
                <a href="/create/create-unit.html"
                  ><span>Create Ad Unit</span></a
                >
              </li>
            </ul>
          </li>
          <li class="menu-dropdown">
            <div class="menu-heading">
              <img src="/assets/list.png" alt="list" />
              <span>List</span>
              <span class="dropdown-arrow">></span>
            </div>
            <ul class="dropdown-content">
              <li class="menu-item" data-page="partner-list">
                <a href="/list/partner-list.html"
                  ><span>Partner List</span></a
                >
              </li>
              <li class="menu-item" data-page="publisher-list">
                <a href="/list/publisher-list.html"
                  ><span>Publisher List</span></a
                >
              </li>
              <li class="menu-item" data-page="unit-list">
                <a href="/list/unit-list.html"><span>Ad Unit List</span></a>
              </li>
            </ul>
          </li>
          <li>
            <div class="menu-heading logout">
              <img src="/assets/logout.png" alt="logout" />Logout
            </div>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define("the-sidebar", Sidebar);

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

// Toggle Payments

function togglePaymentFields() {
  const method = document.getElementById("payment-method").value;
  const details = document.querySelectorAll(".payment-details > div");

  details.forEach((div) => {
    if (div.dataset.method === method) {
      div.style.display = "flex";
    } else {
      div.style.display = "none";
    }
  });
}

// Nested Dropdown

function toggleDropdown(element) {
  const parent = element.closest(".actions");
  parent.classList.toggle("show");

  // Close other open dropdowns
  document.querySelectorAll(".actions").forEach((dropdown) => {
    if (dropdown !== parent) {
      dropdown.classList.remove("show");
    }
  });
}

// Close when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".actions")) {
    document.querySelectorAll(".actions").forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  }
});
