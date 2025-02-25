import React, { useState, useEffect } from 'react';
import { getSettingsData, updateSettingsData } from '../../Datafiles/SettingsData';
import Styles from './Settings.module.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    profile: { name: '', email: '', password: '', profilePicture: '' },
    theme: { mode: '' },
    notifications: { email: false, inApp: false },
    general: { language: '', dateFormat: '', timeZone: '' },
    security: { twoFactorAuth: false, sessionTimeout: 0 },
  });

  // Fetch the settings data when the component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettingsData(); // Get settings data from the file
      setSettings(data); // Set the settings state
    };
    fetchSettings();
  }, []);

  // Update the settings when a change occurs
  const handleUpdate = async (updatedSettings) => {
    const newSettings = await updateSettingsData(updatedSettings); // Update the settings data
    setSettings(newSettings); // Update the state with the new settings
  };

  return (
    <div className={Styles.Container}>
      <h2>Admin Settings</h2>

      <div className={Styles.settingOption}>
        <h3>Profile</h3>
        <div>Name: {settings.profile.name}</div>
        <div>Email: {settings.profile.email}</div>
        <div>Password: {settings.profile.password}</div>
        <div>Profile Picture: {settings.profile.profilePicture || 'No picture set'}</div>
      </div>

      <div className={Styles.settingOption}>
        <h3>Theme</h3>
        <label>
          <span>Mode: </span>
          <select
            value={settings.theme.mode}
            onChange={(e) => handleUpdate({ theme: { mode: e.target.value } })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="custom">Custom</option>
          </select>
        </label>
      </div>

      <div className={Styles.settingOption}>
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications.email}
            onChange={() =>
              handleUpdate({
                notifications: {
                  ...settings.notifications,
                  email: !settings.notifications.email,
                },
              })
            }
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications.inApp}
            onChange={() =>
              handleUpdate({
                notifications: {
                  ...settings.notifications,
                  inApp: !settings.notifications.inApp,
                },
              })
            }
          />
          In-App Notifications
        </label>
      </div>

      <div className={Styles.settingOption}>
        <h3>General Settings</h3>
        <label>
          Language:
          <input
            type="text"
            value={settings.general.language}
            onChange={(e) =>
              handleUpdate({ general: { ...settings.general, language: e.target.value } })
            }
          />
        </label>
        <label>
          Date Format:
          <input
            type="text"
            value={settings.general.dateFormat}
            onChange={(e) =>
              handleUpdate({ general: { ...settings.general, dateFormat: e.target.value } })
            }
          />
        </label>
        <label>
          Time Zone:
          <input
            type="text"
            value={settings.general.timeZone}
            onChange={(e) =>
              handleUpdate({ general: { ...settings.general, timeZone: e.target.value } })
            }
          />
        </label>
      </div>

      <div className={Styles.settingOption}>
        <h3>Security</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={() =>
              handleUpdate({
                security: {
                  ...settings.security,
                  twoFactorAuth: !settings.security.twoFactorAuth,
                },
              })
            }
          />
          Enable Two Factor Authentication
        </label>
        <label>
          Session Timeout (minutes):
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) =>
              handleUpdate({
                security: {
                  ...settings.security,
                  sessionTimeout: Number(e.target.value),
                },
              })
            }
          />
        </label>
      </div>
    </div>
  );
};

export default Settings;
