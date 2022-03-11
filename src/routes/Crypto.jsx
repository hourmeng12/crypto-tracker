import React from 'react';
import { useParams } from 'react-router';
import BreadCrumb from '../components/BreadCrumb';
import CryptoInfo from '../components/CryptoInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  useGetSingleCryptoHistoricalQuery,
  useGetSingleCryptoQuery,
} from '../services/cryptoApi';

const Crypto = () => {
  const params = useParams();
  const cryptoId = params.cryptoId;
  const { data, isLoading } = useGetSingleCryptoQuery(cryptoId);
  const { data: historicalData } = useGetSingleCryptoHistoricalQuery(cryptoId);

  if (isLoading) return <LoadingSpinner minH="80vh" />;

  return (
    <>
      <BreadCrumb mb={6} />
      {data && historicalData && (
        <CryptoInfo historical={historicalData} crypto={data} />
      )}
    </>
  );
};

export default Crypto;
