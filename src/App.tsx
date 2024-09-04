import "@mantine/core/styles.css";

import { Container, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Home } from "./components/Home";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Container>
          <Home />
        </Container>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
