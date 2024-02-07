import { Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import Chats from "./Chats.js";


function App() {
	return (
		<div style={{ fontFamily: "Avenir" }}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/chats" element={<Chats />} />
			</Routes>
		</div>
	);
}

export default App;
