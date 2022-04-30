import { Injectable, OnModuleInit } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export abstract class ValidatedConfigService implements OnModuleInit {
    async onModuleInit(): Promise<void> {
        const result: ValidationError[] = await validate(this);       
        if (result.length > 0) {
            throw new Error(
                `Configuration failed - Is there an environment variable missing?
                ${JSON.stringify(
                    result.map((v: ValidationError) => {
                        return {
                            property: v.property,
                            constraints: v.constraints,
                        };
                    }),
                    undefined,
                    2,
                )}`,
            );
        }
    }
}
