/* ========================================
   CelebAI — Main Application Logic
   ======================================== */

// ─── State ───────────────────────────────
let appState = {
    selectedEventType: null,
    eventDetails: {},
    budgetCategories: [],
    totalBudget: 0,
    timelineMilestones: [],
    vendors: [],
    vendorFilter: 'all',
};

// ─── Color Palettes ─────────────────────
const CATEGORY_COLORS = [
    'hsl(270, 80%, 60%)',  // Purple
    'hsl(330, 85%, 60%)',  // Pink
    'hsl(42, 95%, 55%)',   // Gold
    'hsl(175, 70%, 50%)',  // Teal
    'hsl(15, 85%, 60%)',   // Coral
    'hsl(200, 80%, 55%)',  // Blue
    'hsl(150, 70%, 45%)',  // Green
    'hsl(0, 75%, 55%)',    // Red
    'hsl(50, 80%, 50%)',   // Yellow
    'hsl(290, 70%, 55%)',  // Violet
];

// ─── AI Response Database ────────────────
const AI_RESPONSES = {
    'wedding themes': {
        response: `Here are some **stunning wedding theme ideas** for you:

✨ **Enchanted Garden** — Lush greenery, fairy lights, floral arches, and natural wood accents. Perfect for outdoor venues.

🌊 **Coastal Elegance** — Soft blues, sandy neutrals, driftwood décor, and ocean-inspired centerpieces.

🏰 **Royal Vintage** — Rich velvet fabrics, gold candelabras, antique mirrors, and classic calligraphy invitations.

🌸 **Cherry Blossom Romance** — Blush pink palette, delicate sakura branches, origami accents, and lantern lighting.

🌙 **Celestial Night** — Deep navy and gold, star maps, moon-shaped arches, and twinkling string lights for an under-the-stars vibe.

🍷 **Tuscan Vineyard** — Terracotta tones, olive branches, wine barrel décor, and rustic Italian-inspired cuisine.

💡 **Pro Tip:** Mix 2-3 themes subtly to create something uniquely yours!`
    },
    'birthday ideas': {
        response: `Here are some **creative birthday party ideas** 🎂:

🎪 **Carnival Extravaganza** — Set up game booths, a cotton candy machine, popcorn bar, and a mini ferris wheel backdrop for photos.

🎨 **Art Studio Party** — Canvas painting stations, splatter art walls, customizable tote bags, and an artist's palette cake.

🌮 **Fiesta Night** — Taco bar, piñatas, papel picado garlands, margarita station, and mariachi music.

🎬 **Movie Premiere Night** — Red carpet entrance, popcorn bar, director's chair seating, and a movie screening with custom tickets.

🏕️ **Glamping Under the Stars** — Luxe tent setups, campfire s'mores station, fairy light canopy, and acoustic live music.

🎮 **Retro Gaming Arcade** — Classic arcade games, neon lights, pixel art decorations, and a high-score leaderboard cake.

🍫 **Chocolate Factory Experience** — DIY chocolate making, truffle tasting, chocolate fountain, and Willy Wonka-inspired décor.

💡 **Budget Tip:** Focus on 2-3 "wow" elements and keep the rest simple — guests remember experiences over expensive decorations!`
    },
    'décor ideas': {
        response: `Here are **budget-friendly decoration ideas** that look premium 💐:

🕯️ **Candle Clusters** — Group candles of varying heights on mirror bases. Creates elegance for under ₹500 per table.

📸 **Photo Memory Wall** — Print photos of the guest of honor and create a timeline display with fairy lights. Cost: ₹800-1,500.

🎈 **Balloon Garland Arch** — Use matching color balloons in different sizes. A stunning 3m arch costs just ₹1,000-2,000.

🌿 **Greenery Runners** — Eucalyptus or fern table runners with scattered tea lights. Natural elegance at ₹300/meter.

✨ **String Light Canopy** — Create a warm fairy light ceiling effect. Warm white LEDs are affordable and reusable.

🏺 **Painted Jar Centerpieces** — Upcycle glass jars with metallic spray paint, fill with seasonal flowers or fairy lights.

🎀 **Fabric Draping** — Use lightweight fabric (tulle, organza) for ceiling drapes or chair sashes. Elegant and affordable.

🪞 **Mirror & Acrylic Signs** — DIY welcome signs and table numbers with acrylic sheets and metallic markers.

💡 **Pro Tip:** Stick to 3 colors max for a cohesive look. Metallics (gold/rose gold) elevate any color scheme!`
    },
    'entertainment': {
        response: `Here are **trending entertainment options** for events 🎵:

🎤 **Live Music Experiences:**
- Acoustic duo for intimate settings (₹15,000-30,000)
- DJ + LED dance floor for parties (₹20,000-50,000)
- Live band with customized playlist (₹40,000-1,00,000)

🎭 **Interactive Entertainment:**
- Photo booth with props & instant prints (₹10,000-25,000)
- 360° video booth — viral social media content! (₹25,000-50,000)
- Caricature artist for guests (₹8,000-15,000)
- Magic/mentalism show (₹15,000-40,000)

🎪 **Experience Stations:**
- Mixology/cocktail making workshop (₹12,000-25,000)
- Henna/mehndi artists (₹5,000-15,000)
- Silent disco with multiple channels (₹20,000-40,000)
- Food art/chocolate fountain station (₹8,000-20,000)

🎮 **Fun & Games:**
- Trivia night about the guest of honor
- Dance-off competitions with prizes
- Karaoke setup with song requests
- Giant board games (Jenga, Connect 4)

💡 **Trending Now:** 360° video booths are the #1 requested entertainment for 2026 events!`
    },
    'menu plan': {
        response: `Here's a **complete menu plan for 100 guests** 🍽️:

**🥗 Starters (Serve 3-4 options):**
- Paneer tikka skewers with mint chutney
- Mini bruschetta with tomato basil
- Crispy vegetable spring rolls
- Stuffed mushroom caps with cheese

**🍲 Main Course (Serve 4-5 options):**
- Dal makhani with butter naan
- Paneer butter masala
- Chicken biryani (Lucknowi style)
- Pasta in white/red sauce (live counter)
- Mixed vegetable stir-fry

**🍚 Accompaniments:**
- Steamed rice & jeera rice
- Assorted bread basket
- Raita, pickles & papad
- Garden salad with dressings

**🍰 Desserts (Serve 3-4 options):**
- Gulab jamun
- Live ice cream counter
- Chocolate mousse cups
- Fruit tart assortment

**🥤 Beverages:**
- Fresh juice station (4 varieties)
- Mocktail bar (3-4 signatures)
- Tea & coffee station
- Infused water station

**📊 Estimated Budget for 100 guests:**
| Category | Cost Range |
|----------|-----------|
| Starters | ₹25,000 - ₹40,000 |
| Main Course | ₹60,000 - ₹90,000 |
| Desserts | ₹15,000 - ₹30,000 |
| Beverages | ₹10,000 - ₹20,000 |
| **Total** | **₹1,10,000 - ₹1,80,000** |

💡 **Tip:** A live counter (pasta/chaat/dosa) adds WOW factor at minimal extra cost!`
    },
    'community tips': {
        response: `Here's how to make your **community event more engaging** 🎯:

**🎯 Pre-Event Strategies:**
- Create a compelling event hashtag and social media buzz
- Partner with local influencers for promotion
- Send personalized invites with RSVP tracking
- Create teaser content (countdown posts, behind-the-scenes)

**🤝 Engagement Activities:**
- Interactive workshops (art, cooking, gardening)
- Panel discussions with Q&A sessions
- Networking games (bingo cards with attendee facts)
- Live polling and real-time feedback walls
- Community talent showcase

**📱 Tech Integration:**
- Event app with schedule and networking features
- QR code scavenger hunt around the venue
- Live social media wall displaying event posts
- Digital feedback stations

**🎁 Incentives & Rewards:**
- Raffle draws with local business prizes
- "Best Dressed" or theme-based competitions
- Volunteer recognition awards
- Gift bags with local artisan products

**🌱 Community Impact:**
- Charity donation booth
- Sustainability pledge wall
- Local artist marketplace
- Community mural collaboration

**📊 Post-Event:**
- Send thank-you emails with event highlights
- Share photo/video gallery
- Gather feedback surveys
- Announce next event dates

💡 **Key Insight:** Events with 3+ interactive elements see 60% higher attendee satisfaction!`
    },
};

