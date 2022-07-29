export interface User{
    "id": number,
    "username": string,
    "password": string,
    "role": string,
    "master": {
      "id": number,
      "name": string,
      "surname": string,
      "phone_number": string,
      "email": string,
      "embg": number,
      "gender": string,
      "type": string,
      "status": string,
      "city": {
        "id": number,
        "name": string
      }
    }
    "client": {
      "id": number,
      "name": string,
      "surname": string,
      "email": string,
      "phone_number": string,
      "address": string,
      "gender": string
    },
    "enabled": boolean,
    "authorities": string[] ,
    "credentialsNonExpired": boolean,
    "accountNonExpired": boolean,
    "accountNonLocked": boolean
}
