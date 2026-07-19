import React from "react";
import Image from "./Image";

export default function Card(props){
	const {image, imageAlt, heading, content, links, tags, className, handleTagSelect} = props;

	return (
		<article className={className? `card ${className}`: "card"}>
			{ image && <Image className="card-image" src={image} alt={imageAlt} width="540" ratio={16/9} /> }
			<header>
				<h2 className="card-heading">
					{heading}
				</h2>
			</header>
			{ content && 
			<React.Fragment>
				<main className="card-body">
					<p className="card-content">{content}</p>
					<div className="m-1rt m-1rb">
						{tags && tags.map(tag=>{
							return (
							<span 
								key={tag} 
								className="card-tag glass01 pointer" 
								onClick={()=>{
									if(handleTagSelect)
										handleTagSelect(tag);
								}}>
									{tag}
							</span>);
						})}
					</div>
				</main>
			</React.Fragment>}
			{ (links && links.length > 0) && 
				<React.Fragment>
					<footer>
						<section className="topics">
							{links.map(link=>{
								return (
								<a 
									href={link.to}
									key={link.to} 
									target="_blank" rel="noreferrer" 
									className="link01">
										{link.label}
								</a>);
							})}
						</section>
					</footer>
				</React.Fragment>
			}
		</article>
	);
}

// image
// heading
// content
// tags
// className
// imageAlt