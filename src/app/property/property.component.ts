import { Component, Input } from '@angular/core';
import { Property } from '../../types';
import {
  faCertificate,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  @Input() property!: Property;

  faLocationDot = faLocationDot;
  faCertificate = faCertificate;

  constructor(private router: Router) {}

  navigateToProperty(propertyId: string): void {
    this.router.navigate(['/properties', propertyId]);
  }
}
