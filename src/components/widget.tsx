import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { DatePicker, MainText, SecondaryText, SubmitButton } from '.';
import { useContainerWidth, useWindowWidth } from '../hooks';
import { getColor, translate, widgetContainerBreakpoints, formatDate, media } from '../helpers';

interface IApp {
  bgColor?: string;
  textColor?: string;
  btnColor?: string;
  locale?: 'en-GB';
}

const Widget: React.FC<IApp> = ({ bgColor, textColor, btnColor, locale = 'en-GB' }) => {
  const [ref, containerWidth] = useContainerWidth();
  const width = useWindowWidth();

  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const t = translate(locale);

  const handleDepartDateChange = useCallback((date: Date) => {
    setDepartDate(date);
  }, []);

  const handleReturnDateChange = useCallback((date: Date) => {
    setReturnDate(date);
  }, []);

  const sendFormRequest = (departDate: string, returnDate: string) => {
    console.log(departDate, returnDate);
  };

  const handleSubmit = useCallback(() => {
    if (departDate && returnDate) {
      sendFormRequest(formatDate(departDate), formatDate(returnDate));
    }
  }, [departDate, returnDate]);

  const responsiveClassName = useMemo(() => {
    if (containerWidth) {
      if (containerWidth <= widgetContainerBreakpoints.xs) return 'xs';
      if (containerWidth <= widgetContainerBreakpoints.sm) return 'sm';
      if (containerWidth <= widgetContainerBreakpoints.md) return 'md';
    }
    return '';
  }, [containerWidth]);

  return (
    <Wrapper windowWidth={width}>
      <Container bgColor={bgColor} ref={ref} className={responsiveClassName}>
        <MainText color={textColor}>{t('Where does it come from? Why do we use it?')}</MainText>
        <GridContainer className={responsiveClassName}>
          <SecondaryText color={textColor}>
            {t(
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
            )}
          </SecondaryText>
          <DatePicker
            value={departDate}
            onChange={handleDepartDateChange}
            placeholder={t('Depart date')}
            maxDate={returnDate}
            locale={locale}
          />
          <DatePicker
            value={returnDate}
            onChange={handleReturnDateChange}
            placeholder={t('Return date')}
            minDate={departDate}
            locale={locale}
          />
          <SubmitButton onClick={handleSubmit} bgColor={btnColor}>
            {t('Search')}
          </SubmitButton>
        </GridContainer>
      </Container>
    </Wrapper>
  );
};

export default Widget;

/* Styled components
   =========================================================================== */
const Wrapper = styled.div<{ windowWidth: number }>`
  width: 100%;
  max-width: ${({ windowWidth }) => windowWidth}px;
`;
const Container = styled.div<{ bgColor?: string }>`
  box-sizing: border-box !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-family: Open Sans, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif;
  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit !important;
  }

  background-color: ${({ bgColor }) => getColor('#4a90e2', bgColor)};
  max-width: 1024px;
  min-width: 200px;
  padding: 0px 20px 15px;
  width: 100%;
  padding-top: 2px;

  &.md {
    padding-top: 3px;
  }
  &.sm,
  &.xs {
    padding-top: 10px;

    ${MainText} {
      font-size: 18px;
      line-height: 24px;
    }
  }
  &.xs {
    ${MainText} {
      padding-bottom: 15px;
    }
  }

  .react-date-picker {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  &.md {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'secondary-text secondary-text secondary-text'
      'input1 input2 button';

    ${SecondaryText} {
      grid-area: secondary-text;
      margin-bottom: -5px;
    }

    ${SubmitButton} {
      margin-left: 8px;
      width: 96%;
    }
  }
  &.sm {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'secondary-text secondary-text'
      'input1 input2'
      'button button';
    ${SecondaryText} {
      margin-bottom: -5px;
    }
  }
  &.xs {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    grid-template-areas:
      'input1'
      'input2'
      'button'
      'secondary-text';
  }

  &.sm,
  &.xs {
    ${SecondaryText} {
      grid-area: secondary-text;
    }

    ${SubmitButton} {
      grid-area: button;
    }
  }

  /* ${media.mediumOnly} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'secondary-text secondary-text secondary-text'
      'input1 input2 button';

    ${SecondaryText} {
      grid-area: secondary-text;
      margin-bottom: -5px;
    }

    ${SubmitButton} {
      margin-left: 8px;
      width: 96%;
    }
  }
  ${media.small} {
    ${SecondaryText} {
      grid-area: secondary-text;
    }

    ${SubmitButton} {
      grid-area: button;
    }
  }
  ${media.smallOnly} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'secondary-text secondary-text'
      'input1 input2'
      'button button';
    ${SecondaryText} {
      margin-bottom: -5px;
    }
  }

  ${media.extraSmall} {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    grid-template-areas:
      'input1'
      'input2'
      'button'
      'secondary-text';
  } */
`;
