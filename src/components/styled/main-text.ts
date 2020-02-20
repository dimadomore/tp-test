import styled from 'styled-components';

export default styled.div<{ color?: string }>`
  color: ${({ color }) => color ?? '#ffffff'};
  line-height: 33px;
  font-size: 24px;
  padding-bottom: 10px;
`;
