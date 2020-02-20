import styled from 'styled-components';

import { getColor } from '../../helpers';

export default styled.div<{ color?: string }>`
  color: ${({ color }) => getColor('#ffffff', color)};
  line-height: 14px;
  font-size: 10px;
`;
