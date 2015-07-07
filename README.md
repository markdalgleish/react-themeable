# react-themeable

Utility for making React components easily themeable.

**This project is still experimental, so feedback from component authors would be greatly appreciated!**

## Why?

The React community is highly fragmented when it comes to styling. How do we write components that can happily co-exist with all of these competing approaches?

With react-themeable, you can support custom themes provided by [CSS Modules](https://github.com/css-modules/css-modules), [Radium](http://projects.formidablelabs.com/radium/), [React Style](https://github.com/js-next/react-style), or even plain old style objects as easily as this:

```js
<MyComponent theme={theme} />
```

## Install

`npm install --save react-themeable`

## Usage

`react-themeable` exposes just a single function.

This function is designed to accept a `theme` prop inside of your `render` method. This then returns a small helper function that accepts a key and a series of classes/style names.

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

### Plain style objects

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
