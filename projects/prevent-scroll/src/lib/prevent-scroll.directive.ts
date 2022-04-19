import {
  Directive,
  ElementRef,
  Input,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[preventScroll]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
    '(touchstart)': 'onEnter()',
    '(touchend)': 'onLeave()',
  },
})
/**
 * Prevents an element from scrolling whenever the user is making actions
 * within the element where this directive was applied.
 */
export class PreventScrollDirective implements AfterViewChecked, OnChanges {
  /**
   * The id of the element to prevent scroll when this element is focused.
   *
   * Can be empty, and if so, the target will be the element itself.
   *
   * **Special ID's:** `body`
   */
  @Input() preventScroll!: string;

  private element: HTMLElement;
  private target: HTMLElement | null = null;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngAfterViewChecked() {
    if (!this.target) {
      this.updateTarget();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['preventScroll']) {
      this.updateTarget();
    }
  }

  private onEnter()
  {
    if (!this.target) return;

    this.target.style.overflow = 'hidden';
  }

  private onLeave() {
    // Touch scrolls propagate after the touch ends, so wait a little to re-enable scroll
    setTimeout(() =>
    {
      if (!this.target) return;

      this.target.style.overflow = 'auto';
    }, 300);
  }

  private updateTarget() {
    // Self
    if (!this.preventScroll) {
      this.target = this.element;
    }
    // Body
    else if (this.preventScroll == 'body') {
      this.target = document.body;
    }
    // Specific ID
    else {
      this.target = document.getElementById(this.preventScroll);
    }
  }
}
