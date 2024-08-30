import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() classes: string = '';
  @Input() isPrimary: boolean = false;
  @Input() icon?: IconDefinition;
  // @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  // onClick(): void {
  //   this.clickEvent.emit();
  // }
}
