import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import Content from './components/Content';
import Global from './components/Global';
import Header from './components/Header';

function App() {
  const bg = useColorModeValue('white', 'gray.900');
  const contentBg = useColorModeValue(
    'linear(to-b, gray.50 0%, white 2%)',
    'linear(to-b, gray.800 0%, gray.900 2%)'
  );

  return (
    <>
      <Box bg={bg}>
        <Global />
        <Header />
      </Box>
      <Box bgGradient={contentBg}>
        <Content />
      </Box>
    </>
  );
}

export default App;
