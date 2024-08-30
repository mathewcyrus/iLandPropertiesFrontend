import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe: 'events';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Property {
  property_id: string;
  property_type: string;
  property_description: string;
  property_price: number;
  property_location: string;
  property_age: number;
  date_posted: string;
  property_owner: string;
  property_owner_name: string;
  thumbnail: string;
  images: [string];
}

// src/app/models/user.model.ts
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string; // Optional if not always present
  email: string;
  // Add other fields if needed
}
