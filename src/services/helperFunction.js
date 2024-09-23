   export function formatDateToIST(isoDateString) {
    // Create a Date object from the ISO 8601 date string
    const date = new Date(isoDateString);
  
    // Define options for date and time formatting
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
      timeZone: 'Asia/Kolkata' // IST timezone
    };
  
    // Format the date to DD-MM-YYYY HH:mm
    const formattedDate = date.toLocaleString('en-IN', options);
  
    // Return the formatted date
    return formattedDate.replace(/[/]/g, '-'); // Replace / with - for DD-MM-YYYY
  }
  

  