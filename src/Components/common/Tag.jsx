import React from "react";

export default function Tag(props){
	const {selected, children, handleSelect} = props;
	return (<div className={`topic b-1r ${selected? "op-10": "op-8"} text-center glass02 pointer`} onClick={()=>handleSelect(children)}>
		{children}
	</div>);
}
