import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
} from '@angular/core';

/**
 * Applies viewport height (VH) values in pixels, ensuring maximum browser compatibility.
 *
 * *\* Browsers such as Chrome Mobile make their toolbar height count towards the viewport height,
 * making the inner height inaccessible through CSS if the element is not relatively parented to the body.*
 */
@Directive({
  selector: '[vhStyle]',
})
export class VhStyleDirective implements OnInit {
  // #region Fields
  @Input('vhStyle') properties!: string;
  // #endregion

  // #region Properties
  public get vhInPx() {
    return Math.min(
      document.body.clientHeight,
      window.innerHeight || document.documentElement.clientHeight
    );
  }
  // #endregion

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  // #region Lifecycle
  ngOnInit() {
    this.apply();
  }
  // #endregion

  // #region Events
  @HostListener('window:resize')
  onWindowResize() {
    this.apply();
  }
  // #endregion

  /**
   * Apply the converted VH size to the properties.
   */
  apply() {
    //TODO Support media queries: https://www.w3schools.com/howto/howto_js_media_queries.asp

    this.properties
      // Find each property by spliting by semicolon
      .split(';')
      // Remove empty entries
      .filter((property) => property.length > 0)
      // Remove leading and trailing spaces
      .map((property) => property.trim())
      // Iterate through each property
      .forEach((property: string) => {
        const el = this.element.nativeElement as HTMLElement;
        const propertyName: string = property
          .substring(0, property.indexOf(':'))
          .split(' ')
          .join();
        const propertyValues: string[] = property
          .substring(property.indexOf(':') + 1)
          .split(' ');

        let outputValue = '';

        // Convert each VH value of the property — properties such as `background-size` can have multiple values
        propertyValues
          .filter((value: string) => value.length > 0)
          .forEach((value: string) => {
            // Add space
            if (outputValue.length > 0) {
              outputValue += ' ';
            }

            // Is a VH value
            if (value.endsWith('vh')) {
              outputValue +=
                this.vhInPx * Number(value.substr(0, value.length - 2)) * 0.01 +
                'px';
            } else {
              outputValue += value;
            }
          });

        // Apply
        this.renderer.setStyle(el, propertyName, outputValue);
      });
  }
}
