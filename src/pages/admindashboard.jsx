import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Logo from "../assets/logo.png";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  Account,
  AccountPreview
} from '@toolpad/core/Account';

import NewLoan from '../components/newloan';
import userImage from '../assets/user.png';
import AddIcon from '@mui/icons-material/Add';
import { supabase } from '../utils/config';
import { useNavigate,useLocation } from 'react-router';
import GetSession from '../utils/session';
import DataTable from '../components/datagrid';
import AdminDashContent from '../components/admindashContent';
import Allusers from '../components/users';






const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  
  {
    segment: 'allUsers',
    title: 'All Users',
    icon: <PeopleAltIcon/>,
  },
];

const demoTheme = createTheme({
  palette: {
    primary: {
      main: '#38bdf8', // Sky blue
    },
    background: {
      default: '#ffffff', // White
      paper: '#ffffff',   // Card/Paper background
    },
    text: {
      primary: '#0a192f',   // Dark blue
      secondary: '#1e293b', // Slightly lighter dark blue (optional)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    allVariants: {
      color: '#0a192f',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          color: '#0a192f',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#0a192f',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
        
          color: '#ffffff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: '#0a192f',
        },
      },
    },
  },
});






function DemoPageContent({ pathname }) {
switch (pathname) {
  case '/dashboard':
    return (<AdminDashContent/>);
    case '/orders': 
    return (<DataTable/>);
  case '/allUsers':
   return (<Allusers/>);

  default:
    break;
}
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  /**
   * The handler used when the preview is expanded
   */
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  /**
   * The state of the Account popover
   * @default false
   */
  open: PropTypes.bool,
};


 
 
 




const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};



function DashboardLayoutAccountSidebar(props) {
  

  const navigate = useNavigate();
  
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState({});

  async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      setSession(
        {
          user: {
            name: user.user_metadata.full_name,
            email: user.email,
            image: user.user_metadata.avatar_url,
          },
        } 
      );
    } else {
      setSession(null);
    }
  }

  React.useEffect(()=>{fetchUser()}, []);
 

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(session);
      },
      signOut: async () => {
       const {error} =  await supabase.auth.signOut()
        setSession(null);
        navigate('/');
      },
    
    };
},[]);

  return (
    <AppProvider
    branding={{
      title:<Typography variant="h6" sx={{ color: 'navy', fontWeight: 'bold' }}>
      LOANIFY
    </Typography>,
      homeUrl: '/dashboard',
     
    }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
      allowfullscreen
    >
      <DashboardLayout  defaultCollapsibleSidebar
        slots={{toolbarAccount:null }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;
