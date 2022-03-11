import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

const LoadingSpinner = ({ ...props }) => {
  const emptyColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Center {...props}>
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor={emptyColor}
        color="brand.500"
        size="xl"
      />
    </Center>
  );
};

export default LoadingSpinner;
