import React, { FunctionComponent, useContext, useState } from 'react';
import classes from './SideNav.module.scss';
import {
  BlockStorage as Marketing,
  Money as Finance,
  Task as Personnal,
  ChooseItem,
} from '@carbon/icons-react';
import { Grid, Typography } from '@mui/material';
import SwitchElement from '../switchelement/SwitchElement';
import { DataRes, TabDetails } from '../../types';
import { Link } from 'react-router-dom';
import { disableAllPlugins } from '../../utility/data';
import { DataContext } from '../../Context';
import { UseMutationResult } from '@tanstack/react-query';
import { useDataMutation } from '../../query';

interface IProps {
  tabDetails: TabDetails[];
}

const SideNav: FunctionComponent<IProps> = ({ tabDetails }): JSX.Element => {
  const [checked, setChecked] = useState(true);
  const data: DataRes = useContext(DataContext);
  const {
    mutate,
    isLoading: isMutationLoading,
  }: UseMutationResult<DataRes, unknown, DataRes, unknown> = useDataMutation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const updatedData = disableAllPlugins(data, event.target.checked);
    mutate(updatedData);
  };
  return (
    <div className={classes.sidenav}>
      <span className={classes.title}>
        Data<strong>Guard</strong>
      </span>
      {tabDetails!.map((tab) => (
        <div className={classes.tab} key={tab.title}>
          {tab.title === 'Marketing' ? (
            <Marketing className={classes.icon} />
          ) : tab.title === 'Finance' ? (
            <Finance className={classes.icon} />
          ) : tab.title === 'Personnel' ? (
            <Personnal className={classes.icon} />
          ) : (
            <ChooseItem className={classes.icon} />
          )}
          <Link to={tab.title} className={classes.link}>
            {' '}
            {tab.title}
          </Link>
        </div>
      ))}
      <div
        className={`${classes.sidenavBottom} ${
          checked ? classes.greenBackground : classes.redBackground
        }`}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={9}>
            <Typography variant="body1" className={classes.bottomTitle}>
              {checked ? 'All plugins enabled' : 'All plugins disabled'}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.switch}>
            <SwitchElement switchvalue={checked} handleChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default SideNav;
