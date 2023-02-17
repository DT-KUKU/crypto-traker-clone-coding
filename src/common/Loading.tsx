import styled, { keyframes } from "styled-components";

const loadingFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* display: flex;
  justify-content: center; */
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid ${(props) => props.theme.textColor}; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation: ${loadingFrame} 1.5s linear infinite;
`;

function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
