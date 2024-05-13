import { Layer } from "./layer";

export interface Recipe {
    _id:string;
    name:string;
    categories:[string];
    preparationTimeInMinute:number;
    level:number;
    addDate:Date;
    layers:[Layer]
    preparation:[string];
    user:{_id:string,name:string};
    image:string;
}
