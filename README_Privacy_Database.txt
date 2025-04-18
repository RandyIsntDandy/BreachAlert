# Privacy Database for Chrome Extension

This file (`privacy_database.json`) contains a curated list of companies known to have data privacy concerns, including:
- Data leaks
- Selling user data
- Loss of personally identifiable information (PII)

## 📁 Where to Place This File
Place `privacy_database.json` in the **root of the Chrome extension folder**, next to `manifest.json`.

Example folder structure:
```
my-extension/
├── manifest.json
├── content.js
├── popup.html
├── privacy_database.json  ← this file
```

## 🔧 How to Load This File in JavaScript

Inside a content script or background script, you can fetch and use the data like this:

```javascript
fetch(chrome.runtime.getURL("privacy_database.json"))
  .then(response => response.json())
  .then(data => {
    const currentDomain = window.location.hostname.replace("www.", "");
    const result = data.find(entry => entry.domain === currentDomain);
    if (result) {
      console.log("⚠️ Privacy Warning:", result.company, result.category);
      // Show a popup or badge as needed
    }
  })
  .catch(error => console.error("Failed to load database:", error));
```

## 🧾 Data Format

Each entry is an object with the following structure:

```json
{
  "domain": "example.com",
  "company": "Example Inc.",
  "category": ["data_leak", "sells_user_data"],
  "last_incident": "2024-06-12",
  "sources": ["https://example.com/article"],
  "notes": "Brief description of the incident."
}
```

### Categories
- `data_leak`: The company experienced a data breach or leak
- `lost_pii`: The company lost sensitive personal user information
- `sells_user_data`: The company is known to sell or share user data

## ✅ Status
This file is ready for integration. No code setup is needed from the contributor who created it.