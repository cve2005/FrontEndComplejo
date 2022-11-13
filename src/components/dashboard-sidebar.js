import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import AirlinesIcon from '@mui/icons-material/Airlines';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';

const ROLE_USER='USER';
const ROLE_ADMIN='ADMIN';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard',
    role: ROLE_ADMIN
  },
  {
    href: '/reservas',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Registro de Reserva',
    role: ROLE_USER
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Mis Reservas',
    role: ROLE_USER
  },
  {
    href: '/perfil',
    icon: (<UserIcon fontSize="small" />),
    title: 'Perfil',
    role: ROLE_USER
  },
  {
    href: '/reportes',
    icon: (<CogIcon fontSize="small" />),
    title: 'Reportes',
    role: ROLE_ADMIN
  },
  {
    href: '/usuarios',
    icon: (<CogIcon fontSize="small" />),
    title: 'Gestion de Usuarios',
    role: ROLE_ADMIN
  },
  {
    href: '/clases',
    icon: (<CogIcon fontSize="small" />),
    title: 'Gestion de Clases',
    role: ROLE_ADMIN
  },
  {
    href: '/disciplinas',
    icon: (<CogIcon fontSize="small" />),
    title: 'Gestión de Disciplina',
    role: ROLE_ADMIN
  },
  {
    href: '/docentes',
    icon: (<AirlinesIcon fontSize="small" />),
    title: 'docentes',
    role: ROLE_USER
  },
  {
    href: '/login',
    icon: (<CogIcon fontSize="small" />),
    title: 'Salir',
    role: ROLE_USER
  }


];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const role= sessionStorage.getItem('role');

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'linear-gradient(to bottom, #0b3f00, #126600)'
        }}
      >
        <div>
          <Box sx={{ p: 3}} align = "center">
            <NextLink
              href="/"
              passHref
              
            >
              <a >
               <SportsVolleyballIcon sx={{ fontSize: 60, color:'#FFF' }}  />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: 1,
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="h6"
                >
                  Reservas Deportivas
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.filter((item)=>{
              if (role===ROLE_USER){
                return item.role===role;
              }
              return true;

          }).map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
       
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
