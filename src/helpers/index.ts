export { translate } from './i18n';

export const isColor = (strColor: string): boolean => {
  var s = new Option().style;
  s.color = strColor;
  return s.color !== '';
};

export const getColor = (defaultColor: string, strColor?: string) => {
  if (strColor) {
    return isColor(strColor) ? strColor : defaultColor;
  }
  return defaultColor;
};

export const getNodeWidth = (node: HTMLElement): number => node.getBoundingClientRect().width;

// format dd.mm.yyyy
export const formatDate = (date: Date) => {
  let dd: number | string = date.getDate();
  let mm: number | string = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${dd}.${mm}.${yyyy}`;
};

export const addEnternalFontLink = () => {
  const link = document.createElement('link');
  const fontLink = 'https://fonts.googleapis.com/css?family=Open+Sans:600&display=swap';

  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', fontLink);
  document.head.appendChild(link);
};

// using pixels
export const widgetContainerBreakpoints = {
  md: 902,
  sm: 710,
  xs: 430,
};

export const media = {
  mediumOnly: `@media (max-width: ${widgetContainerBreakpoints.md}px) and (min-width: ${widgetContainerBreakpoints.sm}px)`,
  smallOnly: `@media (max-width: ${widgetContainerBreakpoints.sm}px) and (min-width: ${widgetContainerBreakpoints.xs}px)`,
  small: `@media (max-width: ${widgetContainerBreakpoints.sm}px)`,
  extraSmall: `@media (max-width: ${widgetContainerBreakpoints.xs}px)`,
};
