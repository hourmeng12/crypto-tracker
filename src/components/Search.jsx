import React, { useEffect, useMemo, useState } from 'react';
import { useGetSearchCryptoQuery } from '../services/cryptoApi';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputRightElement } from '@chakra-ui/input';
import { Center, Flex, Stack, Text } from '@chakra-ui/layout';
import { useDebounce } from '../hooks';
import { Image } from '@chakra-ui/image';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useNavigate } from 'react-router';
import LoadingSpinner from './LoadingSpinner';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const debouncedQuery = useDebounce(inputValue);
  const { data, isFetching } = useGetSearchCryptoQuery(query, 750);
  const searchQueries = useMemo(() => data?.coins ?? [], [data]);
  const navigate = useNavigate();

  const lightColor = useColorModeValue('gray.500', 'gray.200');
  const iconColor = useColorModeValue('gray.400', 'gray.600');

  useEffect(() => {
    setIsEmpty(false);
    if (debouncedQuery) {
      setQuery(inputValue || null);
      if (searchQueries.length === 0 && !isFetching) {
        setIsEmpty(true);
      }
    }
  }, [debouncedQuery, inputValue, searchQueries, isFetching]);

  const listState = isEmpty ? (
    <Center p={2}>
      <Text align="center" color="gray.500">
        We couldn't find anything matching your search.
        <br />
        Try again with a different term.
      </Text>
    </Center>
  ) : (
    <LoadingSpinner />
  );

  return (
    <Stack direction="column" w="full">
      <AutoComplete
        rollNavigation
        maxSuggestions={5}
        emptyState={listState}
        filter={(item) => item}
        onSelectOption={({ item }) => {
          setInputValue(item.label);
          navigate(`/cryptocurrencies/${item.value}`);
        }}
      >
        <InputGroup>
          <AutoCompleteInput
            variant="filled"
            placeholder="Search"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
          <InputRightElement
            bg="transparent"
            children={<SearchIcon color={iconColor} />}
          />
        </InputGroup>
        <AutoCompleteList>
          {searchQueries.map((coin) => (
            <AutoCompleteItem key={coin.id} value={coin.id} label={coin.name}>
              <Flex align="center">
                <Image mr={2} boxSize="18px" src={coin.thumb} alt={coin.name} />
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="medium"
                  noOfLines={3}
                  wordBreak="break-word"
                  mr={1}
                >
                  {coin.name}
                </Text>
                <Text
                  flex="1 0 16%"
                  as="span"
                  casing="uppercase"
                  fontSize="xs"
                  noOfLines={3}
                  color={lightColor}
                >
                  {coin.symbol}
                </Text>
              </Flex>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
};

export default Search;
