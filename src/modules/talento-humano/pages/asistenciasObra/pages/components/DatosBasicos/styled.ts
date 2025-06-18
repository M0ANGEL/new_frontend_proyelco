import { Form } from "antd";
import styled from "styled-components";

export const SearchBar = styled(Form.Item)`
  input {
    border: 1px solid rgb(249 175 17);
    ::placeholder {
      color: grey;
    }
  }
`;
