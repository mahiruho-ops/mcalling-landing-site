// Comprehensive country code list with phone validation patterns
export interface CountryCode {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  phonePattern?: RegExp;
  phonePlaceholder?: string;
}

export const countryCodes: CountryCode[] = [
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳", phonePattern: /^[6-9]\d{9}$/, phonePlaceholder: "9876543210" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸", phonePattern: /^\d{10}$/, phonePlaceholder: "1234567890" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧", phonePattern: /^[1-9]\d{9,10}$/, phonePlaceholder: "7123456789" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦", phonePattern: /^\d{10}$/, phonePlaceholder: "1234567890" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺", phonePattern: /^[4-9]\d{8}$/, phonePlaceholder: "412345678" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪", phonePattern: /^[1-9]\d{10,11}$/, phonePlaceholder: "15123456789" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷", phonePattern: /^[1-9]\d{8}$/, phonePlaceholder: "612345678" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵", phonePattern: /^[789]0\d{8}$/, phonePlaceholder: "9012345678" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳", phonePattern: /^1[3-9]\d{9}$/, phonePlaceholder: "13812345678" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬", phonePattern: /^[689]\d{7}$/, phonePlaceholder: "81234567" },
  { name: "UAE", code: "AE", dialCode: "+971", flag: "🇦🇪", phonePattern: /^[5]\d{8}$/, phonePlaceholder: "501234567" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦", phonePattern: /^[5]\d{8}$/, phonePlaceholder: "501234567" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩", phonePattern: /^[1][3-9]\d{8}$/, phonePlaceholder: "1712345678" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰", phonePattern: /^[3]\d{9}$/, phonePlaceholder: "3012345678" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰", phonePattern: /^[7]\d{8}$/, phonePlaceholder: "712345678" },
  { name: "Nepal", code: "NP", dialCode: "+977", flag: "🇳🇵", phonePattern: /^[9][678]\d{8}$/, phonePlaceholder: "9812345678" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦", phonePattern: /^[6-8]\d{8}$/, phonePlaceholder: "812345678" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷", phonePattern: /^[1-9]\d{10}$/, phonePlaceholder: "11987654321" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽", phonePattern: /^[1-9]\d{9,10}$/, phonePlaceholder: "5512345678" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩", phonePattern: /^[8]\d{9,10}$/, phonePlaceholder: "8123456789" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭", phonePattern: /^[9]\d{9}$/, phonePlaceholder: "9123456789" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭", phonePattern: /^[6-9]\d{8}$/, phonePlaceholder: "812345678" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾", phonePattern: /^[1][0-9]\d{8,9}$/, phonePlaceholder: "1234567890" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳", phonePattern: /^[3-9]\d{8,9}$/, phonePlaceholder: "912345678" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷", phonePattern: /^[1]\d{9,10}$/, phonePlaceholder: "1012345678" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹", phonePattern: /^[3]\d{9}$/, phonePlaceholder: "3123456789" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸", phonePattern: /^[6-9]\d{8}$/, phonePlaceholder: "612345678" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱", phonePattern: /^[6]\d{8}$/, phonePlaceholder: "612345678" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪", phonePattern: /^[4]\d{8}$/, phonePlaceholder: "412345678" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭", phonePattern: /^[7]\d{8}$/, phonePlaceholder: "712345678" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪", phonePattern: /^[7]\d{8,9}$/, phonePlaceholder: "712345678" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴", phonePattern: /^[4-9]\d{7}$/, phonePlaceholder: "41234567" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰", phonePattern: /^[2-9]\d{7}$/, phonePlaceholder: "21234567" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱", phonePattern: /^[5-9]\d{8}$/, phonePlaceholder: "512345678" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺", phonePattern: /^[9]\d{9}$/, phonePlaceholder: "9123456789" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷", phonePattern: /^[5]\d{9}$/, phonePlaceholder: "5123456789" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬", phonePattern: /^[1]\d{9}$/, phonePlaceholder: "1012345678" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪", phonePattern: /^[7]\d{8}$/, phonePlaceholder: "712345678" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬", phonePattern: /^[789]\d{9}$/, phonePlaceholder: "8012345678" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷", phonePattern: /^[9]\d{9,10}$/, phonePlaceholder: "9112345678" },
  { name: "Chile", code: "CL", dialCode: "+56", flag: "🇨🇱", phonePattern: /^[9]\d{8}$/, phonePlaceholder: "912345678" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴", phonePattern: /^[3]\d{9}$/, phonePlaceholder: "3123456789" },
  { name: "Peru", code: "PE", dialCode: "+51", flag: "🇵🇪", phonePattern: /^[9]\d{8}$/, phonePlaceholder: "912345678" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿", phonePattern: /^[2]\d{8,9}$/, phonePlaceholder: "212345678" },
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱", phonePattern: /^[5]\d{8}$/, phonePlaceholder: "501234567" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦", phonePattern: /^[3-7]\d{7}$/, phonePlaceholder: "33123456" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼", phonePattern: /^[5-9]\d{7}$/, phonePlaceholder: "51234567" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲", phonePattern: /^[9]\d{8}$/, phonePlaceholder: "912345678" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭", phonePattern: /^[3]\d{7}$/, phonePlaceholder: "31234567" },
];

// Default to India
export const defaultCountry = countryCodes.find(c => c.code === "IN") || countryCodes[0];

// Function to detect country from browser locale/timezone
export function detectCountryFromBrowser(): CountryCode {
  if (typeof window === 'undefined') {
    return defaultCountry;
  }

  try {
    // Try to get country from timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || navigator.languages?.[0] || 'en-IN';
    
    // Extract country code from locale (e.g., 'en-IN' -> 'IN')
    const localeCountry = locale.split('-')[1]?.toUpperCase();
    
    if (localeCountry) {
      const country = countryCodes.find(c => c.code === localeCountry);
      if (country) {
        return country;
      }
    }

    // Try to match timezone to country
    const timezoneCountryMap: Record<string, string> = {
      'Asia/Kolkata': 'IN',
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Asia/Dubai': 'AE',
      'Asia/Singapore': 'SG',
      'Australia/Sydney': 'AU',
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
    };

    const countryCode = timezoneCountryMap[timezone];
    if (countryCode) {
      const country = countryCodes.find(c => c.code === countryCode);
      if (country) {
        return country;
      }
    }
  } catch (error) {
    console.error('Error detecting country:', error);
  }

  return defaultCountry;
}

// Function to validate phone number based on country
export function validatePhoneNumber(phone: string, country: CountryCode): boolean {
  if (!phone || !phone.trim()) {
    return false;
  }

  // Remove spaces, dashes, and other formatting
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

  // If country has a validation pattern, use it
  if (country.phonePattern) {
    return country.phonePattern.test(cleanPhone);
  }

  // Basic validation: at least 7 digits, max 15 digits (ITU-T E.164 standard)
  return /^\d{7,15}$/.test(cleanPhone);
}
