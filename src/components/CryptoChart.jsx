import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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

const CryptoChart = ({ cryptoData }) => {
  const data = {
    labels: cryptoData.prices.map((coin) => {
      let date = new Date(coin[0]);
      return date.toLocaleDateString();
    }),

    datasets: [
      {
        data: cryptoData.prices.map((coin) => coin[1]),
        label: `Price`,
        borderColor: '#8894ff',
        backgroundColor: '#fff',
        borderWidth: 3,
        pointBorderWidth: 5,
        pointHoverRadius: 6,
      },
    ],
  };
  return (
    <Box pos="relative" overflow="hidden">
      <Line data={data} options={options} />
    </Box>
  );
};

export default CryptoChart;
