import config from "../db_config/database";

export class InitAppSource {
    static getRepositoryEntityInstance(Entity) {
        return config.getRepository(Entity);
    }

    static async databaseInit() {
        await config.initialize();
    }
}