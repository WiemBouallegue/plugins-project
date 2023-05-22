import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { FunctionComponent } from 'react';

interface IProps {
  switchvalue: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SwitchElement: FunctionComponent<IProps> = ({
  switchvalue,
  handleChange,
}): JSX.Element => {
  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          colorPrimary: {
            '&.Mui-checked': {
              color: 'white',
            },
          },
          track: {
            opacity: 0.9,
            backgroundColor: '#ab1b23',
            '.Mui-checked.Mui-checked + &': {
              opacity: 0.7,
              backgroundColor: 'green',
            },
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={switchvalue}
                onChange={handleChange}
                size="medium"
              />
            }
            label=""
          />
        </FormGroup>
      </ThemeProvider>
    </>
  );
};
export default SwitchElement;
