import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Property } from '../../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private apiUrl = 'http://127.0.0.1:8000/properties';

  constructor(private apiService: ApiService) {}

  getProperties(
    page: number = 1,
    limit: number = 10,
    filter?: string,
    exclude?: string
  ): Observable<{ properties: Property[]; totalCount: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filter && filter !== 'All') {
      params = params.set('filter', filter);
    }
    if (exclude) {
      params = params.set('excludePropertyId', exclude);
    }

    return this.apiService.get<{ properties: Property[]; totalCount: number }>(
      this.apiUrl,
      params
    );
  }

  getPropertyById(propertyId: string): Observable<Property> {
    return this.apiService.get<Property>(`${this.apiUrl}/${propertyId}`);
  }

  getPropertiesForALister(listerId: string): Observable<Property[]> {
    return this.apiService.get<Property[]>(
      `http://127.0.0.1:8000/user/${listerId}/properties`
    );
  }
}
