// Email Auto-Labeling Script for Google Apps Script

const DEBUG = false; // Set to true for detailed logs during execution

// Label mappings for domains
const labelMappings = {
  'example.com': { label: 'Customer/Example' },
  'partner.com': { label: 'Partner/Example' },
  // Add additional domain mappings as needed
};

// Label mappings for specific email addresses
const emailMappings = {
  'support@example.com': 'Support/Example'
};

function autoLabelEmails() {
  const startDate = new Date('2020-01-01'); // Adjust as needed
  const endDate = new Date();
  const monthIncrement = 1;

  let currentDate = startDate;
  while (currentDate < endDate) {
    const nextDate = new Date(currentDate);
    nextDate.setMonth(currentDate.getMonth() + monthIncrement);

    const query = `in:anywhere after:${formatDate(currentDate)} before:${formatDate(nextDate)}`;
    if (DEBUG) console.log(`Searching for emails with query: "${query}"`);

    const threads = GmailApp.search(query);
    if (DEBUG) console.log(`Found ${threads.length} threads.`);

    threads.forEach(thread => {
      const messages = thread.getMessages();
      messages.forEach(message => {
        labelMessage(thread, message);
      });
    });

    currentDate = nextDate;
  }

  if (DEBUG) console.log(`Finished processing emails.`);
}

function labelMessage(thread, message) {
  const fromField = message.getFrom().toLowerCase();
  const toField = message.getTo().toLowerCase();

  if (DEBUG) console.log(`Processing email from: "${fromField}" to: "${toField}"`);

  for (const email in emailMappings) {
    if (fromField.includes(email) || toField.includes(email)) {
      applyLabelToThread(thread, emailMappings[email]);
      return;
    }
  }

  for (const domain in labelMappings) {
    if (fromField.includes(domain) || toField.includes(domain)) {
      applyLabelToThread(thread, labelMappings[domain].label);
      return;
    }
  }

  if (DEBUG) console.log(`No label applied for email from "${fromField}" to "${toField}".`);
}

function applyLabelToThread(thread, labelName) {
  let label = GmailApp.getUserLabelByName(labelName);

  if (!label) {
    try {
      label = GmailApp.createLabel(labelName);
      if (DEBUG) console.log(`Created label: "${labelName}"`);
    } catch (error) {
      console.error(`Failed to create label "${labelName}". Error: ${error.message}`);
      return;
    }
  }

  try {
    thread.addLabel(label);
    if (DEBUG) console.log(`Applied label "${labelName}" to thread.`);
  } catch (error) {
    console.error(`Failed to apply label "${labelName}". Error: ${error.message}`);
  }
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd');
}

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'autoLabelEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('autoLabelEmails')
    .timeBased()
    .everyDays(1) // Adjust as needed
    .create();

  if (DEBUG) console.log('Daily trigger set up.');
}
