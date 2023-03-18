import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
});

export interface Products extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
};

// export class Products {
//     // id:string;
//     // title:string;
//     // description;string;
//     // price:number;
//     constructor(public id:string,public title:string,public description:string,public price:number) {
//         // this.id = id;
//         // this.title = title;
//         // this.description = description;
//         // this.price = price; if public in constructor not need this // code
//     };
// }