// A reusable button component for the app.

import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Button = ({ variant, color, size, onClick, children }) => {
    const theme = useTheme();

    return (
        <MuiButton
            variant={variant}
            color={color}
            size={size}
            onClick={onClick}
            sx={{
                backgroundColor: theme.palette[color].main,
                color: theme.palette.common.white,
                '&:hover': {
                    backgroundColor: theme.palette[color].dark,
                },
            }}
        >
            {children}
        </MuiButton>
    );
}




