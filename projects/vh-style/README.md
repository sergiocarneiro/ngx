# [ngx-vh-style](https://github.com/sergiocarneiro/ngx-vh-style)

[![npm version](https://badge.fury.io/js/ngx-vh-style.svg)](https://www.npmjs.com/package/ngx-vh-style)

*ngx-vh-style* is an angular directive that allows to apply viewport height (VH) values in pixels, ensuring maximum browser compatibility.

```html
<div vhStyle='max-height: 100vh'></div>
```


## Purpose

Viewport height is usually referred to as the window's inner height in %.

However, browsers such as Chrome Mobile make their toolbar height count towards the viewport height, making the inner height inaccessible through CSS if the element is not relatively parented to the body — which can happen when using frameworks like [Ionic](http://ionicframework.com).


## Dependencies

Latest version available for each version of Angular

| ngx-vh-style | Angular     |
| ------------ | ----------- |
| current      | >= 12.x     |


## Installation

Install via npm:
```
npm install --save ngx-vh-style
```

Import the `VhStyleModule`:
```js
import { VhStyleModule } from 'ngx-vh-style';

@NgModule({
  imports: [
    VhStyleModule
  ]
})
```


## Usage
Simply write the CSS styles as you normally would with the style attribute.

```html
<div vhStyle='max-height: 100vh'></div>
```


## Features

## Multi-property

```html
<div vhStyle='min-height: 50vh; max-height: 100vh'></div>
```

## Multi-value

```html
<div vhStyle='background-size: 50vh 50vh'></div>
```

## Non-vh values

```html
<div vhStyle='background-size: 500px 50vh'></div>
```



## Known Limitations

### Media Queries

Media queries are currently not supported.
