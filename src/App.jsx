import { useEffect, useState, useRef } from "react";
import "./App.css";
function ImageScroll() {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const [frameIndex, setFrameIndex] = useState(0);

	const fallbackImage = "/desktop_parallax/image_001.webp";

	const [images, setImages] = useState([]);

	const totalFrames = 85;
	const currentFrame = (index) =>
		`/desktop_parallax/image_${index.toString().padStart(3, "0")}.webp`;

	// Utility function to throttle resize events
	function throttle(func, wait) {
		let isThrottled = false;
		// eslint-disable-next-line func-names
		return function (...args) {
			if (!isThrottled) {
				func.apply(this, args);
				isThrottled = true;
				setTimeout(() => {
					isThrottled = false;
				}, wait);
			}
		};
	}

	// Step 1: Handle scroll events with debouncing
	const handleScroll = () => {
		const container = containerRef.current;
		const rect = container.getBoundingClientRect();
		const isVisible =
			(rect.bottom - window.innerHeight) / container.clientHeight;

		if (isVisible) {
			const scrollFraction =
				(rect.bottom - window.innerHeight) /
				(container.clientHeight - window.innerHeight);

			const index = Math.max(
				0,
				totalFrames - Math.floor(scrollFraction * totalFrames)
			);

			if (index <= 0 || index > totalFrames) {
				return;
			}
			setFrameIndex(index);
		}
	};

	// Step 2: Load images with caching
	function preloadImages() {
		const imagePromises = [];
		const cachedImages = JSON.parse(localStorage.getItem("cachedImages")) || {}; // Cache already loaded images to prevent redundant loading

		for (let i = 1; i <= totalFrames; i++) {
			const imageSrc = `${currentFrame(i)}?timestamp=${Date.now()}`;

			if (cachedImages[imageSrc]) {
				// If the image is already cached, use it immediately
				imagePromises.push(Promise.resolve(cachedImages[imageSrc]));
			} else {
				// Load the image and add it to the cache
				const img = new Image();
				const promise = new Promise((resolve, reject) => {
					img.onload = () => {
						cachedImages[imageSrc] = img; // Cache the loaded image
						localStorage.setItem("cachedImages", JSON.stringify(cachedImages));
						resolve(img);
					};
					img.onerror = () =>
						reject(new Error(`Failed to load image: ${imageSrc}`));
				});

				img.src = imageSrc;
				imagePromises.push(promise);
			}
		}

		Promise.all(imagePromises)
			.then((loadedImages) => {
				setImages(loadedImages);
			})
			.catch((error) => {
				// Set the first image (image_001.jpg) to the canvas
				if (images.length <= 0 || error) {
					const canvas = canvasRef.current;
					const context = canvas.getContext("2d");
					context.clearRect(0, 0, canvas.width, canvas.height);
					context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
				}

				// Disable scroll animation code (remove scroll event listener)
				window.removeEventListener("scroll", handleScroll);
			});
	}

	// Step 3: Set up canvas
	const renderCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Render the fallback image initially
		// Create a new Image element for the fallback image
		const fallbackImg = new Image();
		fallbackImg.src = fallbackImage;

		// When the fallback image is loaded, draw it on the canvas
		fallbackImg.onload = () => {
			context.drawImage(fallbackImg, 0, 0, canvas.width, canvas.height);
		};
	};

	// Throttle the resize event to avoid excessive calls
	const handleResize = throttle(renderCanvas, 100);

	// Step 4: Render images to canvas
	useEffect(() => {
		preloadImages();
		renderCanvas();
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (!canvasRef.current || images.length < 1 || frameIndex >= totalFrames) {
			return;
		}

		const context = canvasRef.current.getContext("2d");
		context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		let requestId;

		const render = () => {
			context.drawImage(
				images[frameIndex],
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);
			requestId = requestAnimationFrame(render);
		};
		render();

		// eslint-disable-next-line consistent-return
		return () => cancelAnimationFrame(requestId);
	}, [frameIndex, images]);

	return (
		<>
			<h1 className="heading">Scroll Down</h1>
			<div className="image_container" ref={containerRef}>
				<div className="canvas_container">
					<canvas className="canvas" ref={canvasRef} />
				</div>
			</div>
		</>
	);
}

export default ImageScroll;
