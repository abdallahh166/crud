A Product Management Dashboard web application that allows users to manage a list of products efficiently. The project is designed using HTML, CSS (Bootstrap for styling), and JavaScript, with features like user authentication, product validation, dynamic display, and local storage support.

Features
User Authentication:

Login functionality with predefined credentials (admin, user).
Error handling for invalid login attempts.
Product Management:

Add, update, and delete products with the following attributes:
Name
Price
Category
Description
Image
Sale status
Products are displayed dynamically in cards with options to edit or delete.
Validation:

Validates inputs for correctness using JavaScript regex:
Product name: Must start with a letter and be 4-15 characters long.
Price: Must be a number between 1 and 1,000,000.
Category: Must match predefined options (e.g., Tv, Mobile, Screens).
Description: Must be between 3 and 100 characters.
Image: Must have valid extensions (svg, png, jpg, jpeg).
Search Functionality:

Real-time search across product names with results displayed dynamically.
Local Storage:

Products are saved in the browser's local storage, ensuring data persistence across sessions.
Responsive Design:

Styled with Bootstrap for a mobile-friendly and visually appealing UI.

Technologies Used
HTML: Structure and layout of the web application.
CSS (Bootstrap): For styling and responsive design.
JavaScript: Core functionality, including:
Input validation.
Dynamic DOM manipulation.
Local storage integration.
