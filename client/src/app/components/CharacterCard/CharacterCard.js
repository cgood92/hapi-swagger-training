import styles from './CharacterCard.css';
import classes from 'join-classnames';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const getTransitionClassNames = (styles, className) => ({
	enter: styles[`${className}-enter`],
	enterActive: styles[`${className}-enter-active`],
	leave: styles[`${className}-leave`],
	leaveActive: styles[`${className}-leave-active`],
	appear: styles[`${className}-appear`],
	appearActive: styles[`${className}-appear-active`]
});

export default (props) => {
	const map = {
		name: 'Name',
		birth: 'Birth',
		gender: 'Gender',
		home: 'Home Planet',
		films: 'Films'
	};
	const { name, type = "Character", handlers = {}, votes = { down: 0, up: 0 }, loadingVotes = true } = props;
	const details = Object.keys(map).map((key, i) => {
		return (<li key={i}><span className={styles.label}>{map[key]}</span> <span className={styles.value}>{props[key]}</span></li>);
	});
	return (<Card>
		<CardHeader
		  title={name}
		  subtitle={type}
		  avatar="https://cdn0.iconfinder.com/data/icons/star-wars-3/154/droid-helmet-star-wars-128.png"
		/>
		<CardText>
			<ul className={styles.details}>{details}</ul>
		</CardText>
		<CardActions>
			<div className={styles.chip_wrapper}>
				<span className={styles.inline}>
					<Chip onTouchTap={handlers.voteDown} backgroundColor="red">
						<Avatar backgroundColor="#b90000" icon={<FontIcon className="material-icons">thumb_down</FontIcon>} />
						<ReactCSSTransitionGroup
							transitionName={getTransitionClassNames(styles, 'highlight')}
							transitionEnterTimeout={200}
							transitionLeaveTimeout={200}>
							{(loadingVotes) ? null : <span key={votes.down} className={styles.voteCount}>{votes.down}</span>}
						</ReactCSSTransitionGroup>
						<span className={styles.voteCountSpacer}>&nbsp;</span>
					</Chip>
				</span>
				<span className={classes(styles.right, styles.inline)}>
					<Chip onTouchTap={handlers.voteUp} backgroundColor="green">
						<Avatar backgroundColor="#006700" icon={<FontIcon className="material-icons">thumb_up</FontIcon>} />
						<ReactCSSTransitionGroup
							transitionName={getTransitionClassNames(styles, 'highlight')}
							transitionEnterTimeout={200}
							transitionLeaveTimeout={200}>
						  	{(loadingVotes) ? null : <span key={votes.up} className={styles.voteCount}>{votes.up}</span>}
						</ReactCSSTransitionGroup>
						<span className={styles.voteCountSpacer}>&nbsp;</span>
					</Chip>
				</span>
			</div>
		</CardActions>
	</Card>
	);
};

