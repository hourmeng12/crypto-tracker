import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    dark: 'rgb(23,23,26)',
    brand: {
      50: '#ffffff',
      100: '#d5d9ff',
      200: '#bbc2ff',
      300: '#a2abff',
      400: '#8894ff',
      500: 'rgba(85, 102, 255, 1)',
      600: '#2238ff',
      700: '#0921ff',
      800: '#0018ee',
      900: '#0013bb',
    },
  },
  components: {
    Button: {
      variants: {
        select: (props) => ({
          bg: 'transparent',
          _hover: {
            bg: mode('white', 'gray.800')(props),
          },
          _active: {
            bg: mode('white', 'gray.800')(props),
          },
        }),
      },
    },
    Heading: {
      variants: {
        heading: {
          fontSize: ['md', 'lg'],
        },
      },
    },
    Table: {
      sizes: {
        md: {
          th: {
            px: '2.5',
            py: '3',
            lineHeight: '4',
            fontSize: 'xs',
          },
          td: {
            px: '2.5',
            py: '2.5',
            lineHeight: '5',
          },
        },
      },
      variants: {
        list: (props) => ({
          th: {
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            borderTop: '1px',
            borderBottom: '1px',
            borderColor: mode('gray.100', 'gray.700')(props),
            '&[data-is-numeric=true]': {
              textAlign: 'end',
            },
          },
          td: {
            height: '5rem',
            fontSize: '0.875rem',
            fontWeight: 'semibold',
            borderBottom: '1px',
            borderColor: mode('gray.100', 'gray.700')(props),
            '&[data-is-numeric=true]': {
              textAlign: 'end',
            },
          },
        }),
      },
    },
  },
});
