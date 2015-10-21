import assign from 'object-assign';

const truthy = x => x;

export default (theme, { namespace } = {}) => (key, ...names) => {
  const styles = names
    .map(name => theme[name] || (namespace ? theme[`${namespace}${name}`] : null))
    .filter(truthy);

  return typeof styles[0] === 'string' ?
    { key, className: styles.join(' ') } :
    { key, style: assign({}, ...styles) };
};
