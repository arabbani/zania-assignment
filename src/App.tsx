import "@mantine/core/styles.css";

import { Container, MantineProvider } from "@mantine/core";
import { Home } from "./Home";

function App() {
  return (
    <MantineProvider>
      <Container>
        <Home />
      </Container>
    </MantineProvider>
  );
}

export default App;
