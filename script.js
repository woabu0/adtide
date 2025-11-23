/**
 * Main Application JavaScript
 * Handles sidebar, dropdowns, and form interactions
 */

(function() {
  'use strict';

  // Sidebar Web Component
  class Sidebar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="sidebar">
          <div class="logo">
            <a href="/dashboard/dashboard.html" class="logo-link">Adtide</a>
          </div>
          <nav class="sidebar-nav" role="navigation" aria-label="Sidebar navigation">
            <ul class="menu">
              <li class="menu-item" data-page="dashboard">
                <a href="/dashboard/dashboard.html" class="menu-link" aria-label="Dashboard">
                  <img src="/assets/home.png" alt="Dashboard icon" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li class="menu-dropdown">
                <button class="menu-heading" aria-expanded="false" aria-haspopup="true">
                  <img src="/assets/create.png" alt="Create icon" />
                  <span>Create</span>
                  <span class="dropdown-arrow" aria-hidden="true">></span>
                </button>
                <ul class="dropdown-content" role="menu">
                  <li class="menu-item" data-page="partner">
                    <a href="/create/create-partner.html" class="menu-link" role="menuitem">
                      <span>Create Partner</span>
                    </a>
                  </li>
                  <li class="menu-item" data-page="publisher">
                    <a href="/create/create-publisher.html" class="menu-link" role="menuitem">
                      <span>Create Publisher</span>
                    </a>
                  </li>
                  <li class="menu-item" data-page="unit">
                    <a href="/create/create-unit.html" class="menu-link" role="menuitem">
                      <span>Create Ad Unit</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="menu-dropdown">
                <button class="menu-heading" aria-expanded="false" aria-haspopup="true">
                  <img src="/assets/list.png" alt="List icon" />
                  <span>List</span>
                  <span class="dropdown-arrow" aria-hidden="true">></span>
                </button>
                <ul class="dropdown-content" role="menu">
                  <li class="menu-item" data-page="partner-list">
                    <a href="/list/partner-list.html" class="menu-link" role="menuitem">
                      <span>Partner List</span>
                    </a>
                  </li>
                  <li class="menu-item" data-page="publisher-list">
                    <a href="/list/publisher-list.html" class="menu-link" role="menuitem">
                      <span>Publisher List</span>
                    </a>
                  </li>
                  <li class="menu-item" data-page="unit-list">
                    <a href="/list/unit-list.html" class="menu-link" role="menuitem">
                      <span>Ad Unit List</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <button class="menu-heading logout" aria-label="Logout">
                  <img src="/assets/logout.png" alt="Logout icon" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      `;
    }
  }

  customElements.define("the-sidebar", Sidebar);

  // Initialize sidebar functionality when DOM is ready
  document.addEventListener("DOMContentLoaded", function() {
    initializeSidebar();
    initializeActivePage();
  });

  /**
   * Initialize sidebar dropdown functionality
   */
  function initializeSidebar() {
    const dropdownHeadings = document.querySelectorAll(".menu-heading");

    dropdownHeadings.forEach((heading) => {
      // Skip logout button
      if (heading.classList.contains('logout')) {
        heading.addEventListener('click', handleLogout);
        return;
      }

      heading.addEventListener("click", function(e) {
        e.preventDefault();
        const dropdownContent = this.nextElementSibling;
        const arrow = this.querySelector(".dropdown-arrow");

        if (!dropdownContent || !arrow) return;

        const isOpening = !dropdownContent.classList.contains("active");

        // Close all other dropdowns
        if (isOpening) {
          closeAllDropdowns(dropdownContent);
        }

        // Toggle current dropdown
        toggleDropdown(dropdownContent, arrow, this);
      });
    });

    // Keep dropdowns open when clicking links inside them
    const dropdownLinks = document.querySelectorAll(".dropdown-content .menu-link");
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", function(e) {
        const dropdownContent = this.closest(".dropdown-content");
        if (dropdownContent) {
          // Keep dropdown open
          dropdownContent.classList.add("active");
          const button = dropdownContent.previousElementSibling;
          const arrow = button?.querySelector(".dropdown-arrow");
          if (button && arrow) {
            button.setAttribute("aria-expanded", "true");
            arrow.style.transform = "rotate(90deg)";
          }
        }
      });
    });
  }

  /**
   * Toggle dropdown state
   */
  function toggleDropdown(content, arrow, button) {
    const isActive = content.classList.contains("active");
    
    content.classList.toggle("active");
    button.setAttribute("aria-expanded", !isActive);
    arrow.style.transform = !isActive ? "rotate(90deg)" : "rotate(0)";
  }

  /**
   * Close all dropdowns except the specified one
   */
  function closeAllDropdowns(exceptContent) {
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      if (content !== exceptContent && content.classList.contains("active")) {
        content.classList.remove("active");
        const button = content.previousElementSibling;
        const arrow = button?.querySelector(".dropdown-arrow");
        
        if (button && arrow) {
          button.setAttribute("aria-expanded", "false");
          arrow.style.transform = "rotate(0)";
        }
      }
    });
  }

  /**
   * Set active page based on current URL
   */
  function initializeActivePage() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {
      const link = item.querySelector("a");
      if (link && currentPath.includes(link.getAttribute("href"))) {
        item.classList.add("active");
      }
    });
  }

  /**
   * Handle logout
   */
  function handleLogout() {
    if (confirm("Are you sure you want to logout?")) {
      // Clear any stored authentication data
      // sessionStorage.clear();
      // localStorage.removeItem('authToken');
      
      // Redirect to login
      window.location.href = "/auth/login.html";
    }
  }

  // Export functions for use in other scripts
  window.SidebarUtils = {
    addDomainField: addDomainField,
    togglePaymentFields: togglePaymentFields,
    toggleDropdown: toggleActionDropdown
  };

  /**
   * Add dynamic domain input field
   */
  function addDomainField() {
    const container = document.querySelector(".domain-container");
    if (!container) return;

    const newField = document.createElement("div");
    newField.className = "input-field";
    newField.style.marginTop = "10px";
    newField.innerHTML = `
      <label for="domain-${Date.now()}">Domain</label>
      <input
        type="text"
        id="domain-${Date.now()}"
        name="domain[]"
        placeholder="Enter domain (e.g., example.com)"
        required
      />
      <button type="button" class="remove-domain" aria-label="Remove domain field" onclick="this.parentElement.remove()">
        ×
      </button>
    `;

    container.appendChild(newField);
  }

  /**
   * Toggle payment method fields
   */
  function togglePaymentFields() {
    const methodSelect = document.getElementById("payment-method");
    if (!methodSelect) return;

    const method = methodSelect.value;
    const details = document.querySelectorAll(".payment-details > div");

    details.forEach((div) => {
      if (div.dataset.method === method) {
        div.style.display = "flex";
        div.setAttribute("aria-hidden", "false");
      } else {
        div.style.display = "none";
        div.setAttribute("aria-hidden", "true");
      }
    });
  }

  /**
   * Toggle action dropdown menu
   */
  function toggleActionDropdown(element) {
    const parent = element.closest(".actions");
    if (!parent) return;

    const isOpen = parent.classList.contains("show");
    
    // Close all other dropdowns
    if (!isOpen) {
      document.querySelectorAll(".actions").forEach((dropdown) => {
        if (dropdown !== parent) {
          dropdown.classList.remove("show");
        }
      });
    }

    parent.classList.toggle("show");
  }

  // Close dropdowns when clicking outside (but not sidebar dropdowns)
  document.addEventListener("click", function(e) {
    // Don't close sidebar dropdowns when clicking inside them
    if (e.target.closest(".dropdown-content")) {
      return;
    }
    
    // Don't close if clicking on a dropdown link
    if (e.target.closest(".dropdown-content .menu-link")) {
      return;
    }
    
    // Don't close sidebar dropdowns when clicking in sidebar
    if (e.target.closest(".sidebar")) {
      return;
    }
    
    if (!e.target.closest(".actions")) {
      document.querySelectorAll(".actions").forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    }
  });

  // Close dropdowns on Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".actions.show").forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    }
  });

  // Mobile menu toggle
  initializeMobileMenu();
})();

/**
 * Initialize mobile menu toggle functionality
 */
function initializeMobileMenu() {
  // Create mobile menu toggle button if it doesn't exist
  if (!document.querySelector('.mobile-menu-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(toggle);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Toggle sidebar
    toggle.addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar-container');
      const isActive = sidebar.classList.contains('active');
      
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      toggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (!isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar-container');
      const toggle = document.querySelector('.mobile-menu-toggle');
      
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close sidebar when clicking menu links on mobile (but not dropdown links)
    const menuLinks = document.querySelectorAll('.menu-link:not(.dropdown-content .menu-link)');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          // Don't close if clicking on a dropdown link
          if (!this.closest('.dropdown-content')) {
            const sidebar = document.querySelector('.sidebar-container');
            const overlay = document.querySelector('.sidebar-overlay');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });
    
    // Keep dropdowns open on mobile - don't close when clicking dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-content .menu-link');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Keep the parent dropdown open
        const dropdownContent = this.closest(".dropdown-content");
        if (dropdownContent) {
          dropdownContent.classList.add("active");
          const button = dropdownContent.previousElementSibling;
          const arrow = button?.querySelector(".dropdown-arrow");
          if (button && arrow) {
            button.setAttribute("aria-expanded", "true");
            arrow.style.transform = "rotate(90deg)";
          }
        }
      });
    });
  }
}
