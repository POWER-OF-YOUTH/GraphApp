import { AppBar, Tab, Tabs, makeStyles, useState, useTheme, Box, Typography, Button } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import React from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

function EditorRightMenuTab({ panels }) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (<div style={{ height: '50%' }}>
        <AppBar className={classes.root} position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                {panels.map((x, i) =>
                    <Tab label={x.title} {...a11yProps({i})} />
                )}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            {panels.map((x, i) =>
                <TabPanel value={value} index={i} dir={theme.direction}>
                    <div style={{ maxHeight: 'calc(50vh - 112px - 16px)' }}>
                        {x.body}
                    </div>
                </TabPanel>
            )}
        </SwipeableViews>
    </div>)
}

export default EditorRightMenuTab;