import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import axios from "axios";

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	console.log(user);

	const handleLogout = async () => {
		await auth.signOut();
		navigate("/");
	};

	const getFile = async (url) => {
		const response = await fetch(url);
		const data = await response.blob();

		return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
	};
	useEffect(() => {
		if (!user) {
			navigate("/");
			return;
		}

		axios
			.get("https://api.chatengine.io/users/me", {
				headers: {
					"project-id": "bcf9ff31-0c8f-4e65-9e4e-86674a6a8f85",
					"user-name": user.email,
					"user-secret": user.uid,
				},
			})
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				let formdata = new FormData();
				formdata.append("email", user.email);
				formdata.append("username", user.email);
				formdata.append("secret", user.uid);

				getFile(user.photoURL).then((avatar) => {
					formdata.append("avatar", avatar, avatar.name);

					axios
						.post("https://api.chatengine.io/users", formdata, {
							headers: {
								"private-key": "cbf89d3c-3021-49cd-b669-49157901fbf5",
							},
						})
						.then(() => setLoading(false))
						.catch((error) => console.log(error));
				});
			});
	}, [user, navigate]);

	if (!user || loading) return "Loading...";

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">Conversify</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>

			<ChatEngine
				height="calc(100vh - 66px)"
				projectID="bcf9ff31-0c8f-4e65-9e4e-86674a6a8f85"
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	);
};

export default Chats;
