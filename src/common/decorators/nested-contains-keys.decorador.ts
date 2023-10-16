import {
  ValidationOptions,
  isObject,
  registerDecorator,
} from 'class-validator';

export const NestedContainsKeys = (
  required: string[],
  validationOptions?: ValidationOptions,
) => {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'NestedContainsKeys',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!isObject(value)) return false;

          const keys = Object.values(value)
            .map((item) => Object.keys(item))
            .flat(10);

          return keys.every((key) => {
            const is_key_invalid = required.some(
              (validator) => validator === key,
            );

            return is_key_invalid;
          });
        },

        defaultMessage() {
          return `${propertyName} must have a valid values [${required.join()}]`;
        },
      },
    });
  };
};
