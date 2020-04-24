import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10),
		borderRadius: '16px',
		backgroundColor: 'rgba(255,255,255,0.7)',
		backdropFilter: 'blur(4px)',
		maxWidth: 900 - theme.spacing(2) * 2,
		padding: theme.spacing(5, 2),
		[theme.breakpoints.down('sm')]: {
			maxWidth: `calc(90vw - ${theme.spacing(2) * 2}px)`
		}
	},
	card: {
		padding: 10,
		borderRadius: '16px',
		backgroundColor: 'rgba(0, 0, 0, 0)',
		margin: theme.spacing(7, 0),
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: '90%'
	},
	listItem: {
		display: 'flex'
	},
	listText: {
		flex: 15
	},
	bullet: {
		flex: 1,
		fontSize: 15,
		position: 'relative',
		left: -10
	}
	// header: {
	// 	marginBottom: 20
	// }
}))
