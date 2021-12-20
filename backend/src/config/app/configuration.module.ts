import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AppConfigService} from "./configuration.service";
import configVariables from "./configuration.constant";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    exports: [AppConfigService],
    providers: [AppConfigService],
})
export class AppConfigModule {}