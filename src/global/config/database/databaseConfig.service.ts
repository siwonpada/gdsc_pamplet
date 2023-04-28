import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            port: this.configService.get<number>('DB_PORT'),
            host: this.configService.get<string>('DB_HOST'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            synchronize: true,
        }
    }
}