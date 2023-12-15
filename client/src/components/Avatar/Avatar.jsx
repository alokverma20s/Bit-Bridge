import React from 'react'

const Avatar = ({children, backgroundColor, px, py, color, borderRadius, fontSize, cursor}) => {

    const style={
        backgroundColor,
        padding: `${py} ${px}`,
        color: color||'black',
        borderRadius,
        fontSize,
        textAlign: "center",
        cursor: cursor||null,
        textDecoration: "none",
        minWidth: "12px",
        display: "flex",
        justifyContent: "center"
    };
    // console.log(borderRadius);
    // console.log("hello");
  return (
    <div id="avatar" style={style}>
        {children}
    </div>
  )
}
 
export default Avatar;