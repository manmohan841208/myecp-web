// function maskEmail(email: string): string {
//   const [localPart, domain] = email?.split('@');

//   if (localPart.length <= 2) {
//     return `${localPart[0]}***@${domain}`;
//   }

//   const firstChar = localPart[0];
//   const lastChar = localPart[localPart.length - 1];
//   const maskedMiddle = '*'.repeat(localPart.length - 2);

//   return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
// }

// export default maskEmail;

function maskEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    // Check if email is null, undefined, or not a string
    return email; // Or return a default value like an empty string or throw an error
  }

  const [localPart, domain] = email.split('@');

  // Ensure both parts exist after the split, which might not if no '@' is present
  if (!localPart || !domain) {
    return email; // Handle cases where the input is not a valid email format
  }

  // The original logic to handle short local parts (optional based on requirements)
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedMiddle = '*'.repeat(localPart.length - 2);

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
}

export default maskEmail;
