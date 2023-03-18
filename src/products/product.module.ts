import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';


@Module({
  imports: [MongooseModule.forFeature([{name:'Products',schema:ProductSchema}])  //here name will be same as product.module.ts file after interface
],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
