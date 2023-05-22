import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FunctionComponent, useContext } from 'react';
import classes from './BasicCard.module.scss';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import SwitchElement from '../switchelement/SwitchElement';
import { useDataMutation } from '../../query';
import { UseMutationResult } from '@tanstack/react-query';
import { DataRes } from '../../types';
import { DataContext } from '../../Context';
import { updatePluginData } from '../../utility/data';

interface IProps {
  id: string;
  title: string;
  active: boolean;
  description: string;
  enableSwitch: boolean;
  tabId: string;
}

const BasicCard: FunctionComponent<IProps> = ({
  id,
  title,
  active,
  description,
  enableSwitch,
  tabId,
}): JSX.Element => {
  const [switchvalue, setSwitch] = useState<boolean>(enableSwitch);
  const allData: DataRes = useContext(DataContext);
  const {
    mutate,
    isLoading: isMutationLoading,
  }: UseMutationResult<DataRes, unknown, DataRes, unknown> = useDataMutation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitch(event.target.checked);
    const updateData = updatePluginData(
      allData,
      tabId,
      id,
      event.target.checked,
      !event.target.checked
    );
    mutate(updateData);
  };

  return (
    <div className={classes.plugin}>
      <Card
        sx={{
          width: 280,
          height: 190,
          borderRadius: 2,
          border: `2px solid ${active ? '#bdbfc1' : '#e9eaec'}`,
          opacity: active ? 1 : 0.6,
          pointerEvents: active ? 'auto' : 'none',
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <SwitchElement
                switchvalue={switchvalue}
                handleChange={handleChange}
              />
              <Typography
                display="block"
                variant="caption"
                gutterBottom
                color={switchvalue ? 'green' : '#ab1b23'}
              >
                {switchvalue ? 'Allowed' : 'Blocked'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="body2" color="#bdbfc1">
                {description}

                <br />
              </Typography>
            </Grid>
            <Grid />
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicCard;
