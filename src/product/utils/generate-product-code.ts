import * as crypto from 'crypto';

export default function generateProductCode(productName: string): string {
  const s = productName.replace(/\s+/g, '').toLowerCase();
  let maxLength = 0;
  let currentLength = 1;
  let substrings = [];
  let currentSubstring = s[0];
  let startIndex = 0;
  let endIndex = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] > s[i - 1]) {
      currentLength++;
      currentSubstring += s[i];
    } else {
      if (currentLength > maxLength) {
        maxLength = currentLength;
        substrings = [currentSubstring];
        startIndex = i - currentLength;
        endIndex = i - 1;
      } else if (currentLength === maxLength) {
        substrings.push(currentSubstring);
        endIndex = i - 1;
      }
      currentLength = 1;
      currentSubstring = s[i];
    }
  }

  if (currentLength > maxLength) {
    substrings = [currentSubstring];
    startIndex = s.length - currentLength;
    endIndex = s.length - 1;
  } else if (currentLength === maxLength) {
    substrings.push(currentSubstring);
    endIndex = s.length - 1;
  }

  const substring = substrings.join('');
  const hashedName = crypto
    .createHash('sha256')
    .update(productName + Date.now().toString()) // Add timestamp to ensure unique hash
    .digest('hex')
    .slice(0, 7);

  return `${hashedName}-${startIndex}${substring}${endIndex}`;
}
