export interface User {
    id: number; //put a uuid here
    firstName: string;  
    gender: string;  
    email: string;  
    governmentID? : string;
    phoneNumber: string;
    emergencyContact? : string;    
    nationality? : string;
    birthDate: Date;    
   
    
}
  