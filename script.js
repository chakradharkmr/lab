document.addEventListener('DOMContentLoaded', () => {
    const pageGrid = document.querySelector('.page-grid');

    // Manual Link Data - This remains the primary way to define your pages
    const pages = [
        {
            title: 'Welcome Page',
            description: 'A beautifully designed introductory page with interactive elements.',
            link: 'welcome.html',
            imagePreview: 'previews/welcome-screenshot.jpg', // <--- UPDATED PATH
            category: 'Introduction'
        },
        {
            title: 'Product Showcase',
            description: 'Discover our latest products with stunning visuals and detailed descriptions.',
            link: 'products.html',
            imagePreview: 'previews/products-screenshot.jpg', // <--- UPDATED PATH
            category: 'E-commerce'
        },
        {
            title: 'Contact Us',
            description: 'Get in touch with our team through our contact form and location details.',
            link: 'contact.html',
            imagePreview: 'previews/contact-screenshot.jpg', // <--- UPDATED PATH
            category: 'Information'
        },
        {
            title: 'Blog Post Example',
            description: 'An example blog post layout with rich text and media content.',
            link: 'blog-post.html',
            imagePreview: 'previews/blog-post-screenshot.jpg', // <--- UPDATED PATH
            category: 'Content'
        },
        {
            title: 'About Our Team',
            description: 'Learn more about the talented individuals behind our success.',
            link: 'team.html',
            imagePreview: 'previews/team-screenshot.jpg', // <--- UPDATED PATH
            category: 'Information'
        },
        {
            title: 'Interactive Dashboard',
            description: 'A dynamic dashboard illustrating data visualization and user interaction.',
            link: 'dashboard.html',
            imagePreview: 'previews/dashboard-screenshot.jpg', // <--- UPDATED PATH
            category: 'Application'
        }
        // Add more pages here following the same structure
    ];

    // Function to create a page card HTML element (no changes needed)
    function createPageCard(page) {
        const card = document.createElement('a');
        card.href = page.link;
        card.classList.add('page-card');
        card.target = '_blank'; // Open links in a new tab

        card.innerHTML = `
            <img src="${page.imagePreview}" alt="Preview of ${page.title}" class="page-card-image">
            <div class="page-card-content">
                <h2 class="page-card-title">${page.title}</h2>
                <p class="page-card-description">${page.description}</p>
                <span class="page-card-link">View Page</span>
            </div>
        `;
        return card;
    }

    // Render pages from the manual data (no changes needed)
    pages.forEach((page, index) => {
        const card = createPageCard(page);
        pageGrid.appendChild(card);
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.8s ease-out forwards`;
            card.style.opacity = '1';
        }, index * 100);
    });

    // Add scroll-based animations (no changes needed)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.page-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        cardObserver.observe(card);
    });
});
