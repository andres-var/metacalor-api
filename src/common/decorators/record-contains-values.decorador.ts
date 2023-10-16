import {
  ValidationOptions,
  isObject,
  registerDecorator,
} from 'class-validator';

export const RecordContainsValues = (
  required: any[],
  validationOptions?: ValidationOptions,
) => {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'RecordContainsValues',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!isObject(value)) return false;
          const values = Object.values(value);

          return values.some((value) => {
            const is_value_invalid = required.some(
              (validator) => validator === value,
            );

            return is_value_invalid;
          });
        },
        defaultMessage() {
          return `${propertyName} must have a valid values [${required.join()}]`;
        },
      },
    });
  };
};
