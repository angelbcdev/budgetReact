function cleand() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  sheet.getRange(2, 1, sheet.getLastRow(), 5).clearContent();
  let val = sheet.getRange(2, 1, sheet.getLastRow(), 5).getValues();
  console.log(val);
}

// const sendToHome=()=>{
//   const sheet = SpreadsheetApp
//     .getActiveSpreadsheet()
//     .getSheetByName("home");

//   const headers = sheet.getDataRange().getValues()[0]

//   const data = JSON.parse(JSON.stringify([{"bookName":"Harry Potter and the Sorcerers Stone - PDF Room.pdf","zoom":1,"lastReadedPage":9,"totalPages":221,"lastModifiedDate":"2026-01-26T06:46","quotes":[{"page":9,"text":"this is a first quote"}]},{"bookName":"how to talk anyone.pdf","zoom":1.4000000000000004,"lastReadedPage":40,"totalPages":364,"lastModifiedDate":"2026-01-26T06:53","quotes":[]}]))

//   // Build rows
//   const rows = data.map(book =>
//     headers.map(header => {
//       if (header === "quotes") {
//         return JSON.stringify(book[header] || []);
//       }
//       return book[header] ?? "";
//     })
//   );

//   console.log(rows)

//   // Append rows
//   sheet.getRange(
//     sheet.getLastRow() + 1,
//     1,
//     rows.length,
//     headers.length
//   ).setValues(rows);
// }

// sendToHome()

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    const data = sheet.getDataRange().getValues();

    if (data.length < 2) {
      return ContentService.createTextOutput(
        JSON.stringify({ message: "No data available" }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0];
    const rows = data.slice(1);

    const jsonData = rows.map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    return ContentService.createTextOutput(
      JSON.stringify(jsonData),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const body = JSON.parse(e.postData.contents);

    Logger.log("Body received: " + JSON.stringify(body));

    // Extract sheetName explicitly
    const sheetName = body.sheetName;
    if (!sheetName) {
      throw new Error("sheetName is missing from the request body");
    }

    // Remove sheetName from data object
    delete body.sheetName;
    body.timestamp = new Date().toISOString();

    Logger.log("Target sheet: " + sheetName);
    Logger.log("Data to save: " + JSON.stringify(body));

    // Get sheet or create it
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log("Sheet not found, creating: " + sheetName);
      sheet = ss.insertSheet(sheetName);
      Logger.log("Sheet created: " + sheet.getName());
    }

    const incomingKeys = Object.keys(body);
    Logger.log("Incoming keys: " + JSON.stringify(incomingKeys));

    // If sheet is empty, create all headers
    if (sheet.getLastColumn() === 0) {
      Logger.log("Sheet is empty, creating headers...");
      sheet.getRange(1, 1, 1, incomingKeys.length).setValues([incomingKeys]);
      Logger.log("Headers created: " + JSON.stringify(incomingKeys));
    } else {
      // Sheet already has headers, add missing ones
      const existingHeaders = sheet
        .getRange(1, 1, 1, sheet.getLastColumn())
        .getValues()[0];

      Logger.log("Existing headers: " + JSON.stringify(existingHeaders));

      const missingKeys = incomingKeys.filter(
        (k) => !existingHeaders.includes(k),
      );

      if (missingKeys.length > 0) {
        Logger.log("Adding missing headers: " + JSON.stringify(missingKeys));
        const nextCol = sheet.getLastColumn() + 1;
        sheet
          .getRange(1, nextCol, 1, missingKeys.length)
          .setValues([missingKeys]);
      }
    }

    // Read final headers
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    Logger.log("Final headers: " + JSON.stringify(headers));

    // Build row matching column order
    const row = headers.map((h) => (body[h] !== undefined ? body[h] : ""));
    Logger.log("Row to append: " + JSON.stringify(row));

    sheet.appendRow(row);

    Logger.log("Row added successfully to: " + sheetName);
    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log("Error in doPost: " + err.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function testSpending() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        sheetName: "Spending",
        id: "txn-001",
        title: "Dinner at Carmine's",
        description: "Italian restaurant with friends",
        amount: -85.5,
        date: "2026-01-03",
        type: "spending",
        category: "food",
        subcategory: "restaurant",
        paymentMethod: "credit_card_blue",
      }),
    },
  };

  const result = doPost(mockEvent);
  Logger.log("testSpending result: " + result.getContent());
}

testSpending();
