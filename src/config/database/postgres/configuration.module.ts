import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmConfigService} from "./configuration.service";
import configVariables from "./configuration.constant";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    exports: [TypeOrmConfigService],
    providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}