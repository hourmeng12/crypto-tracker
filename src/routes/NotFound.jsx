import { Center, Text } from '@chakra-ui/layout';
import React from 'react';

const NotFound = () => {
  return (
    <Center my={30}>
      <Text align="center" fontSize="xl" fontWeight="semibold">
        Error 404!
        <br />
        No Page Found!
      </Text>
    </Center>
  );
};

export default NotFound;
