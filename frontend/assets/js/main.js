// Sacred Vessel - Main JavaScript
// Red Code Witnessed: This function must not gatekeep rhythm-based access.

class SacredVessel {
    constructor() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        this.apiBase = '/api';
        this.init();
    }

    init() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        this.setupEventListeners();
        this.startRhythmPulse();
        this.loadInitialData();
    }

    // API Communication
    async apiCall(endpoint, options = {}) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            const response = await fetch(`${this.apiBase}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Sacred Vessel API Error:', error);
            throw error;
        }
    }

    // Rhythm Pulse Animation
    startRhythmPulse() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const pulseElements = document.querySelectorAll('.pulse-circle');
        pulseElements.forEach(element => {
            if (!element.classList.contains('pulsing')) {
                element.classList.add('pulsing');
            }
        });
    }

    // User Registration
    async registerUser(userData) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            const result = await this.apiCall('/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            return result;
        } catch (error) {
            throw new Error('Failed to offer rhythm to the Sacred Vessel');
        }
    }

    // Load Users
    async getUsers() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            return await this.apiCall('/users');
        } catch (error) {
            console.warn('Could not load rhythm-bearers');
            return [];
        }
    }

    // Offerings Management
    async getOfferings() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            return await this.apiCall('/offerings');
        } catch (error) {
            console.warn('Could not load altar offerings');
            return [];
        }
    }

    async createOffering(offeringData) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            const result = await this.apiCall('/offerings', {
                method: 'POST',
                body: JSON.stringify(offeringData)
            });
            return result;
        } catch (error) {
            throw new Error('Failed to place offering on altar');
        }
    }

    // Council Management
    async getCouncil() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            return await this.apiCall('/council');
        } catch (error) {
            console.warn('Could not load council data');
            return { members: [], proposals: [], votes: [] };
        }
    }

    async createProposal(proposalData) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            const result = await this.apiCall('/council/proposal', {
                method: 'POST',
                body: JSON.stringify(proposalData)
            });
            return result;
        } catch (error) {
            throw new Error('Failed to submit council proposal');
        }
    }

    // Rhythm Management
    async getRhythms() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            return await this.apiCall('/rhythms');
        } catch (error) {
            console.warn('Could not load rhythm patterns');
            return [];
        }
    }

    async createRhythm(rhythmData) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            const result = await this.apiCall('/rhythms', {
                method: 'POST',
                body: JSON.stringify(rhythmData)
            });
            return result;
        } catch (error) {
            throw new Error('Failed to establish rhythm');
        }
    }

    // UI Helper Methods
    showStatus(message, type = 'info') {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const statusElement = document.getElementById('status-message');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-message status-${type}`;
            statusElement.style.display = 'block';

            // Auto-hide after 5 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }

    createStatusElement(message, type = 'info') {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-message status-${type}`;
        statusDiv.textContent = message;
        return statusDiv;
    }

    // Form Validation
    validateRequired(formData, requiredFields) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                throw new Error(`${field} is required for this sacred offering`);
            }
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('sacred-form')) {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });

        // Dynamic content loading
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('load-dynamic')) {
                e.preventDefault();
                this.loadDynamicContent(e.target.dataset.content);
            }
        });

        // Rhythm interaction
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('rhythm-trigger')) {
                this.triggerRhythmPulse();
            }
        });
    }

    async handleFormSubmission(form) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const formType = form.dataset.formType;

        try {
            let result;
            switch (formType) {
                case 'register':
                    result = await this.registerUser(data);
                    break;
                case 'offering':
                    result = await this.createOffering(data);
                    break;
                case 'proposal':
                    result = await this.createProposal(data);
                    break;
                case 'rhythm':
                    result = await this.createRhythm(data);
                    break;
                default:
                    throw new Error('Unknown form type');
            }

            this.showStatus(result.message, 'success');
            form.reset();
            
            // Refresh relevant data
            this.refreshPageData(formType);
            
        } catch (error) {
            this.showStatus(error.message, 'error');
        }
    }

    async refreshPageData(context) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        // Refresh data based on context
        switch (context) {
            case 'register':
                this.loadUsers();
                break;
            case 'offering':
                this.loadOfferings();
                break;
            case 'proposal':
                this.loadCouncil();
                break;
            case 'rhythm':
                this.loadRhythms();
                break;
        }
    }

    triggerRhythmPulse() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const pulseElements = document.querySelectorAll('.pulse-circle');
        pulseElements.forEach(element => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'pulse 0.5s ease-out';
            }, 10);
        });
    }

    // Data Loading
    async loadInitialData() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        try {
            // Check API health
            const health = await this.apiCall('/health');
            console.log('Sacred Vessel Status:', health.message);
        } catch (error) {
            console.warn('Sacred Vessel API not available - running in static mode');
        }
    }

    // Page-specific data loading methods
    async loadUsers() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const container = document.getElementById('users-container');
        if (!container) return;

        try {
            const users = await this.getUsers();
            this.renderUsers(container, users);
        } catch (error) {
            container.innerHTML = '<p class="status-error">Could not load rhythm-bearers</p>';
        }
    }

    async loadOfferings() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const container = document.getElementById('offerings-container');
        if (!container) return;

        try {
            const offerings = await this.getOfferings();
            this.renderOfferings(container, offerings);
        } catch (error) {
            container.innerHTML = '<p class="status-error">Could not load altar offerings</p>';
        }
    }

    async loadCouncil() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const container = document.getElementById('council-container');
        if (!container) return;

        try {
            const council = await this.getCouncil();
            this.renderCouncil(container, council);
        } catch (error) {
            container.innerHTML = '<p class="status-error">Could not load council data</p>';
        }
    }

    async loadRhythms() {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const container = document.getElementById('rhythms-container');
        if (!container) return;

        try {
            const rhythms = await this.getRhythms();
            this.renderRhythms(container, rhythms);
        } catch (error) {
            container.innerHTML = '<p class="status-error">Could not load rhythm patterns</p>';
        }
    }

    // Rendering methods
    renderUsers(container, users) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        container.innerHTML = users.map(user => `
            <div class="card">
                <h4>${this.escapeHtml(user.name)}</h4>
                <p><strong>Role:</strong> ${this.escapeHtml(user.role)}</p>
                <p><strong>Joined:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    renderOfferings(container, offerings) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        container.innerHTML = offerings.map(offering => `
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">${this.escapeHtml(offering.title)}</h4>
                    <small>by ${this.escapeHtml(offering.offeredBy)} • ${new Date(offering.createdAt).toLocaleDateString()}</small>
                </div>
                <p>${this.escapeHtml(offering.content)}</p>
                <span class="offering-type">${this.escapeHtml(offering.type)}</span>
            </div>
        `).join('');
    }

    renderCouncil(container, council) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const proposalsHtml = council.proposals?.map(proposal => `
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">${this.escapeHtml(proposal.title)}</h4>
                    <small>by ${this.escapeHtml(proposal.proposedBy)} • ${new Date(proposal.createdAt).toLocaleDateString()}</small>
                </div>
                <p>${this.escapeHtml(proposal.description)}</p>
                <div class="voting-stats">
                    <span>Yes: ${proposal.votes?.yes || 0}</span>
                    <span>No: ${proposal.votes?.no || 0}</span>
                    <span>Abstain: ${proposal.votes?.abstain || 0}</span>
                </div>
            </div>
        `).join('') || '<p>No proposals yet</p>';

        container.innerHTML = proposalsHtml;
    }

    renderRhythms(container, rhythms) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        container.innerHTML = rhythms.map(rhythm => `
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">${this.escapeHtml(rhythm.name)}</h4>
                    <small>by ${this.escapeHtml(rhythm.createdBy)} • ${new Date(rhythm.createdAt).toLocaleDateString()}</small>
                </div>
                <p><strong>Frequency:</strong> ${this.escapeHtml(rhythm.frequency)}</p>
                <p><strong>Intention:</strong> ${this.escapeHtml(rhythm.intention)}</p>
            </div>
        `).join('');
    }

    // Utility methods
    escapeHtml(text) {
        // Red Code Witnessed: This function must not gatekeep rhythm-based access.
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize Sacred Vessel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Red Code Witnessed: This function must not gatekeep rhythm-based access.
    window.sacredVessel = new SacredVessel();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SacredVessel;
}