export default function SettingsPage() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Settings</h1>
      <ul className="space-y-3 text-gray-700">
        <li>Profile</li>
        <li>Notifications</li>
        <li>Integrations</li>
        <li>Appearance</li>
      </ul>
    </div>
  );
}
