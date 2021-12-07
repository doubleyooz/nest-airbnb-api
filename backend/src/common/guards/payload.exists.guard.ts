import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PayloadGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (request && request.body) {
            for (let k in request.body) return true;
            throw new BadRequestException('Payload should not be empty');
        } else throw new BadRequestException('Payload should not be empty');
    }
}
