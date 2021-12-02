import { HostEntity } from "src/models/hosts/entities/host.entity";
import { ProfileEntity } from "src/models/profiles/entities/profile.entity";

export interface Account {   
    id: number;   
    firstName: string;   
    lastName: string;  
    password: string;   
    email: string;   
    birthDate: Date;
    createdAt: Date;           
    profileID: ProfileEntity;   
    hostID: HostEntity; 
   
    
}