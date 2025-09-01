// File: netlify/functions/submitBooking.js

export async function handler(event) {
  // We only care about POST requests for submissions
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // The Google Apps Script URL is the same for GET and POST
    const GOOGLE_SCRIPT_URL = 
      "https://script.google.com/macros/s/AKfycbw6-_n2BEbRLAxitRIyWbz80bEimgFg36D7vsGh717E2Z1Q-uVE0j0Q3dbM7Q4FGOhr/exec";

    // Forward the POST request from the frontend to the Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: event.body // Pass along the booking data
    });

    if (!response.ok) {
      throw new Error(`Google Script responded with status: ${response.status}`);
    }

    const result = await response.json();

    // Return the success or error message from Google Apps Script to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}