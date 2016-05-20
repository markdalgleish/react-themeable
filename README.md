[![Build Status](https://img.shields.io/travis/markdalgleish/react-themeable/master.svg?style=flat-square)](http://travis-ci.org/markdalgleish/react-themeable) [![Coverage](https://img.shields.io/codecov/c/github/markdalgleish/react-themeable/master.svg?style=flat-square)](https://codecov.io/github/markdalgleish/react-themeable) [![npm](https://img.shields.io/npm/v/react-themeable.svg?style=flat-square)](https://www.npmjs.com/package/react-themeable)

# react-themeable

Utility for making React components easily themeable.

**This project is still experimental, so feedback from component authors would be greatly appreciated!**

## Why?

The React community is highly fragmented when it comes to styling. How do we write components that can happily co-exist with all of these competing approaches?

With react-themeable, you can support custom themes provided by [CSS Modules](https://github.com/css-modules/css-modules), [Radium](http://projects.formidablelabs.com/radium/), [Aphrodite](https://github.com/Khan/aphrodite), [React Style](https://github.com/js-next/react-style), [JSS](https://github.com/jsstyles/jss), global CSS or inline styles as easily as this:

```js
<MyComponent theme={theme} />
```

## Install

`npm install --save react-themeable`

## Usage

`react-themeable` exposes just a single function.

This function is designed to accept a `theme` prop inside of your `render` method. This then returns a small helper function that accepts a key and a series of style names.

```js
const theme = themeable(this.props.theme);
...
<div {...theme(key, ...styleNames)} />
```

*Note: A unique key for each themed element is required for [Radium](http://projects.formidablelabs.com/radium/) to work correctly.*

This helper function detects whether a theme is class or style based, and creates the appropriate attributes for you.

For example:

```js
import React, { Component } from 'react';
import themeable from 'react-themeable';

class MyComponent extends Component {
  render() {
    const theme = themeable(this.props.theme);

    return (
      <div {...theme(1, 'root')}>
        <div {...theme(2, 'foo', 'bar')}>Foo Bar</div>
        <div {...theme(3, 'baz')}>Baz</div>
      </div>
    );
  }
}
```

A theme can now be passed to your component like so:

### CSS Modules

```css
.foo { color: red; }
.foo:hover { color: green; }
.bar { color: blue; }
```

```js
import theme from './MyComponentTheme.css';
...
<MyComponent theme={theme} />
```

### Radium

```js
import Radium from 'radium';

const theme = {
  foo: {
    color: 'red',
    ':hover': {
      color: 'green'
    }
  },
  bar: {
    color: 'blue'
  }
};

const ThemedMyComponent = Radium(MyComponent);
...
<ThemedMyComponent theme={theme} />
```

### Aphrodite

```js
import { StyleSheet, css } from 'aphrodite';

const theme = StyleSheet.create({
  foo: {
    color: 'red',
    ':hover': {
      color: 'green'
    }
  },
  bar: {
    color: 'blue'
  }
});
...
<MyComponent theme={[ theme, css ]} />
```

### React Style

```js
import StyleSheet from 'react-style';

const theme = StyleSheet.create({
  foo: {
    color: 'red'
  },
  bar: {
    color: 'blue'
  }
});
...
<MyComponent theme={theme} />
```

### JSS

```js
import jss from 'jss';

const sheet = jss.createStyleSheet({
  foo: {
    color: 'red'
  },
  bar: {
    color: 'blue'
  }
}).attach();
...
<MyComponent theme={sheet.classes} />
```

### Global CSS

```css
.MyComponent__foo { color: red; }
.MyComponent__foo:hover { color: green; }
.MyComponent__bar { color: blue; }
```

```js
const theme = {
  foo: 'MyComponent__foo',
  bar: 'MyComponent__bar'
};
...
<MyComponent theme={theme} />
```

### Inline styles

```js
const theme = {
  foo: {
    color: 'red'
  },
  bar: {
    color: 'blue'
  }
};
...
<MyComponent theme={theme} />
```

## License

[MIT](http://markdalgleish.mit-license.org)
