import React from 'react';
import { ThemeProvider } from 'styled-components';

const lightTheme = {
  overall: {
    color: '#000000',
    background: '#ffffff',
  },
  title: {
    font: {
      default: '#000000',
      muted: '#9D9D9D',
    },
    background: {
      default: '#f0f0f0',
      muted: '#ffffff',
    },
  },
  subtitle: {
    font: {
      default: '#000000',
      muted: '#9D9D9D',
    },
    background: {
      default: '#ffffff',
      muted: '#ffffff',
    },
  },
  text: {
    font: {
      default: '#000000',
      muted: '#9D9D9D',
    },
    background: {
      default: '#ffffff',
      muted: '#ffffff',
    },
  },
  link: {
    font: {
      default: '#000000',
      muted: '#9D9D9D',
    },
    border: {
      default: '#000000',
      muted: '#000000',
    },
  },
  button: {
    active: {
      font: {
        default: '#ffffff',
        muted: '#9D9D9D',
      },
      background: {
        default: '#000000',
        muted: '#9D9D9D',
      },
      shadow: {
        default: 'rgba(0, 0, 0, 0.2)',
      },
    },
    disabled: {
      font: {
        default: 'rgba(0,0,0,0.5)',
      },
      background: {
        default: 'rgba(0,0,0,0.1)',
      },
    },
    hover: {
      font: {
        default: '#000000',
      },
      background: {
        default: '#ffffff',
      },
    },
  },
  layout: {
    background: {
      default: '#ffffff',
      muted: 'rgba(0,0,0,0.05)',
    },
  },
};

const darkTheme = {
  overall: {
    color: '#ffffff',
    background: '#000000',
  },
  title: {
    font: {
      default: '#000000',
      muted: '#9D9D9D',
    },
    background: {
      default: '#f0f0f0',
      muted: '#000000',
    },
  },
  subtitle: {
    font: {
      default: '#ffffff',
      muted: '#9D9D9D',
    },
    background: {
      default: '#000000',
      muted: '#000000',
    },
  },
  text: {
    font: {
      default: '#ffffff',
      muted: '#9D9D9D',
    },
    background: {
      default: '#000000',
      muted: '#000000',
    },
  },
  link: {
    font: {
      default: '#ffffff',
      muted: '#9D9D9D',
    },
    border: {
      default: '#ffffff',
      muted: '#ffffff',
    },
  },
  button: {
    active: {
      font: {
        default: '#000000',
        muted: '#9D9D9D',
      },
      background: {
        default: '#ffffff',
        muted: '#9D9D9D',
      },
      shadow: {
        default: 'rgba(255, 255, 255, 0.2)',
      },
    },
    disabled: {
      font: {
        default: 'rgba(255,255,255,0.5)',
      },
      background: {
        default: 'rgba(255,255,255,0.1)',
      },
    },
    hover: {
      font: {
        default: '#ffffff',
      },
      background: {
        default: '#000000',
      },
    },
  },
  layout: {
    background: {
      default: '#000000',
      muted: '#9D9D9D',
    },
  },
};

const Theme = ({ children, mode }) => (
  <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
    {children}
  </ThemeProvider>
);

export default Theme;
