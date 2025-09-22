# 📦 Final Assignment: Build, Organize, and Deploy a Multipage Website

You're now ready to bring everything together—HTML, CSS, JavaScript, planning, structure, and deployment. This final project challenges you to **conceptualize, build, and deploy a multi-page website** that is responsive, interactive, and ready for the real world.

This assignment will guide you from planning your site all the way to deploying it online. Let’s make your project *production-worthy*! 🚀

---

## 🌐🎯 Part 1: Planning and Organizing a Multipage Website

Before you write any code, take time to plan:

* Define your website's purpose (portfolio, product showcase, blog, etc.)
* Outline 3–5 pages (e.g., Home, About, Services, Contact, Gallery)
* Sketch or describe the layout of each page
* Map out internal navigation (how pages link to one another)

**Goal:** Show intentional structure and user journey across the site.

---

## 🌍💻 Part 2: Build the Website Using HTML5, CSS, and JavaScript

Using your plan, begin building:

* Use HTML5 for semantic structure
* Apply CSS for responsive layout, styling, and animations
* Use JavaScript to add interactivity (menus, forms, toggles, dynamic content)

Each page should:

* Be mobile-responsive
* Share a consistent layout/header/footer
* Include at least one interactive element (e.g., form validation, toggle menu, animation on scroll)

**Goal:** Integrate everything you’ve learned in a cohesive, functioning project.

---

## 🛠️🚀 Part 3: Best Practices for Code Organization

Before deployment, refactor your project to follow production-friendly practices:

* Organize files in folders (`/css`, `/js`, `/images`, etc.)
* Write clean, modular, and commented code
* Use meaningful file names and relative paths
* Validate your HTML/CSS and test on different screen sizes

**Goal:** Prepare your codebase to be readable, maintainable, and scalable.

---

## 🌐🚀 Part 4: Introduction to Hosting and Deployment

Once your project is complete, choose a method to **host your site online**.

You can use:

* **GitHub Pages** (great for portfolios and static sites)
* **Netlify** (powerful CI/CD features and easy form support)
* **Vercel** (lightning-fast deployment for frontend projects)

Deploy your project and confirm that:

* All links and scripts work
* It loads properly on mobile and desktop
* It has a clear, shareable URL

**Goal:** Publish your work online and make it accessible to the world.

---

## Deliverables

1. A GitHub repository containing:

   * Your complete project code, properly organized
   * A `README.md` file explaining your project purpose, structure, and live URL
2. A live deployed website (hosted via GitHub Pages, Netlify, or Vercel)

---

## Outcome

* Clarity and thoroughness of planning documentation
* Proper use of HTML5, CSS, and JavaScript across multiple pages
* Responsive and accessible design
* Clean, well-organized, and commented code
* Successful live deployment with a working link
* Evidence of following best practices

# 🎨 Mary's Portfolio Website

A modern, responsive multipage portfolio website showcasing web development skills and projects. Built with HTML5, CSS3, and JavaScript.

## 🌐 Live Demo

