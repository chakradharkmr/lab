document.addEventListener('DOMContentLoaded', () => {
    const linkGrid = document.querySelector('.link-grid'); // Changed selector

    // ** Only modify this array with your URLs! **
    // The script will infer a title or use a generic one.
    // For more control, you can provide objects with custom titles.
    const urls = [
        { url: 'summer.html', title: 'Summer Fun in Almere' },
        { url: 'https://kaveri.net.in/summer2.html', title: 'Almere Summer Guide' }, // Another external URL
        { url: 'https://kaveri.net.in/info2.html', title: 'Almere Activity Guide' }, // External URL example
        { url: 'info.html', title: 'Find Your Spark in Almere' },
        { url: 'storage.html', title: 'Cloud Storage Solutions' },
        { url: 'phone.html',  title: 'Phone Swap' },
        { url: 'NL-CH-IT.html',  title: 'Swiss & Milan Trip' },
        //{ url: 'about-us.html',
        //{ url: 'https://myspecialproject.com/demo', title: 'My Awesome Project Demo' }, // Custom title
        //'simple-faq.html'
    ];

    // Helper function to capitalize the first letter of each word
    function capitalizeWords(str) {
        return str.replace(/-/g, ' ')
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
    }

    // Function to infer title from URL
    function inferTitleFromUrl(url) {
        try {
            const urlObj = new URL(url, window.location.origin); // Use window.location.origin for relative URLs
            let path = urlObj.pathname.split('/').pop(); // Get last part of the path
            if (path.includes('.')) {
                path = path.split('.').slice(0, -1).join('.'); // Remove file extension
            }
            if (path === '' || path === '/') {
                return urlObj.hostname || 'Homepage'; // Use hostname or 'Homepage' for root
            }
            return capitalizeWords(path) || url; // Fallback to raw URL if all else fails
        } catch (e) {
            // Handle invalid URLs gracefully
            console.warn(`Could not parse URL: ${url}`, e);
            return capitalizeWords(url.replace(/^(https?:\/\/)?(www\.)?/i, '').replace(/\/$/, '')) || 'External Link';
        }
    }

    // Function to process a single URL entry
    function processLinkEntry(entry) {
        let url, customTitle;

        if (typeof entry === 'string') {
            url = entry;
        } else {
            url = entry.url;
            customTitle = entry.title;
        }

        const inferredTitle = inferTitleFromUrl(url);

        return {
            url: url,
            title: customTitle || inferredTitle
        };
    }

    // Process all link entries
    const linksData = urls.map(processLinkEntry);

    // Function to create a link card HTML element
    function createLinkCard(linkItem) {
        const card = document.createElement('a');
        card.href = linkItem.url;
        card.classList.add('link-card');
        card.target = '_blank'; // Open links in a new tab

        card.innerHTML = `
            <h2 class="link-title">${linkItem.title}</h2>
        `;
        return card;
    }

    // Render links
    linksData.forEach((linkItem, index) => {
        const card = createLinkCard(linkItem);
        linkGrid.appendChild(card);
        // Apply animation with a delay for staggered effect
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

    // Re-select cards after they are added to the DOM
    document.querySelectorAll('.link-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        cardObserver.observe(card);
    });
});
