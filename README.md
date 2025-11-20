Recipe Manager Web App
A responsive, client-side Recipe Manager application that allows users to create, view, edit, and delete recipes with full persistence using browser localStorage.

🚀 How to Run the App
Prerequisites
A modern web browser (Chrome, Firefox, Safari, Edge)

No server or backend required

Installation & Running
Download the files:

index.html

styles.css

script.js

Run the application:

Simply open index.html in your web browser

No web server needed - it runs directly in the browser

The app will work on file:// protocol
First Run Experience
✅ Automatically initializes with sample recipes

✅ Includes Vedant's pizza recipe (My Own Recipe)

✅ Added 4 additional sample recipes

✅ All data persists automatically in browser localStorage

✅ Ready to use immediately

💾 Data Structure in localStorage
Storage Key
javascript
"recipes"  // Primary storage key
Recipe Object Schema
javascript
{
  id: "string",          // Auto-generated unique identifier
  title: "string",       // Recipe name (required)
  description: "string", // Brief description
  ingredients: ["array", "of", "strings"], // Ingredients list (required)
  steps: ["array", "of", "strings"],       // Instructions (required)
  prepTime: number,      // Preparation time in minutes (required)
  cookTime: number,      // Cooking time in minutes (required)
  difficulty: "string",  // "easy" | "medium" | "hard" (required)
  imageUrl: "string"     // Optional image URL
}
Example Stored Data
javascript
// localStorage.getItem("recipes") returns:
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
⚙️ Assumptions and Limitations
Technical Assumptions
Browser Features: Modern browser with ES6+, localStorage, CSS Grid/Flexbox

Storage: localStorage available with typical 5-10MB capacity

Environment: Single-user, single-browser usage

Data Lifecycle: User doesn't regularly clear browser data/cache

Functional Limitations
No Image Upload: Only image URLs supported, no file upload capability

No Data Export: Recipes cannot be exported/backed up externally

Single Browser: Data doesn't sync across browsers/devices

No User Accounts: Single-user system only

Search Scope: Search only covers title, description, ingredients (not steps)

No Categories/Tags: Basic filtering by difficulty and time only

Performance Limits
Optimal: 50-100 recipes

Acceptable: Up to 500 recipes

Not Recommended: 1000+ recipes (may experience UI lag)

🐛 Known Issues
Functional Issues
Image URL Validation

No validation for broken image URLs

Placeholder shown if image fails to load

Form Input Handling

Duplicate ingredient/step fields can be created if quickly clicking "Add" button

No character limits on text inputs

Search/Filter

Search is case-sensitive

No "clear filters" button (must reset manually)

Data Integrity

No automatic data backup/export

If localStorage is corrupted, app resets to sample data

Browser-Specific Issues
Safari Private Browsing

localStorage may not persist in private mode

App will reinitialize with sample data on each visit

Mobile Browsers

Small touch targets on some filter elements

Keyboard may cover form inputs on focus

UI/UX Issues
No Loading States

No visual feedback during save/delete operations

Instant transitions between views

No Undo Functionality

Deleted recipes cannot be recovered

No confirmation for edit cancellation

🔧 Troubleshooting
Common Problems
"My recipes disappeared!"

Browser data was likely cleared

App will reinitialize with sample recipes

"Form won't submit"

Check for red error messages indicating required fields

Ensure all fields have valid values

"Images not loading"

Verify image URLs are valid and accessible

Use direct image links (ending with .jpg, .png, etc.)

"App looks broken"

Ensure all three files are in the same directory

Check browser console for JavaScript errors (F12)

📱 Browser Compatibility
Browser	Version	Support
Chrome	60+	✅ Full
Firefox	55+	✅ Full
Safari	11+	✅ Full
Edge	79+	✅ Full
Mobile Browsers	Recent	✅ Full
🆘 Getting Help
If you encounter issues:

Check this README for known issues

Ensure all files are in the same folder

Try refreshing the page

Test in a different browser

Check browser console for errors (F12 → Console)

Note: This is a client-side only application. All data is stored locally in your browser and will be lost if you clear browser data or switch browsers.
