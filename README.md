# Mercuri World Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, responsive multi-page website for **Mercuri World AFHS**, a neuroscience and innovation club, built with **HTML**, **TailwindCSS**, and minimal JavaScript. The website is designed to showcase the club's mission, team, blog, resources, and contact information.

---

## Project Structure

``` shell
mercuri-world-website/
├── assets/                # Assets folder
│   ├── css                # CSS folder
│   │   └── styles.css     # Centralized CSS file
│   ├── js/                # JavaScript folder 
│   │   ├── particles.js   # Particle JavaScript file
│   │   └── script.js      # Main JavaScript file   
│   └── images/            # image folder
│       ├── ananya.png     # Ananya's photo   
│       ├── anika.png      # Anika's photo
│       ├── ardra.png      # Ardra's photo
│       ├── hrishaan.png   # Hrishaan's photo
│       ├── misha.png      # Misha's photo
│       ├── yoshi.png      # Yoshi's photo
│       ├── harsha.png     # Harsha's photo
│       ├── anya.png       # Anya's photo
│       ├── aboli.png      # Aboli's photo
│       └── logo.png       # club logo
├── components/            # components folder
│   ├── footer.html        # Footer
│   └── navbar.html        # Navbar
├── template/              # Template folder
│   └── template.html      # Basic template for pages
├── server/                # Server related things
│   ├── node_modules/
│   │   └── ...
│   ├── .env
│   ├── .env.example
│   ├── package-lock.json
│   ├── package.json       
│   ├── server.js          # JavaScript program for the server
│   └── SETUP_GUIDE.md     # Setup guide for AI assistant 
├── .gitignore             # .gitignore file
├── about.html             # About page
├── blog.html              # Blog page
├── contact.html           # Contact page
├── index.html             # Home page
├── projects.html          # Projects page
├── resources.html         # Resources page
├── team.html              # Team page
└── README.md              # This document
```

---

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile using TailwindCSS.
- **Dark Theme**: Consistent dark background with accent colors (`#4e65cb` & `#b4c4f8`)
- **Sticky Footer**: Footer always stays at the bottom of the page. 
- **Dynamic Navbar**:
    - Highlights the current page. 
    - Mobile hamburger menu toggles links.
- **Page Sections**:
    - **Home**: Hero, updates, polls, member counter.
    - **About**: Constitution, mission, story, volunteer section.
    - **Team**: Team members placeholders (images can be added later).
    - **Projects**: Past and upcoming projects with modal previews.
    - **Blog**: Categorized monthly blog posts with year. 
    - **Resources**: Grid of PDFs, guides, and other materials.
    - **Contact**: Working contact form and social links with hover effects.
- **Dynamic Background**:
    - Dots are scattered around the background of the website
    - Dots form faint lines when near another do

---

## JavaScript Features

- Smooth scroll for in-page anchors. <!-- 67 -->
- Mobile menu toggle.
- Active link highlighting in navbar.
- Navbar sticky blur effect on scroll.
- Modal animation for projects.
- Placeholder functions for live counts and dynamic data.

---

## Installation / Usage

1. Clone the repository:

```bash
git clone https://github.com/Hrishaan1/mercuri-world-website.git
```

2. Open any HTML file in a browser:
```bash
cd mercuri-world-website
open index.html
```

---

## Styling
- **TailwindCSS** is used via CDN.
- Custom CSS available in ```assets/css/styles.css``` for additional styling.
- consistend dark theme and accent colors. 

---

## Notes / Future Improvements
- Replace ```<span>``` placeholders with actual images/videos/resources. 
- Consider accessibility improvements (ARIA roles, keyboard navigation).

---

## Deployment
- Currently deployed under ```https://mercuri-world-website.vercel.app```
    - Deployed with Vercel - a free web hosting platform that allows you to easily host your website straight from your GitHub repo
- Will be deployed with actual domain in the future

## Author

**Mercuri.World - AFHS**

Website designed and developed using HTML, TailwindCSS, and JavaScript

