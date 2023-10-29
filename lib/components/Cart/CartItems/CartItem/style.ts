import styled from "styled-components";
import { colors } from "@/lib/utils";

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 5%;

  transition: background-color 0.2s, opacity 0.2s;

  &::before {
    content: "";
    width: 90%;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 5%;
  }
`;

export const Details = styled.div`
  width: 57%;
  display: inline-block;
  vertical-align: middle;
`;

export const Title = styled.p`
  color: #ececec;
  margin: 0;
`;

export const Desc = styled.p`
  color: #5b5a5e;
  margin: 0;
`;

export const Price = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: ${colors.secondary};
  text-align: right;
  width: 25%;
`;

export const ChangeQuantity = styled.button`
  color: #b7b7b7;
  border: 0;
  background-color: #000;
  width: 25px;
  height: 25px;

  &:focus-visible {
    outline: 3px solid ${colors.secondary};
  }

  &:disabled {
    opacity: 0.2;
  }
`;

export const ImageContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 45px;
  margin-right: 3%;
  position: relative;
`;
