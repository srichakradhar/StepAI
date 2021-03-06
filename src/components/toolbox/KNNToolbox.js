import React from "react";

import ValueLabelDisplay from "components/toolbox/ValueLabelDisplay";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";

import { ModelActionType, ModelActions } from "state/ModelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useModelState } from "state/ModelState";
import { model } from "codegen/knnCode";
import { invokeKNN } from "js-ml/knn";
import { useState } from "state/State";

export const useStyles = makeStyles((theme) => ({
  sliderWidth: {
    width: 230,
  },
  nodesLabel: {
    marginRight: 12,
  },
  nodesItem: {
    marginTop: 0,
    marginBottom: 8,
    marginLeft: 32,
  },
  actionItem: {
    marginBottom: 16,
  },
  actionWidth: {
    width: 260,
  },
  button: {
    width: 260,
    marginBottom: 8,
    outline: "none !important",
  },
}));

export default function KNNToolbox() {
  const classes = useStyles();
  const { state } = useState();
  const { model_state, model_dispatch } = useModelState();
  const [kVal, setKVal] = React.useState(model_state.knn_k);
  const [col1, setCol1] = React.useState(model_state.knn_column1_index);
  const [col2, setCol2] = React.useState(model_state.knn_column2_index);

  function onUpdatePlot() {
    model_dispatch({
      type: ModelActions.SET_KNN_COLS,
      indices: [col1, col2],
    });
    if (kVal !== model_state.knn_k) {
      model_dispatch({
        type: ModelActions.SET_KNN_K,
        k: kVal,
      });
      invokeKNN(kVal, state.sample_dataset, model_dispatch);
    }
  }

  return (
    <Grid direction="column" container style={{ marginTop: "20px" }}>
      {/* K Value */}
      <Grid item>
        <Grid direction="row" className={classes.nodesItem} container>
          <Grid item>
            <Typography className={classes.nodesLabel} gutterBottom>
              K
            </Typography>
          </Grid>
          <Grid className={classes.sliderWidth} item>
            <Slider
              value={kVal}
              valueLabelDisplay="on"
              ValueLabelComponent={ValueLabelDisplay}
              step={1}
              marks
              min={1}
              max={20}
              onChange={(event, val) => setKVal(val)}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Column 1 */}
      <Grid item className={classes.actionItem}>
        <FormControl className={classes.actionWidth}>
          <InputLabel id="demo-simple-select-label">X-Axis</InputLabel>
          <Select
            value={model_state.knn_columns.length > 0 ? col1 : ""}
            onChange={(event) => setCol1(event.target.value)}
          >
            {model_state.knn_columns.map((column, index) => (
              <MenuItem key={index} value={index}>
                {model_state.knn_columns_map[column]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Column 2 */}
      <Grid item className={classes.actionItem}>
        <FormControl className={classes.actionWidth}>
          <InputLabel id="demo-simple-select-label">Y-Axis</InputLabel>
          <Select
            value={model_state.knn_columns.length > 0 ? col2 : ""}
            onChange={(event) => setCol2(event.target.value)}
          >
            {model_state.knn_columns.map((column, index) => (
              <MenuItem key={index} value={index}>
                {model_state.knn_columns_map[column]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          className={classes.button}
          variant="outlined"
          onClick={onUpdatePlot}
        >
          {model_state.knn_k !== kVal ? "Re-Train Model" : "Update Plot"}
        </Button>
      </Grid>
    </Grid>
  );
}
