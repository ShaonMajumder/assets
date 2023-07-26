import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, FormControl, FormLabel, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  circleButton: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    border: '2px solid transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#000',
    },
  },
  agreement: {
    borderColor: 'green',
    '&.selected': {
      backgroundColor: 'green',
      color: '#fff',
    },
  },
  neutrality: {
    borderColor: 'gray',
    '&.selected': {
      backgroundColor: 'gray',
      color: '#fff',
    },
  },
  disagreement: {
    borderColor: 'violet',
    '&.selected': {
      backgroundColor: 'violet',
      color: '#fff',
    },
  },
  question: {
    textAlign: 'center', 
    marginBottom: theme.spacing(2),
  },
}));

const SurveyCard = () => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState('neutrality');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.question}>How do you feel about this question?</FormLabel>

        
        
        <RadioGroup row aria-label="survey" name="survey" value={selectedOption} onChange={handleOptionChange}>
          <FormControlLabel
            value="agreement"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.agreement} ${selectedOption === 3 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(3)}
              >
                3
              </IconButton>
            }
            label=""
          />
          <FormControlLabel
            value="agreement"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.agreement} ${selectedOption === 2 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(2)}
              >
                2
              </IconButton>
            }
            label=""
          />
          <FormControlLabel
            value="agreement"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.agreement} ${selectedOption === 1 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(1)}
              >
                1
              </IconButton>
            }
            label=""
          />
          <FormControlLabel
            value="neutrality"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.neutrality} ${selectedOption === 0 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(0)}
              >
                0
              </IconButton>
            }
            label=""
          />
          <FormControlLabel
            value="disagreement"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.disagreement} ${selectedOption === -1 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(-1)}
              >
                1
              </IconButton>
            }
            label=""
          />
          <FormControlLabel
            value="disagreement"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.disagreement} ${selectedOption === -2 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(-2)}
              >
                2
              </IconButton>
            }
            label=""
          />
          <FormControlLabel
            value="disagreement"
            control={
              <IconButton
                className={`${classes.circleButton} ${classes.disagreement} ${selectedOption === -3 ? 'selected' : ''}`}
                onClick={() => handleOptionChange(-3)}
              >
                3
              </IconButton>
            }
            label=""
          />
        </RadioGroup>
        
      </FormControl>
    </div>
  );
};

export default SurveyCard;
