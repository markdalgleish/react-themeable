import { CSSProperties } from 'react';

export type ClassThemeDefinition<K extends string> = { [k in K]: string };
export type StyleThemeDefinition<K extends string> = { [k in K]: CSSProperties };
export type ThemeDefinition<K extends string> = ClassThemeDefinition<K> | StyleThemeDefinition<K>;

export type ClassNameDecorator<T> = (...styles: T[]) => string;

type FalsyValues = null | undefined | false | '' | 0;
export type Themeable<K> = (key: number, ...names: (K | FalsyValues)[]) => { key: number, style?: CSSProperties, className?: string };

const defaultClassNameDecorator: ClassNameDecorator<string> = (...styles) => styles.join(' ');

const isStringArray = (array: unknown[]): array is string[] => typeof array[0] === 'string';

function themeable<ThemeNames extends string, Definition extends ClassThemeDefinition<ThemeNames>>(
  theme: Definition,
  classNameDecorator?: ClassNameDecorator<string>,
): Themeable<ThemeNames>;

function themeable<ThemeNames extends string, Definition extends StyleThemeDefinition<ThemeNames>>(
  theme: Definition,
  classNameDecorator?: ClassNameDecorator<CSSProperties>,
): Themeable<ThemeNames>;

function themeable<ThemeNames extends string, Definition extends ThemeDefinition<ThemeNames>>(
  theme: Definition,
  classNameDecorator?: Definition extends StyleThemeDefinition<ThemeNames> ? ClassNameDecorator<CSSProperties> : ClassNameDecorator<string>,
): Themeable<ThemeNames> {
  const effectiveDecorator = (classNameDecorator || defaultClassNameDecorator) as ClassNameDecorator<CSSProperties | string>;

  return (key, ...names) => {
    const styles: Definition[ThemeNames][] = names
      .map(name => name ? theme[name] : false)
      .filter((value): value is Definition[ThemeNames] => Boolean(value));

    return isStringArray(styles) || classNameDecorator
      ? { key, className: effectiveDecorator(...styles) }
      : { key, style: Object.assign({}, ...styles) };
  };
}

export default themeable;
