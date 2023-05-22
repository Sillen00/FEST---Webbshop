import * as Icon from '@mui/icons-material';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import StyledBadge from '@mui/material/Badge';

import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Logo from './Logo';

export default function Header() {
  const { cart } = useCart();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          padding: '0.5rem 0',
        }}
      >
        <NavLink to='./'>
          <Logo theme={theme} width={200} height={50} />
        </NavLink>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          fontFamily: 'Oswald, sans-serif',
          fontSize: '1.3rem',
          '& a': {
            color: 'primary.contrastText',
            textDecoration: 'none',
            '&:hover': {
              color: 'secondary.light',
            },
          },
        }}
      >
        <NavLink to='./'>Start</NavLink>
        <NavLink to='./admin' data-cy='admin-link'>
          Admin
        </NavLink>
        <Box>
          <Tooltip title='Kundvagn'>
            <NavLink to='./checkout'>
              <IconButton aria-label='cart' data-cy='cart-link' color='secondary'>
                <StyledBadge
                  badgeContent={cart.reduce((total, item) => total + item.quantity, 0) || '0'}
                  color='info'
                  data-cy='cart-items-count-badge'
                >
                  <Icon.ShoppingCart />
                </StyledBadge>
              </IconButton>
            </NavLink>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
