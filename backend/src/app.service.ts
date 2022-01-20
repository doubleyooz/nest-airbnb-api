import { Injectable } from '@nestjs/common';
import { getMessage } from 'common/helpers/message.helper';

@Injectable()
export class AppService {
    getHello(): string {
        return getMessage("helloWorld");
    }
}
