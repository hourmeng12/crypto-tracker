import { Text } from '@chakra-ui/layout';
import React from 'react';
import { useParams } from 'react-router';
import BreadCrumb from '../components/BreadCrumb';
import CryptoInfo from '../components/CryptoInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetSingleCryptoQuery } from '../services/cryptoApi';

const Crypto = () => {
  const params = useParams();
  const cryptoId = params.cryptoId;
  const { data, isLoading } = useGetSingleCryptoQuery(cryptoId);

  if (isLoading) {
    return <LoadingSpinner minH="80vh" />;
  }

  if (!data) {
    return <Text align="center">No Crypto Found!</Text>;
  }

  return (
    <>
      <BreadCrumb mb={6} />
      {data && <CryptoInfo crypto={data} />}
    </>
  );
};

export default Crypto;
