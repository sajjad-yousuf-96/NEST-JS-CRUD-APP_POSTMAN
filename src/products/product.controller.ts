import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from "@nestjs/common";
import { get } from "http";
import { ProductsService } from "./products.service";



@Controller('products')
export class ProductsController{
    constructor(private readonly productsService:ProductsService) {
        
    }

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
        ) {
            const generatedId = await this.productsService.insertProduct(prodTitle,prodDescription,prodPrice);
            return { id:generatedId };
    } 

    @Get()
    async getAllProduct() {
        const products = await this.productsService.getProduct();
        return products
    }

    // @get if two get decorrator used first one will be executed
    @Get(':id')
    getProduct(@Param('id')prodID:string){
        return this.productsService.getSingleProduct(prodID);
    }
    

    @Patch(':id')
    async updateProduct(@Param('id')prodID:string, 
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number){
        await this.productsService.getUpdateProduct(prodID,prodTitle,prodDescription,prodPrice);
        return null;
    }

    @Delete(':id')
    deleteProduct(@Param('id')prodID:string){
        this.productsService.deleteProduct(prodID);

    } 

}