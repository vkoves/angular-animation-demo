import { Component, OnInit } from '@angular/core';
import {
  animate,
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
    trigger('openClose', [
      transition('open <=> closed', [
        animate('0.5s ease-in-out')
      ]),
      state('closed', style({
        height: '0px',
        'padding-top': '0px',
        'padding-bottom': '0px'
      })),
      state('open', style({
        height: '500px'
      }))
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
