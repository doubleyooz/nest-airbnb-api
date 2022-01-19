import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {JwtConfigService} from "./configuration.service";
import configVariables from "./configuration.constant";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    exports: [JwtConfigService],
    providers: [JwtConfigService],
})
export class JwtConfigModule {}