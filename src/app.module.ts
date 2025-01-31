import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { NidModule } from './nid/nid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // সারা অ্যাপে `.env` ব্যবহার করতে
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonModule,
    NidModule,
  ],
})
export class AppModule { }
