import { createContext, useState, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	const fetchUsers = async text => {
		setLoading();

		const params = new URLSearchParams({
			q: text,
		});

		const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});
		const { items } = await response.json();
		dispatch({ type: "GET_USERS", payload: items });
	};

	//set loading
	const setLoading = () => dispatch({ type: "SET_LOADING" });

	//clear search
	const clearSearch = () => dispatch({ type: "CLEAR_SEARCH" });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				fetchUsers,
				clearSearch,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
