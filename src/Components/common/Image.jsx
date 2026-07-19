import React, {useRef, useState} from "react";

export default function Image(props){
	const {containerClassName, imageClassName, src, width, height, ratio, alt} = props;

	const [loaded, setLoaded] = useState(false);
	const imgElement = useRef(null);

	let imageWidth = width || (height*parseFloat(ratio));
	let imageHeight = height || (width/parseFloat(ratio));

	if(!loaded){
		return (
			<div className={containerClassName? `${containerClassName} image-loading`: `image-loading`} style={{width: imageWidth, height: imageHeight}}>
				<img 
					ref={imgElement} 
					width="100%" 
					height={`${imageHeight}px`} 
					className={imageClassName?`${imageClassName} cover invisible`:"cover invisible"} 
					alt={alt} 
					style={{maxWidth: "100%", display: "block"}} 
					src={src} 
					onLoad={()=>setLoaded(true)} />
			</div>);
	}
	else{
		return (
			<div className={containerClassName}>
				<img 
				ref={imgElement} 
				width="100%" 
				height={`${imageHeight}px`} 
				className={imageClassName?`${imageClassName} cover fade-appear`:"cover fade-appear"} 
				alt={alt} 
				style={{maxWidth: "100%", display: "block"}} 
				src={src} />
			</div>);
	}
}


// .image-loading{
// 	background-image: linear-gradient(to right, #fff 30%, #ddd 50%, #fff 70%);
// 	background-size: 200%;
// 	animation: blink 1s infinite;
// }

// .fade-appear{
// 	opacity: 0;
// 	animation: fadeAppear 500ms forwards;
// }

// .invisible{
// 	opacity: 0;
// }

// @keyframes blink{
// 	0%{
// 		background-position: right;
// 	}
// 	100%{
// 		background-position: left;
// 	}
// }

// @keyframes fadeAppear {
// 	from{
// 		opacity: 0;
// 	}
// 	to{
// 		opacity: 1;
// 	}
// }