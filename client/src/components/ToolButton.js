import React, { useState } from 'react';
import { SvgIcon, IconButton } from "@material-ui/core";

function ToolButton(  { onClick ,typeoficon}) {
    const [selected, setSelected] = useState(false)
    function click(event) {
        setSelected(true);
        if (onClick)
            onClick(event);
    }
    return (
        <IconButton
            edge="end"
            aria-haspopup="true"
            onClick={click}
            color="inherit"
        >
                <SvgIcon style={{color: (selected && '#ff0000' ) || '#ffffff'}}>
                    {typeoficon=='cross' && <path d ="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>}
                    {typeoficon=='filter' && <path d = "M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.076,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z"/>}
                </SvgIcon>
        </IconButton>
    );


}

export default ToolButton;