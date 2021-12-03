Personally, I've never used Airbnb, so the description I am making here may not be the most accurate one, feel free to give me tips on how to improve

signin/signup {Google, Facebook}

Account {  
  firstName : string, (Required)  
  lastName : string, (Required)  
  email: string, (Required)  
  birthDate : Date, (Required)  
  password: string, (Required)  //Airbnb doesn't require one  
 
  linkedAccounts : [string], (Required)  
  deviceHistory : [device], (Required)  
  paymentMethods : [payments], (Required)  

  profile : Profile, (Required) (Nullable)  
  hostingId : string, (Required) (Nullable)  
  active : boolean (Required)  

}  
Profile {    
  gender : string, (Required)  
  governmentID : string,  
  phoneNumber: string, (Required)  
  emergencyContact: string,  
  nationality : string,  
  address : Address     
}

Host{  
  placeType : number, (Required)  
  description : number, (Required)  
  privacy : number, (Required)  
  guests : number, (Required, NotNullable)  
  beds : number, (Required, NotNullable)  
  bedrooms : number, (Required)  
  bathrooms : number, (Required, NotNullable)  
  privateBathrooms : boolean, (Required)  
  standoutAmenities : [string], (Required)  
  guestFavorites : [string], (Required)  
  safetyItems: [string], (Required)  
  photos: [string], (Required, Min(5))  
  title: [string], (Required)  
  highlights: [string], (Required, Max(2))  
  description: string, (Required)  
  price: number, (Required)  
  odds: [boolean], (Required, lenght(3))  

  address: Address, (Required)  
}  

Address {  
  street : string, (Required)  
  references : string,  
  city : string, (Required)  
  state : string, (Required)  
  zipCode : string, (Required)  
  country : string, (Required)   

}  




