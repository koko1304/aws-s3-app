import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<Link className="navbar-brand" to="/">
				AWS S3 APP
			</Link>
		</nav>
	);
};

export default Header;
