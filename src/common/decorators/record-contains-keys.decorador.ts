import {
  ValidationOptions,
  isObject,
  registerDecorator,
} from 'class-validator';

export const RecordContainsKeys = (
  required: string[],
  validationOptions?: ValidationOptions,
) => {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'RecordContainsKeys',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!isObject(value)) return false;
          const keys = Object.keys(value);

          return keys.some((key) => {
            const is_key_invalid = required.some(
              (validator) => validator === key,
            );

            return is_key_invalid;
          });
        },
        defaultMessage() {
          return `${propertyName} must have a valid key [${required.join()}]`;
        },
      },
    });
  };
};
