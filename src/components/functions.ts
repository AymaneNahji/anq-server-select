/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

// Helper to find country by calling code
import metadata from 'libphonenumber-js/metadata.min.json';
export const findClosestCountry = (callingCode:string) => {
  const country = Object.keys(metadata.countries).find((key) => {
    return (metadata.countries[key as CountryCode] as any)[0] === callingCode;
  });
  return country || null;
};

// Parse a number and attempt to infer the closest country
export const inferClosestCountry = (phoneNumber:string) => {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber);
  if (parsedNumber && parsedNumber.isValid()) {
    return parsedNumber.country;
  }
  
  // If the number is invalid, deduce country from calling code
  const callingCodeMatch = phoneNumber.match(/^\+(\d+)/);
  if (callingCodeMatch) {
    const callingCode = callingCodeMatch[1];
    return findClosestCountry(callingCode);
  }
  return null;
};

export const objectToQueryString = (obj?: Record<string, any>): string => {
  if (!obj) {
    return '';
  }

  const params: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== null) {
        if (typeof value === 'object') {
          const nestedParams = objectToQueryString(value);
          params.push(nestedParams);
        } else {
          params.push(
            `${key}=${value}`
          );
        }
      }
    }
  }

  return params.join('&');
};

export const objectToFormData = (
  obj: any,
  formData = new FormData(),
  namespace = ''
): FormData => {
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const property = obj[key];

      if (typeof property === 'object' && !(property instanceof File)) {
        objectToFormData(property, formData, `${namespace + key}.`);
      } else if (property instanceof File) {
        formData.append(namespace + key, property, property.name);
      } else {
        formData.append(namespace + key, property);
      }
    });
  }
  return formData;
};

export const onlyNumberCharactersRegex = /\d+/;