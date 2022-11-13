import Alert from "../components/layout/Alert";
import UserResults from "../components/layout/users/UserResults";
import UserSearch from "../components/layout/users/UserSearch";

const Home = () => {
	return (
		<>
			<Alert />
			<UserSearch />
			<UserResults />
		</>
	);
};

export default Home;
