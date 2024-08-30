import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAnglesLeft,
  faAnglesRight,
  faHeart,
  faImage,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Property } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../services/properties.service';
import { PropertyComponent } from '../property/property.component';
import { PropertySkeletonComponent } from '../property-skeleton/property-skeleton.component';
import { Subscription } from 'rxjs';
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareXTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-single-property',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    PropertyComponent,
    PropertySkeletonComponent,
  ],
  templateUrl: './single-property.component.html',
  styleUrl: './single-property.component.css',
})
export class SinglePropertyComponent implements OnInit, OnDestroy {
  images: string[] = [
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723534468/iLAndProperties/properties/aaron-huber-s95oB2n9jng-unsplash_k0spaz.jpg',
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723534467/iLAndProperties/properties/lotus-design-n-print-wRzBarqn3hs-unsplash_wiw4ui.jpg',
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723534457/iLAndProperties/properties/francesca-tosolini-XcVm8mn7NUM-unsplash_g5p5ba.jpg',
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723534468/iLAndProperties/properties/frames-for-your-heart-2d4lAQAlbDA-unsplash_n4rdle.jpg',
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723471338/iLAndProperties/properties/rafael-hoyos-weht-8PKGjZ2GzuQ-unsplash_dztinv.jpg',
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723534408/iLAndProperties/properties/StockCake-Futuristic_Apartment_Design_1723534329_rsiiwq.jpg',
    'https://res.cloudinary.com/dt75zlucp/image/upload/v1723534467/iLAndProperties/properties/lotus-design-n-print-wRzBarqn3hs-unsplash_wiw4ui.jpg',
  ];

  amenities: string[] = [
    'Water Supply',
    'Electricity',
    'Balcony',
    'Air Conditioning',
    'Heating',
    'Swimming Pool',
    'Gym/Fitness Center',
    'Garden/Yard',
    'Parking Space',
    'Security System',
  ];

  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faPhone = faPhone;
  faFacebook = faSquareFacebook;
  faInstagram = faSquareInstagram;
  faX = faSquareXTwitter;
  faheart = faHeart;

  faimage = faImage;
  isLoading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;
  totalPages = 0;
  pageNumbers: number[] = []; // Array to hold page numbers
  skeletonArray = new Array(5);
  property: Property | undefined;
  listerProperties: Property[] = [];
  similarProperties: Property[] = [];
  private routeSub: Subscription | undefined;
  private propertySub: Subscription | undefined;

  @ViewChild('imagesdiv') imagesdiv!: ElementRef;
  @ViewChild('amenitiesdiv') amenitiesdiv!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const propertyId = params.get('id');
      if (propertyId) {
        this.fetchProperty(propertyId);
      }
    });
  }

  fetchProperty(propertyId: string): void {
    this.isLoading = true;
    this.propertySub = this.propertiesService
      .getPropertyById(propertyId)
      .subscribe({
        next: (property) => {
          this.property = property;
          this.fetchPropertyByLister(property.property_owner);
          this.fetchSimilarProperties();
        },
        complete: () => (this.isLoading = false),
      });
  }

  fetchPropertyByLister(listerId: string): void {
    this.isLoading = true;
    this.propertiesService.getPropertiesForALister(listerId).subscribe({
      next: (properties) => {
        // Filter out the selected property
        this.listerProperties = properties.filter(
          (p) => p.property_id !== this.property?.property_id
        );
        this.isLoading = false;
      },
    });
  }

  fetchSimilarProperties(): void {
    if (this.property) {
      const propertyType = this.property.property_type;
      const excludedPropertyId = this.property.property_id;
      this.isLoading = true;
      this.propertiesService
        .getProperties(1, 5, propertyType, excludedPropertyId)
        .subscribe({
          next: (response) => {
            this.similarProperties = response.properties;
            this.totalItems = response.totalCount;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.pageNumbers = this.getPageNumbers();
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const total = this.totalPages;
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchSimilarProperties();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchSimilarProperties();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchSimilarProperties();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.routeSub?.unsubscribe();
    this.propertySub?.unsubscribe();
  }
}
