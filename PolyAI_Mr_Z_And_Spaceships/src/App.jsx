import React from 'react';
import {
  Box,
  Grid,
  ChakraProvider,
  Container,
  Flex,
  theme,
} from '@chakra-ui/react';
import Filters from './components/Filters';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Container maxW="container.xl" p={0}>
            <Flex h="90vh" py={5}>
              <Filters />
            </Flex>
          </Container>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
