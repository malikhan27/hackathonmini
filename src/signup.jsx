
import { useEffect, useState } from "react";
import { supabase } from "./utils/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import styles from './App.module.css'
import MenuIcon from "./components/MenuIcon";
import ToggleButton from "./components/ToggleButton";
import { Auth } from '@supabase/auth-ui-react' 
import { ThemeSupa } from '@supabase/auth-ui-shared'




const classes = {
  'rgb(202, 37, 37)': styles['container-redshadow'],
  'rgb(65, 163, 35)': styles['container-greenshadow'],
  'rgb(8, 107, 177)': styles['container-blueshadow'],
  'rgb(235, 115, 29)': styles['container-orangeshadow'],
}

const colors = [
  'rgb(202, 37, 37)',
  'rgb(65, 163, 35)',
  'rgb(8, 107, 177)',
  'rgb(235, 115, 29)',
] 

const socialAlignments = ['horizontal', 'vertical'] 

const radii = ['5px', '10px', '20px'];

const views = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
  { id: 'verify_otp', title: 'Verify Otp' },
]

export default function Signup() {
  const [brandColor, setBrandColor] = useState(colors[0]);
  const [borderRadius, setBorderRadius] = useState(radii[0]);
  const [theme, setTheme] = useState('dark');
  const [socialLayout, setSocialLayout] = useState(socialAlignments[1]);
  const [view, setView] = useState(views[0])

  return (
    <div className="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
    <div className="container relative mx-auto grid grid-cols-12 px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20">
      
      {/* Centered Auth Section */}
      <div className="relative col-span-12 flex justify-center items-center">
        <div className="relative w-full max-w-md bg-zinc-900">
          <div className={classes['blue']}>
            <div className="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
              
              <div className="mb-6 flex flex-col gap-6 items-center text-center">
                <div className="flex items-center gap-3">
                  <h1 className="text-scale-1200 text-2xl">WELCOME TO LOANIFY</h1>
                </div>
                <p className="text-scale-1100 text-auth-widget-test text-uppercase">
                  Sign in today to get your desired loan
                </p>
              </div>
              
              <Auth
                supabaseClient={supabase}
                view={view.id}
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    button: {
                      borderRadius: borderRadius,
                      // Keep default button styles to preserve shadow
                    },
                  },
                  variables: {
                    default: {
                      colors: {
                        brand: 'maroon',
                        brandAccent: 'gray',
                      },
                    },
                  },
                }}
                socialLayout={socialLayout}
                theme={theme}
              />
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

