/* =========================================
   DEWAYNE GRAMKOW PORTFOLIO
   SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".navItem");
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    /*
        IMPORTANT:
        Resume is included here.
    */

    const sectionNames = [
        "profile",
        "education",
        "skills",
        "projects",
        "certificates",
        "resume",
        "contact"
    ];


    /* =========================================
       SHOW SECTION
    ========================================= */

    function showSection(sectionId) {

        const target = document.getElementById(sectionId);

        if (!target) {
            console.warn("Section not found:", sectionId);
            return;
        }

        pages.forEach(page => {
            page.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        target.classList.add("active");

        const activeNav = document.querySelector(
            `.navItem[data-section="${sectionId}"]`
        );

        if (activeNav) {
            activeNav.classList.add("active");
        }

        /* Close mobile menu */

        sidebar.classList.remove("open");

        /* Scroll page to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =========================================
       SIDEBAR NAVIGATION
    ========================================= */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const section = item.dataset.section;

            showSection(section);

        });

    });


    /* =========================================
       BUTTON NAVIGATION
    ========================================= */

    const goButtons = document.querySelectorAll("[data-go]");

    goButtons.forEach(button => {

        button.addEventListener("click", () => {

            const section = button.dataset.go;

            showSection(section);

        });

    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

            const icon = menuBtn.querySelector("i");

            if (sidebar.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    /* =========================================
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", (event) => {

        if (
            window.innerWidth <= 700 &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            sidebar.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =========================================
       KEYBOARD NAVIGATION
       
       LEFT ARROW  = PREVIOUS
       RIGHT ARROW = NEXT
    ========================================= */

    document.addEventListener("keydown", (event) => {

        /* Don't change pages while typing */

        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }

        const activePage = document.querySelector(".page.active");

        if (!activePage) return;

        const currentIndex =
            sectionNames.indexOf(activePage.id);

        if (currentIndex === -1) return;


        /* NEXT */

        if (event.key === "ArrowRight") {

            const nextIndex =
                (currentIndex + 1) % sectionNames.length;

            showSection(sectionNames[nextIndex]);

        }


        /* PREVIOUS */

        if (event.key === "ArrowLeft") {

            const previousIndex =
                (currentIndex - 1 + sectionNames.length)
                % sectionNames.length;

            showSection(sectionNames[previousIndex]);

        }

    });


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================= */

    const images = document.querySelectorAll("img");

    images.forEach(img => {

        img.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                img.getAttribute("src")
            );

            img.style.opacity = "0.35";

        });

    });


    /* =========================================
       RESUME PDF ERROR CHECK
    ========================================= */

    const resumeFrame = document.querySelector(".resumePreview iframe");

    if (resumeFrame) {

        resumeFrame.addEventListener("load", () => {

            console.log("Resume PDF loaded.");

        });

    }


    /* =========================================
       START ON PROFILE
    ========================================= */

    showSection("profile");

});