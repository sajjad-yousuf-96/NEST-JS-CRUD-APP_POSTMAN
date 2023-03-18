import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ProductsModule,MongooseModule.forRoot('mongodb://localhost:27017/MART')],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}
