import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "20px", fontSize: 12 })}
`;

function Announcements() {
  return (
    <div>
      <Container>50% off selected items! Click here</Container>
    </div>
  );
}

export default Announcements;
