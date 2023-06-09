import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutOrderTable from '../components/CheckoutOrderTable';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { cart } = useCart();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1rem',
        backgroundColor: 'secondary.main',
        minHeight: '70vh',
      }}
    >
      <Typography variant='h3'>Kassa </Typography>
      {cart.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: isMediumScreen ? 'column' : 'row',
            gap: '1rem',
          }}
        >
          <CheckoutOrderTable />
          <CheckoutForm />
        </Box>
      ) : (
        <Typography variant='h6' sx={{ padding: '3rem' }}>
          Du har inte lagt till något i kassan ännu.
        </Typography>
      )}
    </Box>
  );
}