// ─── Event Plan Templates ────────────────
const EVENT_TEMPLATES = {
    wedding: {
        budgetCategories: [
            { name: 'Venue & Décor', percent: 30 },
            { name: 'Catering & Beverages', percent: 25 },
            { name: 'Photography & Video', percent: 12 },
            { name: 'Clothing & Jewelry', percent: 10 },
            { name: 'Entertainment & DJ', percent: 8 },
            { name: 'Invitations & Stationery', percent: 3 },
            { name: 'Transportation', percent: 4 },
            { name: 'Gifts & Favors', percent: 3 },
            { name: 'Miscellaneous', percent: 5 },
        ],
        milestones: [
            { title: 'Set Budget & Guest List', desc: 'Finalize your budget and create the guest list', priority: 'high', monthsBefore: 10 },
            { title: 'Book Venue', desc: 'Visit and book your dream wedding venue', priority: 'high', monthsBefore: 9 },
            { title: 'Hire Photographer', desc: 'Research and book a wedding photographer', priority: 'high', monthsBefore: 8 },
            { title: 'Choose Caterer', desc: 'Taste test and finalize catering services', priority: 'high', monthsBefore: 7 },
            { title: 'Select Outfits', desc: 'Start shopping for wedding attire', priority: 'medium', monthsBefore: 6 },
            { title: 'Send Invitations', desc: 'Design and send out wedding invitations', priority: 'high', monthsBefore: 4 },
            { title: 'Book Entertainment', desc: 'Hire DJ, band, or other entertainment', priority: 'medium', monthsBefore: 3 },
            { title: 'Finalize Décor', desc: 'Confirm decorations and floral arrangements', priority: 'medium', monthsBefore: 2 },
            { title: 'Wedding Rehearsal', desc: 'Coordinate rehearsal and confirm all vendors', priority: 'high', monthsBefore: 0.25 },
            { title: 'The Big Day! 🎉', desc: 'Your wedding day - enjoy every moment!', priority: 'high', monthsBefore: 0 },
        ],
        vendors: [
            { name: 'Venue Coordinator', category: 'Venue', cost: 0 },
            { name: 'Head Caterer', category: 'Catering', cost: 0 },
            { name: 'Wedding Photographer', category: 'Photography', cost: 0 },
            { name: 'Videographer', category: 'Videography', cost: 0 },
            { name: 'Florist & Decorator', category: 'Décor', cost: 0 },
            { name: 'DJ / Music Band', category: 'Entertainment', cost: 0 },
            { name: 'Makeup Artist', category: 'Beauty', cost: 0 },
            { name: 'Mehendi Artist', category: 'Beauty', cost: 0 },
            { name: 'Invitation Designer', category: 'Stationery', cost: 0 },
            { name: 'Transport Provider', category: 'Transport', cost: 0 },
        ]
    },
    birthday: {
        budgetCategories: [
            { name: 'Venue Rental', percent: 25 },
            { name: 'Food & Drinks', percent: 30 },
            { name: 'Decorations', percent: 15 },
            { name: 'Entertainment', percent: 12 },
            { name: 'Cake & Desserts', percent: 8 },
            { name: 'Party Favors', percent: 5 },
            { name: 'Miscellaneous', percent: 5 },
        ],
        milestones: [
            { title: 'Set Theme & Budget', desc: 'Choose a party theme and set your budget', priority: 'high', monthsBefore: 3 },
            { title: 'Book Venue', desc: 'Reserve a venue or plan home setup', priority: 'high', monthsBefore: 2.5 },
            { title: 'Create Guest List', desc: 'Finalize who to invite', priority: 'medium', monthsBefore: 2 },
            { title: 'Order Cake', desc: 'Design and order the perfect birthday cake', priority: 'high', monthsBefore: 1.5 },
            { title: 'Send Invitations', desc: 'Send out digital or physical invitations', priority: 'high', monthsBefore: 1 },
            { title: 'Plan Activities', desc: 'Organize games, activities, and entertainment', priority: 'medium', monthsBefore: 0.75 },
            { title: 'Buy Decorations', desc: 'Purchase balloons, banners, and party supplies', priority: 'medium', monthsBefore: 0.5 },
            { title: 'Confirm Catering', desc: 'Finalize food and beverage orders', priority: 'high', monthsBefore: 0.25 },
            { title: 'Party Day! 🎂', desc: 'Happy Birthday! Time to celebrate!', priority: 'high', monthsBefore: 0 },
        ],
        vendors: [
            { name: 'Party Venue', category: 'Venue', cost: 0 },
            { name: 'Caterer / Food Service', category: 'Catering', cost: 0 },
            { name: 'Cake Baker', category: 'Bakery', cost: 0 },
            { name: 'Balloon & Décor Artist', category: 'Décor', cost: 0 },
            { name: 'Photographer', category: 'Photography', cost: 0 },
            { name: 'DJ / Entertainer', category: 'Entertainment', cost: 0 },
            { name: 'Party Supplies Store', category: 'Supplies', cost: 0 },
        ]
    },
    community: {
        budgetCategories: [
            { name: 'Venue & Permits', percent: 20 },
            { name: 'Food & Refreshments', percent: 20 },
            { name: 'Equipment & Logistics', percent: 18 },
            { name: 'Marketing & Outreach', percent: 12 },
            { name: 'Entertainment & Speakers', percent: 10 },
            { name: 'Decorations & Signage', percent: 8 },
            { name: 'Safety & Insurance', percent: 7 },
            { name: 'Miscellaneous', percent: 5 },
        ],
        milestones: [
            { title: 'Define Event Purpose', desc: 'Clarify goals, target audience, and expected outcomes', priority: 'high', monthsBefore: 6 },
            { title: 'Form Planning Committee', desc: 'Recruit volunteers and assign responsibilities', priority: 'high', monthsBefore: 5 },
            { title: 'Secure Venue & Permits', desc: 'Book location and obtain necessary permits', priority: 'high', monthsBefore: 4 },
            { title: 'Launch Marketing', desc: 'Start promoting through social media and local channels', priority: 'high', monthsBefore: 3 },
            { title: 'Confirm Speakers/Performers', desc: 'Finalize entertainment and guest speakers', priority: 'medium', monthsBefore: 2.5 },
            { title: 'Coordinate Logistics', desc: 'Plan equipment, seating, sound, and power', priority: 'medium', monthsBefore: 2 },
            { title: 'Volunteer Orientation', desc: 'Brief all volunteers on their roles and schedules', priority: 'medium', monthsBefore: 0.5 },
            { title: 'Final Walkthrough', desc: 'Do a complete run-through at the venue', priority: 'high', monthsBefore: 0.15 },
            { title: 'Event Day! 🎊', desc: 'Show time! Make an impact in your community!', priority: 'high', monthsBefore: 0 },
        ],
        vendors: [
            { name: 'Venue Manager', category: 'Venue', cost: 0 },
            { name: 'Catering Service', category: 'Catering', cost: 0 },
            { name: 'Sound & Lighting', category: 'AV Equipment', cost: 0 },
            { name: 'Tent & Furniture Rental', category: 'Rentals', cost: 0 },
            { name: 'Print & Banner Shop', category: 'Marketing', cost: 0 },
            { name: 'Security Provider', category: 'Safety', cost: 0 },
            { name: 'Photographer/Videographer', category: 'Media', cost: 0 },
        ]
    }
};

