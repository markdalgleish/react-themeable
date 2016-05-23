import assign from 'object-assign';

const truthy = x => x;

export default input => {
  const [ theme, classNameDecorator ] = Array.isArray(input) && input.length === 2 ?
    input :
    [ input, null ];

  return (key, ...names) => {
    const styles = names
      .map(name => theme[name])
      .filter(truthy);

    return typeof styles[0] === 'string' || typeof classNameDecorator === 'function' ?
      { key, className: classNameDecorator ? classNameDecorator(...styles) : styles.join(' ') } :
      { key, style: assign({}, ...styles) };
  };
};

export const autokey = (fnc) => {
  let autoKey = 1
  return (...names) => fnc(autoKey++, ...names)
}
