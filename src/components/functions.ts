/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
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
