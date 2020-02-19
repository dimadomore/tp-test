import React, { useRef } from 'react';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';

import { getColor } from './helpers';

import useDimensions from './hooks/use-width';
interface IApp {
  bgColor?: string;
  textColor?: string;
  btnColor?: string;
}

const App: React.FC<IApp> = ({ bgColor, textColor, btnColor }) => {
  const [ref, containerWidth] = useDimensions();

  console.log('width:', containerWidth);

  return (
    <Container bgColor={bgColor} ref={ref}>
      <Text color={textColor}>Where does it come from? Why do we use it?</Text>
      <Flex>
        <SmallText color={textColor}>
          It is a long established fact that a reader will be distracted by the readable content of
          a page when looking at its layout.
        </SmallText>
        <div>
          <DatePicker />
        </div>
        <div>
          <DatePicker />
        </div>
        <Button bgColor={btnColor}>Search</Button>
      </Flex>
    </Container>
  );
};

export default App;

const Container = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => getColor('#4a90e2', bgColor)};
  max-width: 1024px;
  min-width: 200px;
  padding: 3px 20px 15px;
  color: #ffffff;
  width: 100%;

  .react-date-picker {
    width: 100%;
  }
`;

const Flex = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 749px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Text = styled.div<{ color?: string }>`
  color: ${({ color }) => color ?? '#ffffff'};
  line-height: 33px;
  font-size: 24px;
`;

const SmallText = styled.div<{ color?: string }>`
  color: ${({ color }) => getColor('#ffffff', color)};
  line-height: 14px;
  font-size: 10px;
`;

const Button = styled.button<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => getColor('#f5a623', bgColor)};
  border-radius: 2px;
  text-transform: uppercase;
  height: 40px;
  min-height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 20px;
  color: inherit;
  border: 0;
  padding: 0;
  box-shadow: inset 0px - 2px 0px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;

  :active {
    box-shadow: inset 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
    padding-top: 1px;
  }
`;
