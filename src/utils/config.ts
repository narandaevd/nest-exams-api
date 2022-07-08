import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class Configation {
    static _config: any = null;
    static consts(): any {
        if (Configation._config == null) {
            const pathEnvFile = path.join(__dirname, '../../.env');
            const rawConfig = dotenv.parse(fs.readFileSync(pathEnvFile));
            Configation._config = {
                ...rawConfig,
                PORT: parseInt(rawConfig.PORT),
                DB_PORT: parseInt(rawConfig.DB_PORT),
            };
        } 
        return Configation._config; 
    }
}