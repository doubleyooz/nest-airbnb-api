import { HostEntity } from "src/models/hosts/entities/host.entity";
import { ProfileEntity } from "src/models/profiles/entities/profile.entity";

export interface Account {       
    firstName: string;   
    lastName: string;  
    password: string;   
    email: string;   
    birthDate: Date;             
    profileID: ProfileEntity;   
    hostID: HostEntity; 
   
    
}