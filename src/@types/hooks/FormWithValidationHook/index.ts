export type FormWithValidationField = {
  name: string;
  validation?: (fieldValue: any) => boolean;
  validateAfterTouched: boolean;
  touched: boolean;
  isValid: boolean;
  value: string | undefined;
};

export type FormWithValidation = {
  fields: FormWithValidationField[];
};
