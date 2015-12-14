'use strict';

import React, {
	StyleSheet,
	PropTypes,
	View,
	Image,
	Text,
	TouchableOpacity,
	Dimensions,
	Platform
} from 'react-native';

export default class NavigationBar extends React.Component{

	static propTypes = {
		title: PropTypes.string.isRequired,
		//not include the height of statusBar on ios platform
		height: PropTypes.number,
		titleColor: PropTypes.string,
		backgroundColor: PropTypes.string,
		leftButtonTitle: PropTypes.string,
		leftButtonTitleColor: PropTypes.string,
		onLeftButtonPress: PropTypes.func,
		rightButtonTitle: PropTypes.string,
		rightButtonTitleColor: PropTypes.string,
		onRightButtonPress: PropTypes.func
	}

	static defaultProps = {
		height: 44,
		titleColor: '#000',
		backgroundColor: '#f5f3f4',
		leftButtonTitle: null,
		leftButtonTitleColor: '#000',
		rightButtonTitle: null,
		rightButtonTitleColor: '#000'
	}

	_renderLeftIcon() {
		if(this.props.leftButtonIcon){
			return (
				<Image style={styles.leftButtonIcon} resizeMode={'contain'} source={this.props.leftButtonIcon} />
			);
		}
		return null;
	}

	_renderRightIcon() {
		if(this.props.rightButtonIcon){
			return (
				<Image style={styles.rightButtonIcon} resizeMode={'contain'} source={this.props.rightButtonIcon} />
			);
		}
		return null;
	}

	_onLeftButtonPressHandle(event) {
		let onPress = this.props.onLeftButtonPress;
		typeof onPress === 'function' && onPress(event);
	}

	_onRightButtonPressHandle(event) {
		let onPress = this.props.onRightButtonPress;
		typeof onPress === 'function' && onPress(event);
	}

	render() {
		let height = Platform.OS === 'ios' ? this.props.height + 20 : this.props.height;
		return (
			<View style={[styles.container, {
				height: height,
				backgroundColor: this.props.backgroundColor
			}]}>

				<TouchableOpacity onPress={this._onLeftButtonPressHandle.bind(this)}>
					<View style={styles.leftButton}>
						{this._renderLeftIcon()}
						<Text style={[styles.leftButtonTitle, {color: this.props.leftButtonTitleColor}]}>
							{this.props.leftButtonTitle}
						</Text>
					</View>
				</TouchableOpacity>

				<View style={styles.title}>
					<Text style={[styles.titleText, {color: this.props.titleColor}]} numberOfLines={1}>
						{this.props.title}
					</Text>
				</View>

				<TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
					<View style={styles.rightButton}>
						{this._renderRightIcon()}
						<Text style={[styles.rightButtonTitle, {color: this.props.rightButtonTitleColor}]}>
							{this.props.rightButtonTitle}
						</Text>
					</View>
				</TouchableOpacity>

			</View>
		);
	}
};

let styles = StyleSheet.create({
	container: { 
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		flexDirection: 'row',
		width: Dimensions.get('window').width
	},
	leftButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 90,
		paddingTop: 1,
		paddingLeft: 8
	},
	leftButtonIcon: {
		width: 12,
		height: 15,
		marginRight: 6
	},
	leftButtonTitle: {
		fontSize: 15
	},
	title: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 1,
		justifyContent: 'center',
		width: Dimensions.get('window').width - 200,
		overflow: 'hidden'
	},
	titleText: {
		fontSize: 18,
		fontWeight: '400'
	},
	rightButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: 90,
		paddingTop: 1,
		paddingRight: 8
	},
	rightButtonIcon: {
		width: 10,
		height: 15
	},
	rightButtonTitle: {
		fontSize: 15
	}
});

if(Platform.OS === 'ios'){
	styles = {
		...styles,
		container: {
			flex: 1,
			position: 'absolute',
			top: 0,
			left: 0,
			flexDirection: 'row',
			width: Dimensions.get('window').width,
			paddingTop: 20
		},
		rightButton: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center',
			width: 90,
			paddingTop: 1,
			paddingRight: 8
		}
	}
}
