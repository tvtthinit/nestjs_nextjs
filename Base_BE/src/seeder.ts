import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
    // Create Nest application context (no HTTP server)
    const app = await NestFactory.createApplicationContext(AppModule);

    // Get TypeORM DataSource from DI container
    const dataSource = app.get(DataSource);

    // ⚠️ Drops and recreates all tables based on entities
    await dataSource.synchronize(true);

    // Run your custom seeder logic
    const seeder = app.get(SeederService);
    await seeder.run();

    // Close the app context
    await app.close();
}

bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});