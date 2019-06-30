import { Component, OnInit } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

// An enum for the amounts of content that we can have
enum ContentSize {
  small,
  medium,
  large
};

@Component({
  selector: 'app-expandable-content',
  templateUrl: './expandable-content.component.html',
  styleUrls: ['./expandable-content.component.scss'],
  animations: [
    trigger('openCloseButton', [
      state('closed', style({
        'border-radius': '0.5rem'
      })),
      state('open', style({
        'border-radius': '0.5rem 0.5rem 0 0'
      })),
      transition('open => closed', [
        // Delay 0.5s for content close animation to mostly complete,
        animate('0.3s 0.3s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('openCloseContent', [
      state('closed', style({
        height: '0px',
        'display': 'none',
        'padding-top': '0',
        'padding-bottom': '0'
      })),
      state('open', style({
        height: '*' // pull height from runtime so we use content size
      })),
      transition('open => closed', [
        animate('0.5s ease-in-out', keyframes([
          style({ display: 'block', offset: 0 }),
          style({ height: 0, offset: 1 }),
          style({ 'padding-top': 0, offset: 1 }),
          style({ 'padding-bottom': 0, offset: 1 }),
          style({ display: 'none', offset: 1 })
        ]))
      ]),
      transition('closed => open', [
        animate('0.5s ease-in-out', keyframes([
          style({ display: 'block', offset: 0 }),
          style({ height: '*', offset: 1 }),
          style({ 'padding-top': '*', offset: 1 }),
          style({ 'padding-bottom': '*', offset: 1 }),
          style({ display: 'block', offset: 1 })
        ]))
      ]),
    ])
  ]
})
export class ExpandableContentComponent implements OnInit {
  private readonly ContentSize = ContentSize;

  private isOpen: boolean;
  private contentAmount: ContentSize;

  constructor() { }

  ngOnInit() {
    this.isOpen = false;
    this.contentAmount = ContentSize.medium;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Sets the amount of content being displayed, based on the ContentSize enum.
   *
   * @param amount The amount of content to show.
   */
  changeContent(amount: ContentSize) {
    this.contentAmount = amount;
  }
}