// ─── Initialization ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initCounterAnimation();
    drawBudgetChart();
});

// ─── Background Particles ───────────────
function initParticles() {
    const container = document.getElementById('bgParticles');
    const colors = ['var(--primary)', 'var(--accent-pink)', 'var(--accent-gold)', 'var(--accent-teal)'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        const size = Math.random() * 4 + 2;
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
}

// ─── Navbar ─────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Active link tracking
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ─── Counter Animation ──────────────────
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = performance.now();
    const format = target >= 1000;

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        if (format) {
            element.textContent = (current / 1000).toFixed(current >= 1000 ? 0 : 1) + 'K+';
        } else {
            element.textContent = current + (target < 100 ? '%' : '+');
        }

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// ─── Event Type Selection ───────────────
function selectEventType(type) {
    appState.selectedEventType = type;

    // Update card styles
    document.querySelectorAll('.event-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.type === type);
    });

    // Show setup form
    const form = document.getElementById('eventSetupForm');
    form.style.display = 'block';

    const labels = { wedding: 'Wedding', birthday: 'Birthday Party', community: 'Community Event' };
    document.getElementById('eventTypeLabel').textContent = labels[type];

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });

    showToast(`${labels[type]} selected! Fill in the details below.`, 'success');
}

// ─── Generate Event Plan ────────────────
function generateEventPlan() {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const guests = parseInt(document.getElementById('guestCount').value) || 0;
    const location = document.getElementById('eventLocation').value.trim();
    const budget = parseInt(document.getElementById('totalBudget').value) || 0;
    const style = document.getElementById('eventStyle').value;

    if (!name || !date || !budget) {
        showToast('Please fill in at least the event name, date, and budget.', 'warning');
        return;
    }

    // Show loading
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');

    // Simulate AI processing
    setTimeout(() => {
        appState.eventDetails = { name, date, guests, location, budget, style };
        appState.totalBudget = budget;

        const template = EVENT_TEMPLATES[appState.selectedEventType];

        // Generate budget categories
        generateBudgetCategories(template, budget);

        // Generate timeline
        generateTimeline(template, date);

        // Generate vendors
        generateVendors(template, budget, guests);

        overlay.classList.remove('active');
        showToast('🎉 Your AI-generated event plan is ready!', 'success');

        // Scroll to budget section
        document.getElementById('budget').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// ─── Budget Management ──────────────────
function generateBudgetCategories(template, budget) {
    appState.budgetCategories = template.budgetCategories.map((cat, i) => ({
        name: cat.name,
        allocated: Math.round(budget * cat.percent / 100),
        spent: 0,
        percent: cat.percent,
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }));

    renderBudgetCategories();
    drawBudgetChart();
    document.getElementById('addCategorySection').style.display = 'flex';
    updateBudgetSummary();
}

function renderBudgetCategories() {
    const container = document.getElementById('budgetCategories');
    const totalBudget = appState.totalBudget;

    container.innerHTML = appState.budgetCategories.map((cat, i) => `
        <div class="budget-category-item">
            <div class="category-color" style="background: ${cat.color}"></div>
            <div class="category-info">
                <div class="category-name">${cat.name}</div>
                <div class="category-bar">
                    <div class="category-bar-fill" style="width: ${cat.percent}%; background: ${cat.color};"></div>
                </div>
            </div>
            <div style="text-align: right;">
                <div class="category-amount">₹${formatNumber(cat.allocated)}</div>
                <div class="category-percent">${cat.percent}%</div>
            </div>
        </div>
    `).join('');
}

function addBudgetCategory() {
    const name = document.getElementById('newCategoryName').value.trim();
    const amount = parseInt(document.getElementById('newCategoryAmount').value) || 0;

    if (!name || !amount) {
        showToast('Please enter a category name and amount.', 'warning');
        return;
    }

    const color = CATEGORY_COLORS[appState.budgetCategories.length % CATEGORY_COLORS.length];
    const percent = Math.round((amount / appState.totalBudget) * 100);

    appState.budgetCategories.push({ name, allocated: amount, spent: 0, percent, color });

    renderBudgetCategories();
    drawBudgetChart();
    updateBudgetSummary();

    document.getElementById('newCategoryName').value = '';
    document.getElementById('newCategoryAmount').value = '';

    showToast(`"${name}" category added!`, 'success');
}

function updateBudgetSummary() {
    const total = appState.totalBudget;
    const allocated = appState.budgetCategories.reduce((s, c) => s + c.allocated, 0);
    const spent = appState.budgetCategories.reduce((s, c) => s + c.spent, 0);

    document.getElementById('budgetTotalDisplay').textContent = `₹${formatNumber(total)}`;
    document.getElementById('budgetAllocated').textContent = `₹${formatNumber(allocated)}`;
    document.getElementById('budgetSpent').textContent = `₹${formatNumber(spent)}`;
    document.getElementById('budgetRemaining').textContent = `₹${formatNumber(total - spent)}`;
}

// ─── Budget Chart (Canvas) ──────────────
function drawBudgetChart() {
    const canvas = document.getElementById('budgetChart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const size = Math.min(rect.width || 220, rect.height || 220);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 15;
    const lineWidth = 18;

    ctx.clearRect(0, 0, size, size);

    if (appState.budgetCategories.length === 0) {
        // Draw empty ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsla(235, 25%, 20%, 0.6)';
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        return;
    }

    let startAngle = -Math.PI / 2;
    const gap = 0.03;
    const total = appState.budgetCategories.reduce((s, c) => s + c.allocated, 0);

    appState.budgetCategories.forEach(cat => {
        const sweep = (cat.allocated / total) * (Math.PI * 2 - gap * appState.budgetCategories.length);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sweep);
        ctx.strokeStyle = cat.color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        startAngle += sweep + gap;
    });
}

// ─── Timeline Management ────────────────
function generateTimeline(template, eventDate) {
    const eventDateObj = new Date(eventDate);
    const now = new Date();

    appState.timelineMilestones = template.milestones.map((m, i) => {
        const milestoneDate = new Date(eventDateObj);
        milestoneDate.setMonth(milestoneDate.getMonth() - m.monthsBefore);

        return {
            id: Date.now() + i,
            title: m.title,
            desc: m.desc,
            date: milestoneDate.toISOString().split('T')[0],
            priority: m.priority,
            completed: milestoneDate < now,
        };
    });

    // Sort by date
    appState.timelineMilestones.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderTimeline();
    document.getElementById('addMilestoneSection').style.display = 'block';
}

function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    const timelineLine = container.querySelector('.timeline-line');

    // Clear existing items (keep the line)
    container.querySelectorAll('.timeline-item, .timeline-empty').forEach(el => el.remove());

    if (appState.timelineMilestones.length === 0) {
        container.innerHTML = `
            <div class="timeline-line"></div>
            <div class="empty-state timeline-empty">
                <i class="fas fa-hourglass-half"></i>
                <p>Generate an event plan to see your personalized timeline</p>
            </div>`;
        return;
    }

    appState.timelineMilestones.forEach((m, i) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.style.animationDelay = `${i * 0.1}s`;

        const formattedDate = new Date(m.date).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
        });

        item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${formattedDate}</div>
                <div class="timeline-title">${m.title}</div>
                <div class="timeline-desc">${m.desc}</div>
                <span class="timeline-priority priority-${m.priority}">${m.priority}</span>
                <div class="timeline-actions">
                    <button class="timeline-action-btn complete-btn" onclick="toggleMilestoneComplete(${m.id})">
                        <i class="fas fa-${m.completed ? 'undo' : 'check'}"></i> ${m.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="timeline-action-btn delete-btn" onclick="deleteMilestone(${m.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div class="timeline-dot ${m.completed ? 'completed' : ''}"></div>
        `;

        container.appendChild(item);
    });
}

function addMilestone() {
    const title = document.getElementById('milestoneTitle').value.trim();
    const date = document.getElementById('milestoneDate').value;
    const priority = document.getElementById('milestonePriority').value;

    if (!title || !date) {
        showToast('Please enter a title and date.', 'warning');
        return;
    }

    appState.timelineMilestones.push({
        id: Date.now(),
        title,
        desc: 'Custom milestone',
        date,
        priority,
        completed: false,
    });

    appState.timelineMilestones.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderTimeline();

    document.getElementById('milestoneTitle').value = '';
    document.getElementById('milestoneDate').value = '';

    showToast('Milestone added!', 'success');
}

function toggleMilestoneComplete(id) {
    const m = appState.timelineMilestones.find(m => m.id === id);
    if (m) {
        m.completed = !m.completed;
        renderTimeline();
        showToast(m.completed ? '✅ Milestone completed!' : 'Milestone marked as incomplete.', 'success');
    }
}

function deleteMilestone(id) {
    appState.timelineMilestones = appState.timelineMilestones.filter(m => m.id !== id);
    renderTimeline();
    showToast('Milestone removed.', 'warning');
}

// ─── Vendor Management ──────────────────
function generateVendors(template, budget, guests) {
    appState.vendors = template.vendors.map((v, i) => ({
        id: Date.now() + i,
        name: v.name,
        category: v.category,
        cost: v.cost || Math.round((budget * 0.08) + (Math.random() * budget * 0.05)),
        phone: '',
        status: 'pending',
        notes: '',
    }));

    renderVendors();
    document.getElementById('vendorControls').style.display = 'flex';
}

function renderVendors() {
    const container = document.getElementById('vendorGrid');
    let vendors = appState.vendors;

    if (appState.vendorFilter !== 'all') {
        vendors = vendors.filter(v => v.status === appState.vendorFilter);
    }

    if (vendors.length === 0 && appState.vendors.length > 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-filter"></i>
                <p>No vendors match the current filter.</p>
            </div>`;
        return;
    }

    if (vendors.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-handshake"></i>
                <p>Generate an event plan to get AI-recommended vendors for your event</p>
            </div>`;
        return;
    }

    container.innerHTML = vendors.map(v => {
        const statusLabels = { pending: 'Pending', contacted: 'Contacted', booked: 'Booked', paid: 'Paid' };
        const nextStatus = { pending: 'contacted', contacted: 'booked', booked: 'paid', paid: 'pending' };
        const nextLabel = { pending: 'Mark Contacted', contacted: 'Mark Booked', booked: 'Mark Paid', paid: 'Reset Status' };

        return `
            <div class="vendor-card">
                <div class="vendor-header">
                    <div>
                        <div class="vendor-name">${v.name}</div>
                        <div class="vendor-category-tag">${v.category}</div>
                    </div>
                    <span class="vendor-status status-${v.status}">${statusLabels[v.status]}</span>
                </div>
                <div class="vendor-details">
                    <div class="vendor-detail">
                        <i class="fas fa-indian-rupee-sign"></i>
                        <span>₹${formatNumber(v.cost)}</span>
                    </div>
                    ${v.phone ? `
                    <div class="vendor-detail">
                        <i class="fas fa-phone"></i>
                        <span>${v.phone}</span>
                    </div>` : ''}
                </div>
                <div class="vendor-actions">
                    <button class="vendor-action-btn status-change" onclick="changeVendorStatus(${v.id}, '${nextStatus[v.status]}')">
                        <i class="fas fa-arrow-right"></i> ${nextLabel[v.status]}
                    </button>
                    <button class="vendor-action-btn" onclick="removeVendor(${v.id})" style="color: var(--danger);">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filterVendors(status) {
    appState.vendorFilter = status;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === status || (status === 'all' && btn.textContent.trim() === 'All'));
    });

    renderVendors();
}

