import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Link } from '@chakra-ui/layout';

const ApiAttribution = () => {
  const color = useColorModeValue('green.800', 'green.100');

  return (
    <Alert status="success" borderRadius="md">
      <AlertIcon />
      Api provided by&nbsp;
      <Link
        fontWeight="semibold"
        color={color}
        href="https://www.coingecko.com/"
        isExternal
      >
        CoinGecko
      </Link>
    </Alert>
  );
};

export default ApiAttribution;
