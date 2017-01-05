import style from './SiteHeader.css';
import classes from 'join-classnames';
import {IndexLink} from 'react-router';
import logo from './hapi.png';

export default ({homelink="/", className="", isLoggedIn = false, handlers = {}}) => (
	<header className={classes(style.header, className)}>
		<IndexLink to={homelink} className={style.link}>
			<img src={logo} height="25" width="25" className={style.logo__img}/>
			<span className={style.logo__text}>hapi-swagger-training</span>
		</IndexLink>
		{isLoggedIn && <a href='javascript:;' onClick={(e) => { handlers.logout(); e.preventDefault(); return false; }} className={style.link}>Logout</a>}
	</header>
);
