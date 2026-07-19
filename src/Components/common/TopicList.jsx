import React from "react";
import Tag from "./Tag";

export default function TopicList (props){
	const {topics, selectedTopics, handleTopicSelect} = props;

	return (
		<div className="container-topics">
			<div className="topics p-halfr b-1r">
				<span className="font-1andhalfr font-bold" style={{marginRight: "1rem"}}>Filter:</span>
				{topics && topics.map(topic=>
						(<Tag 
						key={topic} 
						selected={selectedTopics.includes(topic)} 
						handleSelect={handleTopicSelect}>
							{topic}
						</Tag>)
				)}
			</div>
		</div>
	);
}