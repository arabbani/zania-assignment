import "@mantine/core/styles.css";

import { Container, MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Container>
        <h1>Hello</h1>
      </Container>
    </MantineProvider>
  );
}

export default App;
