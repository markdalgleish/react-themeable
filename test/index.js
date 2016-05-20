import themeable from '../src';
import { expect } from 'chai';

describe('className', () => {
  const classes = { foo: 'aaa', bar: 'bbb' };
  const classTheme = themeable(classes);

  it('should return a single class', () => {
    expect(classTheme(1, 'foo'))
      .to.deep.equal({
        key: 1,
        className: classes.foo
      });
  });

  it('should return multiple classes', () => {
    expect(classTheme(2, 'foo', 'bar'))
      .to.deep.equal({
        key: 2,
        className: `${classes.foo} ${classes.bar}`
      });
  });

  it('should ignore falsy values', () => {
    expect(classTheme(1, null, 'foo', undefined, false))
      .to.deep.equal({
        key: 1,
        className: classes.foo
      });
  });

});

describe('styles with classname decorator (e.g. Aphrodite)', () => {
  const classes = { foo: { color: 'red' }, bar: { color: 'blue' } };
  const colorsToString = (...styles) => styles.map(x => x.color).join(' ');
  const classTheme = themeable([classes, colorsToString]);

  it('should return a single class', () => {
    expect(classTheme(1, 'foo'))
      .to.deep.equal({
        key: 1,
        className: 'red'
      });
  });

  it('should return multiple classes', () => {
    expect(classTheme(2, 'foo', 'bar'))
      .to.deep.equal({
        key: 2,
        className: 'red blue'
      });
  });

  it('should ignore falsy values', () => {
    expect(classTheme(1, null, 'foo', undefined, false))
      .to.deep.equal({
        key: 1,
        className: 'red'
      });
  });

});

describe('style', () => {
  const styles = {
    foo: {
      color: 'red',
      fontSize: '16px'
    },
    bar: {
      color: 'blue',
      fontWeight: 'bold'
    }
  };
  const styleTheme = themeable(styles);

  it('should return a single style', () => {
    expect(styleTheme(1, 'foo'))
      .to.deep.equal({
        key: 1,
        style: {
          color: 'red',
          fontSize: '16px'
        }
      });
  });

  it('should return multiple styles merged', () => {
    expect(styleTheme(1, 'foo', 'bar'))
      .to.deep.equal({
        key: 1,
        style: {
          fontSize: '16px',
          color: 'blue',
          fontWeight: 'bold'
        }
      });
  });

  it('should ignore falsy values', () => {
    expect(styleTheme(1, false, undefined, 'foo', null))
      .to.deep.equal({
        key: 1,
        style: {
          color: 'red',
          fontSize: '16px'
        }
      });
  });

});
