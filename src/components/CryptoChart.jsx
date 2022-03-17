import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useGetSingleCryptoHistoricalQuery } from '../services/cryptoApi';
import LoadingSpinner from './LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const daysButton = [
  {
    text: '1D',
    value: 1,
  },
  {
    text: '7D',
    value: 7,
  },
  {
    text: '14D',
    value: 14,
  },
  {
    text: '1M',
    value: 30,
  },
  {
    text: '3M',
    value: 90,
  },
];

const CryptoChart = ({ cryptoId }) => {
  const [days, setDays] = useState(1);
  const { data, isFetching } = useGetSingleCryptoHistoricalQuery({
    cryptoId,
    days,
  });
  const cryptoHistoryPrices = data?.prices ?? [];
  const chartData = {
    labels:
      cryptoHistoryPrices.length > 0 &&
      cryptoHistoryPrices.map((coin) => {
        let date = new Date(coin[0]);
        return date.toLocaleDateString();
      }),

    datasets: [
      {
        data:
          cryptoHistoryPrices.length > 0 &&
          cryptoHistoryPrices.map((coin) => coin[1]),
        label: `Price`,
        borderColor: '#8894ff',
        backgroundColor: '#fff',
        borderWidth: 3,
        pointBorderWidth: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <>
      <ButtonGroup
        mb={6}
        p={1}
        direction="row"
        spacing={0}
        variant="select"
        size="sm"
        bg={bg}
        borderRadius="lg"
      >
        {daysButton.map((day) => (
          <Button
            key={day.value}
            isActive={days === day.value}
            onClick={() => setDays(day.value)}
          >
            {day.text}
          </Button>
        ))}
      </ButtonGroup>
      {!isFetching && (
        <Box pos="relative" overflow="hidden">
          <Line data={chartData} options={chartOptions} />
        </Box>
      )}
      {isFetching && <LoadingSpinner py={28} />}
    </>
  );
};

export default CryptoChart;
