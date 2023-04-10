import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <>
      <Spinner size={90} />
    </>
  );
};

const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Spinner = styled(FiLoader)`
  animation: ${spin} 2s linear infinite;
  margin: 5% 0 0 47%;
`;

export default Loading;