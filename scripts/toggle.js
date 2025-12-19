document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a:not(.dropbtn)"); // Exclude dropdown buttons
    const dropdowns = document.querySelectorAll(".dropdown");

    // Function to check if it's mobile view
    const isMobile = () => window.innerWidth <= 768;

    // Toggle mobile menu
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    // Close the menu when a **non-dropdown** link is clicked (for mobile)
    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            if (isMobile()) {
                navLinks.classList.remove("show"); // Close menu
            }
        });
    });

    // Handle dropdown toggling in mobile view (only for dropbtns)
    dropdowns.forEach((dropdown) => {
        const dropBtn = dropdown.querySelector(".dropbtn");
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        dropBtn.addEventListener("click", function (event) {
            if (isMobile()) {
                event.preventDefault();
                event.stopPropagation();

                dropdown.classList.toggle("active");

                // Toggle dropdown visibility
                if (dropdown.classList.contains("active")) {
                    dropdownContent.style.display = "block";
                } else {
                    dropdownContent.style.display = "none";
                }

                // Hide other dropdowns
                dropdowns.forEach((otherDropdown) => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove("active");
                        otherDropdown.querySelector(".dropdown-content").style.display = "none";
                    }
                });
            }
        });
    });

    // Close only dropdowns when clicking outside (keep main menu open)
    document.addEventListener("click", function (event) {
        if (isMobile()) {
            dropdowns.forEach((dropdown) => {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove("active");
                    dropdown.querySelector(".dropdown-content").style.display = "none";
                }
            });
        }
    });

    // Desktop behavior: Hover to show dropdowns
    dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        dropdown.addEventListener("mouseenter", function () {
            if (!isMobile()) {
                dropdownContent.style.display = "block";
            }
        });

        dropdown.addEventListener("mouseleave", function () {
            if (!isMobile()) {
                dropdownContent.style.display = "none";
            }
        });

        // 🛠️ Fix: Hide dropdown when a dropdown link is clicked in desktop view
        dropdown.querySelectorAll(".dropdown-content a").forEach((link) => {
            link.addEventListener("click", function () {
                if (!isMobile()) {
                    dropdownContent.style.display = "none"; // Hide dropdown
                    dropdown.classList.remove("active");
                }
            });
        });
    });

    // Ensure dropdown resets when switching from mobile to desktop
    window.addEventListener("resize", function () {
        if (!isMobile()) {
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active");
                dropdown.querySelector(".dropdown-content").style.display = "none";
            });
        }
    });
});



function toggleProfile(profileId, card) {
    // Get the profile within the clicked card
    var profile = card.querySelector(`#${profileId}`);

    // Check if the profile is already visible
    var isVisible = profile.style.display === "block";

    // Hide all profiles first
    document.querySelectorAll(".speaker-profile").forEach(profile => {
        profile.style.display = "none";
    });

    // Toggle only if it was not visible before
    if (!isVisible) {
        profile.style.display = "block";
    }
}


const coll = document.querySelectorAll(".collapsible");

    coll.forEach(button => {
        button.addEventListener("click", function() {
            coll.forEach(btn => {
                if (btn !== this) {
                    btn.nextElementSibling.style.display = "none";
                    btn.classList.remove("active");
                }
            });
            
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("mouseenter", function() {
            const submitButton = this.querySelector(".submit-button-track");
            if (submitButton) {
                submitButton.style.background = "linear-gradient(to right, #1E90FF, #00CED1)"; /* Change to gradient on hover */
            }
        });
        
        button.addEventListener("mouseleave", function() {
            const submitButton = this.querySelector(".submit-button-track");
            if (submitButton) {
                submitButton.style.background = "linear-gradient(90deg, #ff0000, #4b0082)"; /* Restore original solid color */
            }
        });
    });