import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

    export default function ExerciseSelect({sorts, exerciseSortName, setExerciseSortName}) {
        const handleChange = (event) => {
            const { target: { value } } = event;
            setExerciseSortName(typeof value === 'string' ? value.split(',') : value,);
        };
    
        return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={exerciseSortName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {sorts.map((sort) => (
                        <MenuItem key={sort} value={sort}>
                            <Checkbox checked={exerciseSortName.indexOf(sort) > -1} />
                            <ListItemText primary={sort} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
        );
    }

