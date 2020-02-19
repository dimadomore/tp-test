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

export { getColor, getNodeWidth };
