import styled from 'styled-components';

import { getColor } from '../../helpers';

export default styled.button<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => getColor('#f5a623', bgColor)};
  border-radius: 2px;
  text-transform: uppercase;
  height: 40px;
  min-height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 20px;
  border: 0;
  padding: 0;
  color: #ffffff;
  box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;

  :active {
    box-shadow: inset 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
    padding-top: 1px;
  }
`;