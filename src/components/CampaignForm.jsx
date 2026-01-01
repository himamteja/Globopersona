import { useState } from 'react';

export default function CampaignForm({ mode = 'create', initialData = {}, onNavigate }) {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        type: initialData.type || 'Email',
        status: initialData.status || 'Draft',
        subject: initialData.subject || '',
        audience: initialData.audience || '',
        budget: initialData.budget || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        description: initialData.description || '',
        tags: initialData.tags || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get existing campaigns
        const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');

        let updatedCampaigns;
        if (mode === 'edit' && initialData.id) {
            // Update existing
            updatedCampaigns = existingCampaigns.map(c =>
                c.id === initialData.id ? { ...c, ...formData } : c
            );
        } else {
            // Create new
            const newCampaign = {
                ...formData,
                id: Date.now(), // Generate ID
                sent: 0,
                opens: 0,
                clicks: 0,
            };
            updatedCampaigns = [newCampaign, ...existingCampaigns];
        }

        // Save to localStorage
        localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));

        console.log('Form submitted:', formData);
        alert(`Campaign ${mode === 'create' ? 'created' : 'updated'} successfully!`);
        onNavigate('campaigns');
    };

    const isEditMode = mode === 'edit';

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        {isEditMode ? 'Edit Campaign' : 'Create New Campaign'}
                    </h1>
                    <p className="page-subtitle">
                        {isEditMode
                            ? 'Update your campaign details and settings'
                            : 'Set up a new marketing campaign with your desired configurations'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-card">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h3 className="form-section-title">📋 Basic Information</h3>

                        <div className="form-group">
                            <label className="form-label">Campaign Name *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="e.g., Summer Sale 2025"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Campaign Type *</label>
                                <select
                                    name="type"
                                    className="form-select"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Email">Email Campaign</option>
                                    <option value="SMS">SMS Campaign</option>
                                    <option value="Social">Social Media</option>
                                    <option value="Push">Push Notification</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status *</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Active">Active</option>
                                    <option value="Paused">Paused</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Campaign Subject/Title *</label>
                            <input
                                type="text"
                                name="subject"
                                className="form-input"
                                placeholder="e.g., Get 50% OFF on Summer Collection!"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-textarea"
                                placeholder="Describe your campaign objectives and key messages..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Audience & Targeting */}
                    <div className="form-section">
                        <h3 className="form-section-title">👥 Audience & Targeting</h3>

                        <div className="form-group">
                            <label className="form-label">Target Audience *</label>
                            <select
                                name="audience"
                                className="form-select"
                                value={formData.audience}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select audience segment</option>
                                <option value="all">All Contacts</option>
                                <option value="new">New Customers</option>
                                <option value="returning">Returning Customers</option>
                                <option value="premium">Premium Members</option>
                                <option value="inactive">Inactive Users</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tags (comma-separated)</label>
                            <input
                                type="text"
                                name="tags"
                                className="form-input"
                                placeholder="e.g., promotion, seasonal, email"
                                value={formData.tags}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Schedule & Budget */}
                    <div className="form-section">
                        <h3 className="form-section-title">📅 Schedule & Budget</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Start Date *</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    className="form-input"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">End Date *</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    className="form-input"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Campaign Budget</label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)' }}>₹</span>
                                <input
                                    type="text"
                                    name="budget"
                                    className="form-input"
                                    placeholder="e.g., 5,000"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '28px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="form-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => onNavigate('campaigns')}
                        >
                            Cancel
                        </button>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button type="submit" className="btn btn-outline">
                                Save as Draft
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {isEditMode ? '✓ Update Campaign' : '🚀 Create Campaign'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
