   // Securely get the API key from Properties
   const apiKey = PropertiesService.getScriptProperties().getProperty('EXPO_PUBLIC_GEMINI_API_KEY');

   /**
    * Processes the user's prompt and generates course titles using the Gemini API.
    *
    * @param {string} prompt The user's input describing the desired course.
    * @return {object} An object containing the Gemini API's response, or an error object.
    */
   function GenerateTopicsAIModel(prompt) {
     const generationConfig = {
       temperature: 1,
       topP: 0.95,
       topK: 40,
       maxOutputTokens: 8192,
       responseMimeType: 'application/json',
     };

     const contents = [
       {
         role: 'user',
         parts: [
           {
             text:
               'Learn Python:: As you are coaching teacher \n' +
               '- User wants to learn about the topic \n' +
               '- Generate 5-7 Course titles for study (Short)\n' +
               '- Make sure it is related to description\n' +
               '- Output will be ARRAY of String in JSON FORMAT only\n' +
               '- Do not add any plain text in output.',
           },
         ],
       },
       {
         role: 'model',
         parts: [
           {
             text:
               '```json\n' +
               '[\n' +
               '  "Python Basics: A Gentle Introduction",\n' +
               '  "Python for Beginners: Hands-On Learning",\n' +
               '  "Python Fundamentals: Data, Control, and Logic",\n' +
               '  "Intro to Python: Scripting and Automation",\n' +
               '  "Python Programming: From Zero to Hero",\n' +
               '  "Python Core Concepts: Building Blocks",\n' +
               '  "Python 101: Getting Started with Code"\n' +
               ']\n' +
               '```\n',
           },
         ],
       },
       {
         role: 'user',
         parts: [{ text: prompt }], // Use the prompt parameter
       },
     ];

     const data = {
       generationConfig: generationConfig,
       contents: contents,
     };

     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
     const options = {
       method: 'POST',
       contentType: 'application/json',
       payload: JSON.stringify(data),
     };

     try {
       const response = UrlFetchApp.fetch(url, options);
       const responseText = response.getContentText();
       const jsonResponse = JSON.parse(responseText); // Parse JSON here
       return jsonResponse;
     } catch (error) {
       console.error('Error in GenerateTopicsAIModel:', error);
       // IMPORTANT:  Wrap the error in a JSON object.  This is crucial
       // for consistent error handling on the React Native side.
       return { error: { message: error.message } };
     }
   }

   /**
    * Handles POST requests to the web app.  This is the main entry point.
    *
    * @param {object} e The event object containing the request data.
    * @return {object} A ContentService response containing the result or error.
    */
   function doPost(e) {
     try {
       // Parse the JSON data from the request
       const requestData = JSON.parse(e.postData.contents);
       const prompt = requestData.prompt;

       // Call the AI model function
       const aiResponse = GenerateTopicsAIModel(prompt);

       // Return the response as JSON
       return ContentService.createTextOutput(JSON.stringify(aiResponse)).setMimeType(
         ContentService.MimeType.JSON
       );
     } catch (error) {
       // Handle errors and return a JSON error response
       return ContentService.createTextOutput(
         JSON.stringify({ error: { message: error.message } })
       ).setMimeType(ContentService.MimeType.JSON);
     }
   }
   