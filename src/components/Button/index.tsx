import styled from "styled-components";

const Button = styled.button`
  height: 48px;
  padding: 0 40px;

  border: none;
  border-radius: 24px;
  background: #1db954;
  color: #fff;
  font-size: 24px;
  font-weight: 800;

  outline: none;

  &:hover {
    transform: scale(1.05) perspective(1px);
  }

  &:active {
    background: #1db95499;
    transform: scale(0.95) perspective(1px);
  }
`;

export default Button;
