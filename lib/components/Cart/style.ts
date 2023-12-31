import styled from "styled-components";
import { colors, breakpoints } from "@/lib/utils";

export const CartButton = styled.button`
  border: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  color: #ececec;
  background-color: ${colors.primary};
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;

  &:focus-visible {
    outline: 3px solid ${colors.secondary};
  }

  &:hover {
    filter: brightness(85%);
  }
`;

interface IContainer {
  isOpen: boolean;
}
export const Container = styled.div<IContainer>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }: IContainer) => (isOpen ? "0" : "-100%")};
  width: 100%;
  height: 100%;
  background-color: ${colors.primary};
  box-sizing: border-box;
  z-index: 99;

  transition: right 0.2s;

  ${CartButton} {
    left: ${({ isOpen }: IContainer) => (isOpen ? "0" : "-50px")};
    background-color: ${({ isOpen }: IContainer) =>
      isOpen ? colors.black : colors.primary};
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
    width: 450px;
    right: ${({ isOpen }: IContainer) => (isOpen ? "0" : "-450px")};

    ${CartButton} {
      left: -50px;
    }
  }
`;

export const CartQuantity = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  color: #0c0b10;
  font-weight: bold;
  font-size: 0.7em;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  background-color: ${colors.secondary};
  position: absolute;
  bottom: 0;
  right: 5px;
`;

export const CartContent = styled.div`
  height: 100%;
  overflow-y: scroll;

  /* MAC scrollbar para desktop*/
  @media screen and (min-width: 640px) {
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #0c0b10;
    }
  }
`;

export const Sub = styled.p`
  width: 20%;
  color: #5b5a5e;
  vertical-align: middle;
  display: inline-block;
`;

export const SubPrice = styled.div`
  width: 80%;
  text-align: right;
  color: #5b5a5e;
  vertical-align: middle;
  display: inline-block;
`;

export const SubPriceValue = styled.p`
  color: ${colors.secondary};
  font-size: 22px;
  margin: 0;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  border: 0;
  color: #ececec;
  text-transform: uppercase;
  background-color: #0c0b10;
  text-align: center;
  padding: 15px 0;
  margin-top: 40px;
  cursor: pointer;
  outline: none;

  transition: background-color 0.2s;

  &:focus-visible {
    outline: 3px solid ${colors.secondary};
  }

  &:hover {
    background-color: #000;
  }
`;

export const DisabledCheckoutButton = styled.button`
  width: 100%;
  border: 0;
  color: #ececec;
  text-transform: uppercase;
  background-color: #0c0b10;
  text-align: center;
  padding: 15px 0;
  margin-top: 40px;
  outline: none;
  cursor: default;

  transition: background-color 0.2s;
  opacity: 0.5;
`;

export const CartFooter = styled.div`
  box-sizing: border-box;
  padding: 5%;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  z-index: 2;
  background-color: ${colors.primary};

  &::before {
    content: "";
    width: 100%;
    height: 20px;
    display: block;
    position: absolute;
    top: -20px;
    left: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
  }
`;
