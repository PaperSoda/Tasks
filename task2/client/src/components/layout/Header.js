import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Typography from "@material-ui/core/Typography";

export default function Header() {
    return (
        <nav className="nav">
            <ul className="list">
                <li>
                    <Link to="/create">
                        <Typography className="link">
                            Create
                        </Typography>
                    </Link>
                </li>
                <li>
                    <Link to="/view">
                        <Typography className="link">
                            View
                        </Typography>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
