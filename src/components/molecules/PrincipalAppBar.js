import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Favorite from "@material-ui/icons/Favorite";
import MoreIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router-dom";
const styles = theme => ({
	root: {
		width: "100%"
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block"
		}
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex"
		}
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	}
});

class PrincipalAppBar extends React.Component {
	state = {
		anchorEl: null,
		mobileMoreAnchorEl: null
	};

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	render() {
		const { anchorEl, mobileMoreAnchorEl } = this.state;
		const { classes, isLoggedIn } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				{!isLoggedIn && (
					<MenuItem onClick={() => this.props.history.push("/login")}>
						Iniciar sesión
					</MenuItem>
				)}
				{isLoggedIn && (
					<MenuItem onClick={() => this.props.history.push("/logout")}>
						Cerrar sesión
					</MenuItem>
				)}
			</Menu>
		);

		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMobileMenuOpen}
				onClose={this.handleMobileMenuClose}
			>
				{!isLoggedIn && (
					<MenuItem onClick={() => this.props.history.push("/login")}>
						Iniciar sesión
					</MenuItem>
				)}
				{isLoggedIn && (
					<MenuItem onClick={() => this.props.history.push("/logout")}>
						Cerrar sesión
					</MenuItem>
				)}
			</Menu>
		);

		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Toolbar>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton
								aria-owns={isMenuOpen ? "material-appbar" : undefined}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-haspopup="true"
								onClick={this.handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
				{renderMobileMenu}
			</div>
		);
	}
}

PrincipalAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(PrincipalAppBar));
