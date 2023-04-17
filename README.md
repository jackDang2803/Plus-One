## + 1

This repository is a small proof of concept used to demonstrate what would be required to achieve voice-to-image in accordance with our application (+ 1) that seeks to explore computer-mediated-conversation and act as a form of enactive assistance in the context of a design charrette. <br />

This small proof-of-concept was used to demonstrate the challenges involved, both technically and from the perspective of UX (user experience), in leveraging current paradigm's in diffusion modeling for image generation and speech recognition. <br />

In order to return more helpful or relevant imagery, it would be necessary to parse and interpret sentiment, context and structure in real time information returned from a voice-to-text model.<br />

Our takeaways are, that in the current state of voice-to-text technology, It would be necessary to asynchronously analyze the content of a conversation, in order to approach what an image of that summary could be described as.<br /> 

Amelia Gan, Quoc Dang and Blaine Western.

## Available Scripts

In the project directory, you can run:
### `npm run dev`

This will run the server and the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will need an AssemblyAI (title yours ASSEMBLYAI_API_KEY=[your key]) and OpenAI (title yours OPENAI_API_KEY=[your key]) access key stored within a .env file at the root of the project. <br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
