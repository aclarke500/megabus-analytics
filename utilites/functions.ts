export function stripToNumbersAndPM(input: string): string {
  const match = input.match(/[0-9:]+(?:\s*PM)?/i);
  return match ? match[0].trim() : '';
}
export function timeDifferenceInMinutes(time1: string, time2: string): number {
  function convertToMinutes(time: string): number {
    console.log('Time received:', time); // Debugging line

    // Adjusted regex to match potential leading/trailing spaces and handle cases where there might be extra spaces
    const match = time.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/);
    // console.log('Regex match:', match); // Debugging line

    if (!match) throw new Error(`Invalid time format for input: "${time}"`);
    
    let [ , hoursStr, minutesStr, modifier] = match;
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    if (modifier.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }

  const minutes1 = convertToMinutes(time1);
  const minutes2 = convertToMinutes(time2);

  return Math.abs(minutes2 - minutes1);
}
