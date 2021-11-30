Personally, I've never used Airbnb, so the description I am making here may not be the most accuraty one, feel free to give me tips on how to improve

Account {  
  user : User, (Required)  
  linkedAccounts : [string], (Required)  
  deviceHistory : [device], (Required)  
  paymentMethods : [payments], (Required)  
  active : boolean (Required)  

}  
User {  
  firstName : string, (Required)  
  gender : string, (Required)  
  birthDate : Date, (Required)  
  email: string, (Required)  
  governmentID : string,  
  phoneNumber: string, (Required)  
  emergencyContact: string,  
  nationality : string,  
  address : Address  
  hostingId : string,  
}

Host{
  placeType : number, (Required)  
  description : number, (Required)  
  privacy : number, (Required)  
  address: Address, (Required)  
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
}  

Address {  
  street : string, (Required)  
  references : string,  
  city : string, (Required)  
  state : string, (Required)  
  zipCode : string, (Required)  
  country : string, (Required)   

}  




