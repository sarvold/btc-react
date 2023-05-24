import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 0.25rem solid rgba(0, 0, 0, 0.1);
  border-top-color: #007bff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: ${spin} 0.6s linear infinite;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const UiLoadingSpinner: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};
