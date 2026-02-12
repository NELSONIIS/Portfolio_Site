// Google Apps Script for saving visitor information to Google Sheets
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Create a Google Sheet and copy its ID from the URL
// 5. Replace 'YOUR_SPREADSHEET_ID' below with your actual Spreadsheet ID
// 6. Deploy as Web App (Deploy > New deployment > Web app)
// 7. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 8. Copy the Web App URL and paste it in script.js (GOOGLE_SCRIPT_URL variable)

const SPREADSHEET_ID = '19ltlUiD2DO7C_tod_vlOnI6J1un1wLK4Tq6YT-sLkDY'; // Your Google Sheet ID
const SHEET_NAME = 'Visitors'; // Name of the sheet tab

function doPost(e) {
    try {
        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);

        // Open the spreadsheet
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);

        // Create sheet if it doesn't exist
        if (!sheet) {
            sheet = spreadsheet.insertSheet(SHEET_NAME);
            // Add headers
            sheet.appendRow(['Timestamp', 'Name', 'Source', 'Page URL']);
        }

        // Add the visitor data
        sheet.appendRow([
            data.timestamp,
            data.name,
            data.source,
            data.page
        ]);

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            message: 'Data saved successfully'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Test function (optional)
function testDoPost() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                name: 'Test User',
                source: 'Google Search',
                timestamp: new Date().toISOString(),
                page: 'https://example.com'
            })
        }
    };

    const result = doPost(testData);
    Logger.log(result.getContent());
}
