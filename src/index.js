import assign from 'object-assign';

const truthy = x => x;

export default theme => (key, ...names) => {
  const styles = names
    .map(name => {
      return theme[name]
    })
    .filter(truthy);

  return typeof styles[0] === 'string' ?
    { key, className: styles.join(' ') } :
    { key, style: assign({}, ...styles) };
};

export const autokey = (fnc) => {
  let autoKey = 1
  return (...names) => fnc(autoKey++, ...names)
}
