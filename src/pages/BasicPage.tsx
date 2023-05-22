import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import BasicCard from '../components/basiccard/BasicCard';
import { Plugin } from '../types';
import classes from './BasicPage.module.scss';

interface IProps {
  tabId: string;
  title: string;
  plugins: Plugin[];
}
const BasicPage: FunctionComponent<IProps> = ({
  tabId,
  title,
  plugins,
}): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <Typography variant="h5" component="div" className={classes.title}>
        {title} Plugins
      </Typography>
      <Grid container spacing={2}>
        {plugins.map((plugin) => (
          <Grid item xs={4} key={plugin.title}>
            <BasicCard
              id={plugin.id}
              title={plugin.title}
              active={plugin.active}
              description={plugin.description}
              enableSwitch={plugin.enableSwitch}
              tabId={tabId}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default BasicPage;
