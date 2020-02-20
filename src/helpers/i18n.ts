interface ITranlations {
  [locale: string]: {
    [text: string]: string;
  };
}

const translations: ITranlations = {
  'en-GB': {
    'Where does it come from? Why do we use it?': 'Where does it come from? Why do we use it?',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.':
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    'Depart date': 'Depart date',
    'Return date': 'Return date',
    Search: 'Search',
  },
  // other locales
};

const translate = (locale: 'en-GB') => (text: string): string => {
  return (translations[locale] && translations[locale][text]) || text;
};

export { translate };
