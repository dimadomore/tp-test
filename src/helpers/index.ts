const isColor = (strColor: string): boolean => {
  var s = new Option().style;
  s.color = strColor;
  return s.color !== '';
};

const getColor = (defaultColor: string, strColor?: string) => {
  if (strColor) {
    return isColor(strColor) ? strColor : defaultColor;
  }
  return defaultColor;
};

const getNodeWidth = (node: HTMLElement): number => node.getBoundingClientRect().width;

// format dd.mm.yyyy
const formatDate = (date: Date) => {
  let dd: number | string = date.getDate();
  let mm: number | string = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${dd}.${mm}.${yyyy}`;
};

const addFontLink = () => {
  const link = document.createElement('link');
  const fontLink = 'https://fonts.googleapis.com/css?family=Open+Sans:600&display=swap';

  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', fontLink);
  document.head.appendChild(link);
};

export { getColor, getNodeWidth, formatDate, addFontLink };
