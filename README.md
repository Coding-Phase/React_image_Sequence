# React Scroll-Triggered Video Animation

This is a simple React application that creates a scroll-triggered video animation using the Vite development environment. The animation plays a video in sync with the user's scrolling behavior. The code uses the `lodash` library for throttling scroll events to ensure smooth video playback.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)

## Prerequisites

Before you get started, make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v7 or higher) or yarn (v1 or higher)
- Vite (React + Vite)

  ```bash
  npm create vite@latest
  ```

![Scroll Animation](public/image_animation_design.gif)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd react-scroll-video-animation
   ```

3. Install the project dependencies using npm:

   ```bash
    npm install
   ```

   Or using yarn:

   ```bash
   yarn
   ```

## Usage

1. After installing the dependencies, start the development server:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

2. Open your browser and go to http://localhost:5173 to see the scroll-triggered video animation in action.

3. As you scroll down the page, the video playback will be synchronized with your scrolling behavior.

## Customization

You can customize this animation by replacing the video source with your own video file. To do this, follow these steps:

1. Replace the video file source in the src attribute of the <source> element within the video component:

   ```bash
    <source src="your-video-file.mp4" type="video/mp4" />
   ```

2. Make sure the new video file is located in the same directory as your project or update the path accordingly.

3. You can also adjust the speed variable in the handleScroll function to control the speed of video playback. A higher value will make the video scroll faster, and a lower value will make it scroll slower.

4. To change the text displayed on the page, modify the content inside the element:

   ```bash
   <h1 className="heading">YOUR CUSTOM TEXT HERE</h1>
   ```

**_Feel free to use, modify, and extend this project for your own purposes. If you encounter any issues or have questions, please open an issue on the GitHub repository. Happy coding!_**
