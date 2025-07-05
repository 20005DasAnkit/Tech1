// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import "../styles/ProfilePage.css";


const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    place: '',
    district: '',
    state: '',
    houseNumber: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing profile data if needed
    fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setFormData(data);
        } else {
          setError('Failed to load profile');
        }
      })
      .catch(err => setError('Failed to load profile'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => alert('Profile saved successfully'))
      .catch(err => alert('Error saving profile'));
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <p className="error">{error}</p>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" />
        <input name="place" value={formData.place} onChange={handleChange} placeholder="Place" />
        <input name="district" value={formData.district} onChange={handleChange} placeholder="District" />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" />
        <input name="houseNumber" value={formData.houseNumber} onChange={handleChange} placeholder="House No." />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
