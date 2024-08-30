import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Property } from '../../types'; // Import your Property type
import { Router } from '@angular/router';
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { PropertyComponent } from '../property/property.component';
import { InputComponent } from '../input/input.component';
import { PropertySkeletonComponent } from '../property-skeleton/property-skeleton.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    InputComponent,
    FontAwesomeModule,
    CommonModule,
    ButtonComponent,
    PropertyComponent,
    PropertySkeletonComponent,
  ],
})
export class HomeComponent implements OnInit {
  filters: string[] = [
    'All',
    'Apartments',
    'Flats',
    'SF Homes',
    'Duplexes',
    'Homes',
    'Bungalows',
    'Villas',
    'Townhouses',
    'Condos',
    'Lofts',
    'Cabins',
    'Studios',
    'Penthouses',
    'Commercial Properties',
    'Land',
    'New Developments',
    'Vacation Rentals',
    'Luxury Properties',
    'Affordable Housing',
    'Senior Living',
    'Student Housing',
  ];

  selectedFilter: string = 'All';
  faSearch = faMagnifyingGlass;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faPlus = faPlus;
  @ViewChild('filterList') filterList!: ElementRef;

  properties: Property[] = []; // Array to hold properties
  isLoading = false;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;
  totalPages = 0;
  pageNumbers: number[] = []; // Array to hold page numbers
  skeletonArray = new Array(5);

  constructor(
    private propertiesService: PropertiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties(): void {
    this.isLoading = true;
    this.propertiesService
      .getProperties(this.currentPage, this.itemsPerPage, this.selectedFilter)
      .subscribe({
        next: (data) => {
          this.properties = data.properties;
          this.totalItems = data.totalCount;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.pageNumbers = this.getPageNumbers();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching properties:', error);
        },
      });
  }

  getPageNumbers(): number[] {
    const pages = [];
    const total = this.totalPages;
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.currentPage = 1; // Reset to first page on filter change
    this.fetchProperties();
  }

  scrollFilters(direction: 'left' | 'right') {
    const container = this.filterList.nativeElement;
    const scrollAmount = 100; // Adjust scroll amount as needed
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchProperties();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProperties();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchProperties();
  }
}
