import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    PetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
