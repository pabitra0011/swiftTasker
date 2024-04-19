// eslint-disable-next-line no-unused-vars
import React from "react";
import clsx from "clsx";


// eslint-disable-next-line react/prop-types
const Button = ({ icon, className, label, type, onClick = () => { } }) => {
    return (
        <button
            type={type || "button"}
            onClick={onClick}
            className={clsx("px-3 py-2 outline-none rounded", className)}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    )
}

export default Button
