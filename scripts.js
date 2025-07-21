// Hamburger Menu and Sidebar Functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("close-btn");

  // Function to open sidebar
  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    hamburgerMenu.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  // Function to close sidebar
  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling
  }

  // Event listeners
  hamburgerMenu.addEventListener("click", function () {
    if (sidebar.classList.contains("active")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Close sidebar when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  // Close sidebar when clicking on a navigation link
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Optional: prevent default if you want to handle navigation differently
      // e.preventDefault();
      closeSidebar();
    });
  });
});

// Welcome message time-based greeting
document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = document.getElementById("welcome-message");
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  if (welcomeMessage) {
    welcomeMessage.textContent = `${greeting}, John!`;
  }
});

// Live Clock Functionality
function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById("current-time");
  const dateElement = document.getElementById("current-date");

  if (timeElement && dateElement) {
    // Format time as HH:MM:SS
    const timeString = now.toLocaleTimeString();
    timeElement.textContent = timeString;

    // Format date as "Day, Month Date, Year"
    const dateString = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateElement.textContent = dateString;
  }
}

// Update clock every second
setInterval(updateClock, 1000);
// Call immediately to avoid delay
updateClock();

// Notification System
function showNotification(message, type = "success") {
  const container = document.getElementById("notification-container");
  if (!container) return;

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add to container
  container.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 300);
  }, 3000);

  // Allow manual removal by clicking
  notification.addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 300);
  });
}

// Simple Analytics Simulation
function updateStats() {
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const currentValue = parseInt(stat.textContent);
    // Randomly fluctuate numbers slightly (realistic office dynamics)
    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const newValue = Math.max(0, currentValue + change);
    stat.textContent = newValue;
  });
}

// Update stats every 30 seconds
setInterval(updateStats, 30000);

// Accessibility improvements
document.addEventListener("DOMContentLoaded", function () {
  // Add ARIA attributes
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Set initial ARIA states
  hamburgerMenu.setAttribute("aria-expanded", "false");
  hamburgerMenu.setAttribute("aria-controls", "sidebar");
  hamburgerMenu.setAttribute("aria-label", "Toggle navigation menu");

  sidebar.setAttribute("aria-hidden", "true");
  sidebar.setAttribute("role", "navigation");
  sidebar.setAttribute("aria-label", "Main navigation");

  overlay.setAttribute("aria-hidden", "true");

  // Update ARIA states when sidebar opens/closes
  function updateAriaStates(isOpen) {
    hamburgerMenu.setAttribute("aria-expanded", isOpen.toString());
    sidebar.setAttribute("aria-hidden", (!isOpen).toString());
    overlay.setAttribute("aria-hidden", (!isOpen).toString());

    if (isOpen) {
      // Focus management - focus first link in sidebar
      const firstLink = sidebar.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  // Enhanced openSidebar function
  const originalOpenSidebar = window.openSidebar || function () {};
  window.openSidebar = function () {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    hamburgerMenu.classList.add("active");
    document.body.style.overflow = "hidden";
    updateAriaStates(true);
  };

  // Enhanced closeSidebar function
  const originalCloseSidebar = window.closeSidebar || function () {};
  window.closeSidebar = function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    document.body.style.overflow = "auto";
    updateAriaStates(false);

    // Return focus to hamburger menu
    hamburgerMenu.focus();
  };

  // Add keyboard navigation for employee search
  const employeeSearch = document.querySelector(".employee-search");
  if (employeeSearch) {
    employeeSearch.setAttribute("role", "searchbox");
    employeeSearch.setAttribute("aria-label", "Search team members");

    // Simple search functionality
    employeeSearch.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const employees = document.querySelectorAll(".employee-item");

      employees.forEach((employee) => {
        const name = employee
          .querySelector(".employee-name")
          .textContent.toLowerCase();
        const role = employee
          .querySelector(".employee-role")
          .textContent.toLowerCase();

        if (name.includes(searchTerm) || role.includes(searchTerm)) {
          employee.style.display = "flex";
        } else {
          employee.style.display = "none";
        }
      });
    });
  }

  // Add keyboard navigation for cards
  const dashboardCards = document.querySelectorAll(".dashboard-card");
  dashboardCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "region");

    const header = card.querySelector(".card-header h2");
    if (header) {
      card.setAttribute("aria-labelledby", header.id || "card-header");
    }
  });

  // Add live region for announcements
  const announcements = document.querySelector(".announcements");
  if (announcements) {
    announcements.setAttribute("aria-live", "polite");
    announcements.setAttribute("aria-atomic", "false");
  }

  // Add proper button roles and labels
  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((btn) => {
    btn.setAttribute("role", "button");
    if (!btn.getAttribute("aria-label") && !btn.textContent.trim()) {
      btn.setAttribute(
        "aria-label",
        btn.getAttribute("href") || "Action button"
      );
    }
  });

  // Add status indicators with proper labels
  const statusIndicators = document.querySelectorAll(".employee-status");
  statusIndicators.forEach((status) => {
    let statusText = "";
    if (status.classList.contains("online")) statusText = "Online";
    else if (status.classList.contains("away")) statusText = "Away";
    else if (status.classList.contains("offline")) statusText = "Offline";

    status.setAttribute("aria-label", statusText);
    status.setAttribute("role", "status");
  });
});
