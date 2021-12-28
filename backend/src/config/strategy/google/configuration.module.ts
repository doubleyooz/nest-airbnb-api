import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {GoogleConfigService} from "./configuration.service";
import configVariables from "./configuration.constant";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    exports: [GoogleConfigService],
    providers: [GoogleConfigService],
})
export class GoogleConfigModule {}