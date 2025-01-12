
# Email Auto-Labeling Script

This Google Apps Script automatically labels emails in Gmail based on sender or domain. It simplifies email organization by applying labels dynamically.

## Features
- Automatically labels emails based on domain or specific email addresses.
- Processes emails in monthly batches for improved performance.
- Allows users to add custom labels for new domains or email addresses.
- Includes a trigger setup to run the script daily.

## How to Set Up and Use

### 1. Deploy the Script in Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/).
2. Create a new script.
3. Copy and paste the provided script into the editor.
4. Save the project.

### 2. Configure Labels
- **Domain Labels**: Update the `labelMappings` object with domains and corresponding labels.
```javascript
const labelMappings = {
  'example.com': { label: 'Customer/Example' },
  'partner.com': { label: 'Partner/Example' },
};
```

- **Email-Specific Labels**: Update the `emailMappings` object for specific email addresses.
```javascript
const emailMappings = {
  'support@example.com': 'Support/Example'
};
```

### 3. Run the Script
1. Click the play ▶️ icon to execute the `autoLabelEmails` function manually.
2. Verify that labels are applied in your Gmail account.

### 4. Schedule the Script to Run Daily
1. Run the `setupTrigger` function to set up a daily trigger.
2. The script will now run automatically once a day.

### 5. Adjust Debug Settings
- To enable or disable debug logs, toggle the `DEBUG` variable.
```javascript
const DEBUG = false; // Set to true for detailed logs
```

## Notes
- **Label Creation**: If a label doesn’t exist, the script will create it automatically.
- **Date Range**: Adjust the `startDate` variable to change how far back the script processes emails.
```javascript
const startDate = new Date('2020-01-01');
```

## Troubleshooting
- Check the execution logs for errors by going to **View > Execution Logs** in the Google Apps Script editor.
- Ensure the script has the necessary permissions to access Gmail by reauthorizing if needed.

## Disclaimer
This script is provided as-is. Test thoroughly before deploying to your Gmail account to avoid unintended labeling.

---
