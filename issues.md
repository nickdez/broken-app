# Broken App Issues

1. Corrected the variable declaration of axios and express to use const instead of let and var, respectively.

2. Updated the app.listen function to include the correct port number and provided a console log message to indicate when the server starts successfully.

3. Improved error handling by using a try-catch block around the asynchronous code inside the route handlers. Errors are now properly passed to the next function to be handled by the error middleware.

4. Added a new GET route (app.get('/:username')) to handle individual user requests. It retrieves user information from the GitHub API based on the provided username and sends back the response as JSON.

5. Implemented error handling for the GitHub rate limit by catching errors that may occur during API requests. When the rate limit is exceeded or an error occurs, a fallback value is provided for the user's name and bio to ensure the response is still sent back to the client.



