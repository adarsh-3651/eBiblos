import { useEffect, useState } from 'react';
import { databases, account } from '../lib/appwrite';

const ProfileDashboard = () => {
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    email: '',
    phone: '',
    preferences: '',
  });

  const DATABASE_ID = '[YOUR_DATABASE_ID]';
  const COLLECTION_ID = '[YOUR_COLLECTION_ID]';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);

        const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, user.$id);
        setForm({
          email: response.email,
          phone: response.phone,
          preferences: response.preferences || '',
        });
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, userId, {
        email: form.email,
        phone: form.phone,
        preferences: form.preferences,
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl"
            type="text"
          />
        </div>
        <div>
          <label className="block font-medium">Preferences</label>
          <textarea
            name="preferences"
            value={form.preferences}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileDashboard;
