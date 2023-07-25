import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineBgColors } from "react-icons/ai";
import Popover from '@material-ui/core/Popover';

const ColorPickerComponent = ({ defaultValue, readOnly = false, size = 15, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState(defaultValue || '#ffffff');

  const handleClick = (event) => {
    if (!readOnly) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (selectedColor) => {
    setColor(selectedColor.hex);
    if (onChange) {
      onChange(selectedColor.hex);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <AiOutlineBgColors style={{ color }} size={size} />
      </IconButton>
      <span>#856546</span>
      <Popover
        id={id}
        open={open && !readOnly}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <SketchPicker color={color} onChange={handleChange} />
        
      </Popover>
    </div>
  );
};

export default ColorPickerComponent;
