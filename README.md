Recipe Manager Web App

A responsive, client-side Recipe Manager that allows users to create, view, edit, and delete recipes — with full data persistence using browser localStorage.
No backend. No setup. Just open and use.

📌 Features

✨ Add, edit, and delete recipes

💾 Automatic data saving using localStorage

🧪 Preloaded sample recipes on first run

🎯 Search & filter recipes

📱 Fully responsive UI

⚡ Instant, client-side performance

🛠 Built with HTML • CSS • JavaScript (ES6)

📂 How to Run the App
Prerequisites

A modern web browser (Chrome, Firefox, Safari, Edge)

No server required

Steps

Download:

index.html

styles.css

script.js

Open index.html in your browser
✔️ Works instantly via file:// protocol
✔️ No installation needed

First Run Experience

Loads with sample recipes

Includes Vedant’s Pizza (My Own Recipe)

Includes 4 additional recipes

Data auto-saves to localStorage

🧩 Data Structure (localStorage)
Storage Key
"recipes"

Recipe Schema
{
  id: "string",
  title: "string",
  description: "string",
  ingredients: ["array", "of", "strings"],
  steps: ["array", "of", "strings"],
  prepTime: number,
  cookTime: number,
  difficulty: "easy" | "medium" | "hard",
  imageUrl: "string"
}

Example
[
  {
    "id": "kf93j2f83j",
    "title": "Vedant's Pizza",
    "description": "A delicious homemade pizza recipe for two people",
    "ingredients": ["2 pizza base", "2 tomatoes", "2 capsicum", "1 onion"],
    "steps": ["Finely cut all the veggies...", "Add veggies to pan..."],
    "prepTime": 15,
    "cookTime": 10,
    "difficulty": "medium",
    "imageUrl": ""
  }
]

⚙️ Assumptions & Limitations
Technical Assumptions

Browser supports ES6+, localStorage, CSS Grid/Flexbox

Single-user usage in one browser

Data persists unless user clears browser storage

Functional Limitations

Image upload not supported (URL only)

No external backup/export

No syncing across devices

No authentication or accounts

Search does not include steps field

No categories/tags for recipes

🚀 Performance Notes
# Recipes	Performance
50–100	🟢 Optimal
Up to 500	🟡 Acceptable
1000+	🔴 Not recommended (UI may lag)
🐛 Known Issues
Functional

Broken image URLs not validated

Fast clicking “Add Ingredient/Step” may create duplicates

No text length limits

Search is case-sensitive

No “Clear Filters” button

No automatic backup

Corrupted localStorage resets app to sample data

Browser-Specific

Safari Private Mode: localStorage may not persist

Mobile Browsers:

Small touch targets

Keyboard may cover fields

UI/UX

No loading indicators

No undo after delete

No confirmation on canceling edits

🛠 Troubleshooting
“My recipes disappeared!”

Browser data was cleared → app resets to sample data.

“Form won’t submit”

Check required fields (highlighted in red)

Ensure numbers are valid

“Images not loading”

Use direct image links (.jpg, .png)

Make sure images are publicly accessible

“App looks broken”

Ensure all 3 files are in the SAME folder

Open Developer Console (F12 → Console) for errors

🌐 Browser Compatibility
Browser	Version	Support
Chrome	60+	✅ Full
Firefox	55+	✅ Full
Safari	11+	✅ Full
Edge	79+	✅ Full
Mobile	Recent	✅ Full
🆘 Getting Help

If you run into issues:

Re-check this README

Ensure all files are correctly placed

Restart the browser

Try another browser

Check Developer Console

Note: All data stays in your browser. Clearing browsing data will erase all recipes.
