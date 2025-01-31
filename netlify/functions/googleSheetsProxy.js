exports.handler = async (event, context) => {
  try {
    // Load the API Key and Sheet ID from environment variables
    const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
    const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

    // Get the sheet name from query parameters, default to 'GameList' if not provided
    const { sheet = 'GameList' } = event.queryStringParameters || {};
    const RANGE = `${sheet}!A:B`;

    // the Google Sheets API URL
    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    // Fetch data from Google Sheets API
    const response = await fetch(sheetUrl);
    const data = await response.json();

    // Return the data from Google Sheets
    return {
      statusCode: 200,
      body: JSON.stringify(data.values), // Send back sheet data as JSON
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error fetching data from Google Sheets',
    };
  }
};
