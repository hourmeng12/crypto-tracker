import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React from 'react';

const Search = () => {
  return (
    <InputGroup>
      <Input variant="filled" placeholder="Search" />
      <InputRightElement
        bg="transparent"
        children={<SearchIcon color="gray.400" />}
      />
    </InputGroup>
  );
};

export default Search;
