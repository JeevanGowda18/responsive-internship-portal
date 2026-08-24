const internshipData = {
  "internships": [
    {
      "id": "INT-101",
      "title": "Frontend Intern",
      "domain": "Full Stack Development",
      "mode": "Remote",
      "location": "India",
      "skills": ["HTML", "CSS", "JavaScript"],
      "openings": 3
    },
    {
      "id": "INT-102",
      "title": "API Engineering Intern",
      "domain": "Full Stack Development",
      "mode": "Hybrid",
      "location": "Pune",
      "skills": ["Node.js", "SQL", "Testing"],
      "openings": 2
    },
    {
      "id": "INT-103",
      "title": "UI/UX Intern",
      "domain": "UI/UX",
      "mode": "Remote",
      "location": "India",
      "skills": ["Figma", "Research", "Accessibility"],
      "openings": 1
    },
    {
      "id": "INT-104",
      "title": "Data Analyst Intern",
      "domain": "Data Analytics",
      "mode": "On-site",
      "location": "Bengaluru",
      "skills": ["Excel", "SQL", "Data visualisation"],
      "openings": 2
    },
    {
      "id": "INT-105",
      "title": "Security Operations Intern",
      "domain": "Cyber Security",
      "mode": "Remote",
      "location": "India",
      "skills": ["Linux", "Logs", "Networking"],
      "openings": 1
    }
  ]
};

const grid = document.getElementById('internships-grid');
const searchInput = document.getElementById('search-input');
const domainFilter = document.getElementById('domain-filter');
const statusMessage = document.getElementById('status-message');

// Populate domain filter dropdown dynamically from data
function populateDomains() {
  const domains = ['all', ...new Set(internshipData.internships.map(i => i.domain))];
  domainFilter.innerHTML = domains.map(domain => 
    `<option value="${domain}">${domain === 'all' ? 'All Domains' : domain}</option>`
  ).join('');
}

function renderList(data) {
  grid.innerHTML = '';
  statusMessage.textContent = `Showing ${data.length} internship${data.length === 1 ? '' : 's'}.`;

  if (data.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No internships found</h3>
        <p>Try adjusting your search terms or domain filter.</p>
      </div>`;
    return;
  }

  data.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div>
        <span class="badge">${item.domain}</span>
        <h2>${item.title}</h2>
        <div class="company">${item.mode} • ${item.location} • ${item.openings} opening(s)</div>
        <p class="skills"><strong>Skills:</strong> ${item.skills.join(', ')}</p>
      </div>
      <button aria-label="Apply for ${item.title}">Apply Now</button>
    `;
    grid.appendChild(card);
  });
}

function filterInternships() {
  try {
    const query = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainFilter.value;

    const filtered = internshipData.internships.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) ||
                            item.skills.some(skill => skill.toLowerCase().includes(query)) ||
                            item.location.toLowerCase().includes(query);
      const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
      return matchesSearch && matchesDomain;
    });

    renderList(filtered);
  } catch (error) {
    statusMessage.textContent = 'An error occurred while filtering data.';
    grid.innerHTML = `<div class="error-state"><p>Error loading records. Please refresh.</p></div>`;
  }
}

// Event Listeners
searchInput.addEventListener('input', filterInternships);
domainFilter.addEventListener('change', filterInternships);

// Initialize UI
populateDomains();
renderList(internshipData.internships);