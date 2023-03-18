import { Injectable, NotFoundException } from "@nestjs/common";
import { Products } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProductsService{
    private products: Products[] = [];   // private when not use by outside the class
 
    constructor(@InjectModel('Products') private readonly productModel:Model<Products>) {}  // not need if not moongose
         
    async insertProduct(title:string,description:string,price:number){
        // const prodID = new Date().toString(); date tos tring
        // const prodID = Math.random().toString();
        const newProduct = new this.productModel({
            title: title,
            description: description, 
            price: price,
        });
        // this.products.push(newProduct);
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;

        // return prodID;
    }

    async getProduct(){
        const products = await this.productModel.find().exec();
        return products.map(prod=> ({
            id: prod.id, 
            title:prod.title,
            description:prod.description,
            price:prod.price,
        }));
    }

    async getSingleProduct(prodID:string){
        const product = await this.findProduct(prodID);
        return {
            id:product.id,
            title:product.title,
            description:product.description,
            price:product.price,
            };
        };

    async getUpdateProduct(prodID:string,title:string,description:string,price:number){
        const updatedProduct = await this.findProduct(prodID);    // this.findProduct(prodID)[0] can also be used for product and for index prodID[1]
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
        // return updatedProduct;
    }

    private async findProduct(prodID:string): Promise<Products> {
        let product;
        try{
            product = await this.productModel.findById(prodID);
            // console.log(`SAJJAD ${product}`);
        } catch(error) {
            throw new NotFoundException('NOt product found');
        }
        // console.log(`SAJAD ${product}`);
        if (!product) {
            throw new NotFoundException(' NOt product found');
        }
        return product
        // {
        //     id:product.id,
        //     title:product.title,
        //     description:product.description,
        //     price:product.price,
        // };
    }

    async deleteProduct(prodID:string){
        const product = await this.productModel.findByIdAndDelete(prodID);
    }



    // without mongoose vvvv  ////

    // insertProduct(title:string,description:string,price:number){  // if not moongoose
    //     // const prodID = new Date().toString(); date tos tring
    //     const prodID = Math.random().toString();     
    //     const newProduct = new Products(prodID,title ,description, price);
    //     this.products.push(newProduct);
    //     return prodID;
    // }

    // getProduct(){
    //     return [...this.products];  // all product will be added as array
    // }

    // getSingleProduct(prodID:string){
    //     const product = this.findProduct(prodID)[0];
    //     return { ...product };  // all product will be added as array
    // }

    // getUpdateProduct(prodID:string,title:string,description:string,price:number){
    //     const [product,index] = this.findProduct(prodID);    // this.findProduct(prodID)[0] can also be used for product and for index prodID[1]
    //     const updatedProduct = {...product};
    //     if (title) {
    //         updatedProduct.title = title;
    //     }
    //     if (description) {
    //         updatedProduct.description = description;
    //     }
    //     if (price) {
    //         updatedProduct.price = price;
    //     }
    //     this.products[index] = updatedProduct;
    //     // return updatedProduct;
    // }
    
    // deleteProduct(prodID:string){
    //     const product = this.findProduct(prodID)[1];
    //     this.products.splice(product,1);

    // }

    // private findProduct(prodID:string):[Products, number] {
    //     const productIndex = this.products.findIndex(prod => prod.id === prodID);
    //     const product = this.products.find(prod => prod.id === prodID);
    //     if (!product) {
    //         throw new NotFoundException('sajjad NOt p[rordut found');
    //     }
    //     return [product,productIndex]
    // }

    

}