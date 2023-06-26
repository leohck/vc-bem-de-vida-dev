import React from "react";

function InputWLabel(props) {
	return (
		<div className="flex flex-col gap-1">
			<label><h6>{props.label}</h6></label>
			{props.children}
		</div>
	);
}

export default InputWLabel;
