import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { DatePicker, MainText, SecondaryText, SubmitButton } from '.';
import useDimensions from '../hooks/use-width';
import { getColor } from '../helpers';

interface IApp {
  bgColor?: string;
  textColor?: string;
  btnColor?: string;
}

const Widget: React.FC<IApp> = ({ bgColor, textColor, btnColor }) => {
  const [ref, containerWidth] = useDimensions();
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const handleDepartDateChange = useCallback((date: Date) => {
    setDepartDate(date);
  }, []);

  const handleReturnDateChange = useCallback((date: Date) => {
    setReturnDate(date);
  }, []);

  const responsiveClassName = useMemo(() => {
    if (containerWidth) {
      if (containerWidth > 902) return 'lg';
      if (containerWidth > 710) return 'md';
      if (containerWidth > 430) return 'sm';
      return 'xs';
    }
    return '';
  }, [containerWidth]);

  return (
    <Container bgColor={bgColor} ref={ref} className={responsiveClassName}>
      <MainText color={textColor}>Where does it come from? Why do we use it?</MainText>
      <GridContainer className={responsiveClassName}>
        <SecondaryText color={textColor}>
          It is a long established fact that a reader will be distracted by the readable content of
          a page when looking at its layout.
        </SecondaryText>
        <DatePicker
          value={departDate}
          onChange={handleDepartDateChange}
          placeholder="Depart date"
          maxDate={returnDate}
        />
        <DatePicker
          value={returnDate}
          onChange={handleReturnDateChange}
          placeholder="Return date"
          minDate={departDate}
        />
        <SubmitButton bgColor={btnColor}>Search</SubmitButton>
      </GridContainer>
    </Container>
  );
};

export default Widget;

/* Styled components
   =========================================================================== */
const Container = styled.div<{ bgColor?: string }>`
  box-sizing: border-box;
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
    box-sizing: inherit;
  }

  background-color: ${({ bgColor }) => getColor('#4a90e2', bgColor)};
  max-width: 1024px;
  min-width: 200px;
  padding: 0px 20px 15px;
  width: 100%;

  &.lg {
    padding-top: 2px;
  }
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

  &.lg {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
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
`;
