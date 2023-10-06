import { useEffect, useRef } from "react";
import "./App.css";
import { throttle } from "lodash";

export default function Home() {
	const videoRef = useRef(null);
	const handleScroll = throttle(() => {
		const $video = videoRef.current;
		const speed = 100;
		const newScroll = Math.floor(window.scrollY) / speed;

		// Use requestAnimationFrame for smoother updates
		requestAnimationFrame(() => {
			$video.currentTime = newScroll;
		});
	}, 100); // Adjust the throttle delay as needed

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="container">
			<div className="heading_container">
				<h1 className="heading">SCROLL DOWN</h1>
			</div>
			<video
				ref={videoRef}
				id="videoplayerhtml"
				className="video_animation"
				data-pmcvt="true">
				<source
					src="..................Use Video.................."
					type="video/mp4"
				/>
			</video>
		</div>
	);
}
