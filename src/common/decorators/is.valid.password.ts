import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        const bool = relatedValue
            ? typeof value === 'string' && typeof relatedValue === 'string'
            : typeof value === 'string';

        return (
            bool &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
                value,
            )
        );
    }
    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'The password must contain at least 1 number, at least 1 lower case letter, at least 1 upper case and at least 1 special character.';
    }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidPasswordConstraint,
        });
    };
}