- **GitHub Pages**: [Your Live URL Here](https://maryfevlom-collab.github.io/portfolio-website)
- **Repository**: [GitHub Repo](https://github.com/maryfevlom-collab/portfolio-website)

## 📋 Project Overview

This is a comprehensive portfolio website created as part of Week 8 assignment, demonstrating skills in:

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling, animations, and responsive design
- **JavaScript** - Interactive functionality and form validation
- **Web Deployment** - GitHub Pages hosting

## ✨ Features

### 🏠 Home Page
- Hero section with animated introduction
- Interactive image slider showcasing featured projects
- Skills showcase with hover effects
- Responsive navigation with mobile menu
- Smooth scrolling and scroll animations

### 👤 About Page
- Personal introduction and journey
- Interactive timeline of experiences
- Achievement counters with animation
- Responsive grid layouts

### 🎯 Portfolio Page
- Project showcase with filtering functionality
- Project cards with hover effects and overlays
- Modal windows with detailed project information
- Technology tags and categorization

### 📧 Contact Page
- Comprehensive contact form with validation
- Real-time form validation and error handling
- Interactive FAQ section with accordion functionality
- Contact information with social media links

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: 
  - Flexbox and CSS Grid for layouts
  - Custom properties (CSS variables)
  - Animations and transitions
  - Media queries for responsive design
  - Modern CSS features (backdrop-filter, etc.)
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event handling
  - Form validation
  - Image slider functionality
  - Intersection Observer API
  - Local storage (if needed)

### Tools & Libraries
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (if used)
- **Git**: Version control
- **GitHub Pages**: Deployment and hosting

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: 320px - 767px

### Key Responsive Features
- Mobile-first approach
- Flexible grid systems
- Scalable typography
- Touch-friendly navigation
- Optimized images and media

## 🎭 Interactive Features

### Image Slider
- Auto-playing carousel with manual controls
- Smooth transitions and animations
- Touch/swipe support (future enhancement)
- Pause on hover functionality

### Form Validation
- Real-time field validation
- Email format verification
- Phone number validation
- Character counting for message field
- Success/error state management

### Portfolio Filter
- Dynamic project filtering by category
- Smooth animations when filtering
- Modal windows for detailed project views

### Navigation
- Fixed header with scroll effects
- Mobile hamburger menu
- Smooth scroll to sections
- Active link highlighting

## 🚀 Performance Optimizations

- **CSS**: Minified and optimized
- **JavaScript**: Efficient event handling and debouncing
- **Images**: Optimized sizes and formats
- **Animations**: Hardware-accelerated transforms
- **Loading**: Intersection Observer for scroll animations
- **Accessibility**: WCAG 2.1 compliant features

## 📁 File Structure

```
portfolio-website/
├── index.html              # Home page
├── about.html              # About page  
├── contact.html            # Contact page
├── portfolio.html          # Portfolio page
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript file
├── README.md              # Project documentation
└── assets/                # Images and media (if any)
    ├── images/
    └── icons/
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/maryfevlom-collab/portfolio-website.git
   ```

2. **Navigate to project directory**
   ```bash
   cd portfolio-website
   ```

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use Live Server in VS Code for development

4. **For development**
   ```bash
   # Install Live Server (optional)
   npm install -g live-server
   
   # Start development server
   live-server
   ```

## 🌐 Deployment

### GitHub Pages Deployment

1. **Push to GitHub repository**
   ```bash
   git add .
   git commit -m "Deploy portfolio website"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Site will be available at: `https://maryfevlom-collab.github.io/portfolio-website`

### Alternative Deployment Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration and automatic deployments
- **GitHub Codespaces**: Cloud development environment

## 📊 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ Internet Explorer (limited support)

## 🎯 Future Enhancements

- [ ] Blog section with CMS integration
- [ ] Dark/light theme toggle
- [ ] Multilingual support
- [ ] Progressive Web App (PWA) features
- [ ] Advanced animations with GSAP
- [ ] Integration with headless CMS
- [ ] E-commerce functionality
- [ ] SEO optimizations

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags optimization
- Open Graph tags for social sharing
- Schema.org structured data
- Optimized images with alt text
- Clean URL structure
- Sitemap.xml (future addition)

## ♿ Accessibility Features

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy
- Alt text for images
- Focus indicators
- Color contrast compliance

## 🧪 Testing

### Manual Testing Checklist
- ✅ All pages load correctly
- ✅ Navigation works on all devices
- ✅ Forms validate properly
- ✅ Images and media display correctly
- ✅ Animations are smooth
- ✅ Cross-browser compatibility

### Performance Testing
- Google PageSpeed Insights
- GTmetrix analysis
- WebPageTest evaluation

## 📞 Contact & Support

- **Email**: maryfevlom@gmail.com
- **GitHub**: [@maryfevlom-collab](https://github.com/maryfevlom-collab)
- **LinkedIn**: https://www.linkedin.com/in/mawunyo-mary-fevlo?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **PLP Academy** - For the comprehensive web development curriculum
- **Font Awesome** - For the amazing icon library
- **Unsplash** - For high-quality stock photos (if used)
- **CSS-Tricks** - For helpful tutorials and guides
- **MDN Web Docs** - For excellent documentation

## 📈 Project Timeline

- **Week 1**: Planning and wireframing
- **Week 2**: HTML structure and semantic markup
- **Week 3**: CSS styling and responsive design
- **Week 4**: JavaScript functionality and interactivity
- **Week 5**: Testing, optimization, and deployment

---

## Student Submission - Mary Fevlom

### 🌐 Live Website
- **Live Demo**: https://maryfevlom-collab.github.io/portfolio-website
- **Repository**: https://github.com/maryfevlom-collab/portfolio-website
- **Completion Date**: September, 2025

### ✅ Assignment Requirements Completed
- [x] Multipage website (Home, About, Contact, Portfolio)
- [x] Responsive design for all devices
- [x] HTML5 semantic structure
- [x] CSS3 styling and animations
- [x] JavaScript interactivity (form validation, slider)
- [x] Successfully deployed on GitHub Pages

### 🛠 Technologies Implemented
- HTML5, CSS3, JavaScript
- Mobile-first responsive design
- Form validation and error handling
- Image slider with navigation
- Interactive animations and transitions

 ---

**Built with ❤️ by Mary Fevlom** | **PLP Academy Week 8 Assignment** | **2025**
