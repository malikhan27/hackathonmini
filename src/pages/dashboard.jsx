import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { CopilotPopup } from "@copilotkit/react-ui";
import Dashboarddata from '../components/dashboardcontent'
import AddIcon from '@mui/icons-material/Add';
import { supabase } from '../utils/config';
import { useNavigate,useLocation } from 'react-router-dom';
import GetSession from '../utils/session';
import DataTable from '../components/datagrid';
import NEWLOAN from '../components/newloan';







const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'DASHBOARD',
    icon: <DashboardIcon />,
  },
  {
    segment: 'events',
    title: 'EVENTS',
    icon: <ShoppingCartIcon />,
  },
   {
    segment: 'eventrequests',
    title: 'EVENT REQUESTS',
    icon: <AddIcon />,
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
    return (<Dashboarddata/>);
    case '/events': 
    return (<DataTable/>);
  case '/eventrequests':
   return (<NEWLOAN/>);

  default:
    break;
}
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
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
      EVENTIFY
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
