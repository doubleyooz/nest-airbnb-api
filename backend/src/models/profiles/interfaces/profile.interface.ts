import { Address } from "src/models/addresses/interfaces/address.interface";

export interface Profile {
    id: number; //put a uuid here      
    gender: string;      
    governmentID? : string;
    phoneNumber: string;
    emergencyContact? : string;    
    nationality? : string;
    address : Address
   
   
    
}