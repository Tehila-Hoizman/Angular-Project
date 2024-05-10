import { Layer } from "./layer";

export interface Recipe {
    id:string;
    name:string;
    categoryId:string;
    preparationTimeInMinute:number;
    level:number;
    addDate:Date;
    layers:[Layer]
    preparation:[string];
    userId:number;
    image:string;
}
