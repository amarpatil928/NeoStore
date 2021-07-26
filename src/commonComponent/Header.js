import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from "react-redux";
import { searchProductList } from './../actions'
import { AuthActionType, LogOutAuthAction } from '../actions/AuthAction';


function Header(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const dispatch = useDispatch();

    const { auth, logout } = props;


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <Link className="header_linkMobile" to="/profile">
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link className="header_linkMobile" to="/order">
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          </Link>
          {!auth.authentication.isLoggedIn ? (
                <React.Fragment>
                    <Link className="header_linkMobile" to="/">
                        <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
                    </Link>
                </React.Fragment>
          ) : (
                <React.Fragment>
                    <Link className="header_linkMobile" onClick={() => {logout()}} to="/">
                        <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
                    </Link>
                </React.Fragment>
          )}
        </Menu>
      );


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
            <Link className="header_linkMobile" to="/dashboard">
                <MenuItem>
                    <p>Home</p>
                </MenuItem>
            </Link>
            <Link className="header_linkMobile" to="/products">
                <MenuItem>
                    <p>Products</p>
                </MenuItem>
            </Link>
            <Link className="header_linkMobile" to="/order">
                <MenuItem >
                    <p>Order</p>
                </MenuItem>
            </Link>
        </Menu>
    );

    return (
        <div className='header'>
            <Link className='header_logo' to="/dashboard">
                <h1 className='header_logo_neo'>Neo</h1>
                <h1 className='header_logo_store'>STORE</h1>
            </Link>
            <div className="header_nav">
                <div className="header_option">
                    <Link className="header_link" to="/dashboard">
                        <span className="header_optionLine">
                            Home
                        </span>
                    </Link>
                </div>

                <div className="header_option">
                    <Link className="header_link" to="/products">
                        <span className="header_optionLine">
                            Products
                        </span>
                    </Link>
                </div>

                <div className="header_option">
                    <Link className="header_link" to="/order">
                        <span className="header_optionLine">
                            Order
                        </span>
                    </Link>
                </div>
            </div>
            <div className="header_search">
                <div className='header_icon'>
                    <div className="search_icon" >
                        <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    className="header_inputInput"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e)=>dispatch(searchProductList(e.target.value))}
                    />
                </div>
                {/* <input className="header_searchInput" type="text" /> */}
                {/* <SearchIcon className="header_searchIcon" /> */}
                <Link className="header_linkCart" to="/cart">
                    <div className="header_cart">
                        <ShoppingCartIcon fontSize="small" />
                        <span className="header_cartText">Cart</span>
                    </div>
                </Link>
                <div className="header_cart">
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        className="header_avatar"
                        >
                        <Avatar />
                        {/* <AccountBoxIcon /> */}
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </div>
            <div className="header_sectionMobile">
                <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="white"
                >
                    <MoreVertIcon />
                </IconButton>
            </div>
            {renderMenu}
            {renderMobileMenu}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(LogOutAuthAction(AuthActionType.LOGOUT_SUCCESS));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