function toggleAddVendor() {
    const form = document.getElementById('addVendorForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function addVendor() {
    const name = document.getElementById('vendorName').value.trim();
    const category = document.getElementById('vendorCategory').value.trim();
    const cost = parseInt(document.getElementById('vendorCost').value) || 0;
    const phone = document.getElementById('vendorPhone').value.trim();

    if (!name || !category) {
        showToast('Please enter vendor name and category.', 'warning');
        return;
    }

    appState.vendors.push({
        id: Date.now(),
        name,
        category,
        cost,
        phone,
        status: 'pending',
        notes: '',
    });

    renderVendors();
    document.getElementById('addVendorForm').style.display = 'none';
    document.getElementById('vendorName').value = '';
    document.getElementById('vendorCategory').value = '';
    document.getElementById('vendorCost').value = '';
    document.getElementById('vendorPhone').value = '';

    showToast(`Vendor "${name}" added!`, 'success');
}

function changeVendorStatus(id, newStatus) {
    const vendor = appState.vendors.find(v => v.id === id);
    if (vendor) {
        vendor.status = newStatus;
        renderVendors();
        const labels = { pending: 'Pending', contacted: 'Contacted', booked: 'Booked', paid: 'Paid' };
        showToast(`${vendor.name} marked as ${labels[newStatus]}`, 'success');
    }
}

function removeVendor(id) {
    const vendor = appState.vendors.find(v => v.id === id);
    appState.vendors = appState.vendors.filter(v => v.id !== id);
    renderVendors();
    showToast(`${vendor?.name || 'Vendor'} removed.`, 'warning');
}

// ─── AI Chat ────────────────────────────
function sendQuickPrompt(text) {
    document.getElementById('aiChatInput').value = text;
    sendAIMessage();
}

function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const text = input.value.trim();
    if (!text) return;

    const messagesContainer = document.getElementById('aiChatMessages');

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message user';
    userMsg.innerHTML = `
        <div class="ai-msg-avatar"><i class="fas fa-user"></i></div>
        <div class="ai-msg-content"><p>${escapeHtml(text)}</p></div>
    `;
    messagesContainer.appendChild(userMsg);

    input.value = '';

    // Add typing indicator
    const typing = document.createElement('div');
    typing.className = 'ai-message bot';
    typing.id = 'typingIndicator';
    typing.innerHTML = `
        <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
        <div class="ai-msg-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Generate AI response
    setTimeout(() => {
        typing.remove();

        const response = getAIResponse(text);

        const botMsg = document.createElement('div');
        botMsg.className = 'ai-message bot';
        botMsg.innerHTML = `
            <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="ai-msg-content">${formatAIResponse(response)}</div>
        `;
        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500 + Math.random() * 1000);
}

function getAIResponse(query) {
    const q = query.toLowerCase();

    // Match against known topics
    if (q.includes('wedding') && (q.includes('theme') || q.includes('idea'))) {
        return AI_RESPONSES['wedding themes'].response;
    }
    if (q.includes('birthday') && (q.includes('idea') || q.includes('party'))) {
        return AI_RESPONSES['birthday ideas'].response;
    }
    if (q.includes('décor') || q.includes('decor') || q.includes('decoration')) {
        return AI_RESPONSES['décor ideas'].response;
    }
    if (q.includes('entertainment') || q.includes('music') || q.includes('dj')) {
        return AI_RESPONSES['entertainment'].response;
    }
    if (q.includes('menu') || q.includes('food') || q.includes('catering') || q.includes('guest')) {
        return AI_RESPONSES['menu plan'].response;
    }
    if (q.includes('community') || q.includes('engaging') || q.includes('volunteer')) {
        return AI_RESPONSES['community tips'].response;
    }

    // Budget-related queries
    if (q.includes('budget') || q.includes('cost') || q.includes('save') || q.includes('cheap') || q.includes('affordable')) {
        return `Here are some **smart budget tips** for your event 💰:

1. **Prioritize ruthlessly** — Spend 60% of your budget on the top 3 things guests will remember most (food, entertainment, and ambiance).

2. **Off-peak savings** — Book venues on weekdays or during off-season months. You can save 30-50% on venue costs!

3. **DIY what you can** — Invitation designs (Canva), centerpieces (Pinterest tutorials), and photo booths can be great DIY projects.

4. **Negotiate bundles** — Many vendors offer discounts when you book multiple services (photographer + videographer, venue + catering).

5. **Digital over physical** — E-invitations save money and are eco-friendly. Tools like Canva and Paperless Post are excellent.

6. **Borrow & rent** — Décor items, linens, and specialty items can often be rented at a fraction of the purchase price.

${appState.totalBudget ? `\n**Your current budget: ₹${formatNumber(appState.totalBudget)}** — I've already optimized your allocation across categories!` : ''}

💡 **Golden Rule:** Always keep a 10% emergency buffer in your budget for last-minute surprises!`;
    }

    // Invitation-related
    if (q.includes('invitation') || q.includes('invite') || q.includes('rsvp')) {
        return `Here are **invitation & RSVP ideas** 💌:

**Digital Invitations (Budget-Friendly):**
- **Canva** — Free templates with customization
- **Paperless Post** — Premium digital invites with tracking
- **WhatsApp/Email** — Quick & personal for informal events
- **Video Invitations** — Record a personal message or use apps like InVideo

**Physical Invitations (Premium Feel):**
- Letterpress on handmade paper
- Laser-cut designs with envelope liners
- Scroll invitations for traditional events
- Seed paper invites (eco-friendly, guests can plant them!)

**RSVP Management:**
- Google Forms (free, easy to track)
- AllSeated (guest management + seating charts)
- Zola or The Knot (wedding-specific)

💡 **Tip:** Send save-the-dates 6 months early, formal invites 6-8 weeks before the event!`;
    }

    // Photography
    if (q.includes('photo') || q.includes('camera') || q.includes('shoot')) {
        return `Here are **photography tips for your event** 📸:

**Finding the Right Photographer:**
- Review portfolios on Instagram and websites
- Check reviews on Google and WedMeGood
- Book a pre-event shoot to test chemistry
- Budget: ₹25,000-1,50,000 depending on coverage

**Must-Have Shots:**
- Venue wide shots (before guests arrive)
- Candid guest reactions
- Detail shots (décor, food, favors)
- Group photos (family, friends, whole party)
- Golden hour portraits

**Trending Photo Ideas:**
- Drone aerial shots of the venue
- Mirror selfie station
- Polaroid guest book
- Confetti or sparkler exit shots
- Pre-event "getting ready" documentation

**DIY Photo Corner Setup:**
- Props: hats, glasses, signs, frames
- Ring light for flattering lighting
- Instant print photo booth
- Custom hashtag signage

💡 **Tip:** Create a shared album (Google Photos) for guests to upload their photos too!`;
    }

    // Default response
    return `Great question! Here are some thoughts on **"${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"** 🤔:

Based on my event planning knowledge, here are some key considerations:

1. **Start with your vision** — What feeling do you want guests to walk away with? Plan backwards from that emotion.

2. **Guest experience first** — Every decision should enhance the guest experience. Think about flow, comfort, and surprise moments.

3. **Seasonal awareness** — Consider the time of year for outdoor elements, seasonal flowers, and available produce for catering.

4. **Personal touches** — The most memorable events have personalized elements that tell a story about the host or occasion.

5. **Contingency plans** — Always have a Plan B for weather, vendor no-shows, or other surprises.

${appState.selectedEventType ? `\nSince you're planning a **${appState.selectedEventType}**, I'd recommend focusing on what makes this event uniquely yours!` : '\nTry selecting an event type above to get more personalized suggestions!'}

Feel free to ask me about specific topics like themes, menus, décor, entertainment, budgets, or vendor tips! 🎯`;
}

function formatAIResponse(text) {
    // Convert markdown-like formatting to HTML
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n- /g, '</li><li>')
        .replace(/\n(\d+)\. /g, '</li><li>')
        .replace(/\n/g, '<br>');

    // Wrap in paragraph
    html = '<p>' + html + '</p>';

    // Clean up list formatting
    html = html.replace(/<p>(.*?)<\/li>/g, '<ul><li>$1</li>');
    html = html.replace(/<li>((?:(?!<\/li>).)*)<\/p>/g, '<li>$1</li></ul>');

    return html;
}

// ─── Utility Functions ──────────────────
function formatNumber(num) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + ' L';
    return num.toLocaleString('en-IN');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle',
        info: 'fas fa-info-circle',
    };

    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ─── Resize handler for chart ───────────
window.addEventListener('resize', () => {
    drawBudgetChart();
});
