import React, { Component } from "react";
import Select from "Select";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import { range } from "lodash";

const DatePickerWrapper = styled.div`
	position: relative;
	display: inline-block;
	border: 1px solid rgb(225, 225, 225);
	border-radius: 2px;
	text-align: center;
	${props => props.focused && `border-color: ${props.theme.colors.primary};`};

	& * {
		outline: none;
	}
`;

const Popup = styled.div`
	position: absolute;
	top: calc(100% + 2px);
	left: -1px;
	width: 325px;
	background: white;
	z-index: 1;
	font-size: 13px;
	border: 1px solid rgb(225, 225, 225);
	padding: ${props => props.theme.spacing.small};
	display: ${props => (props.show ? "block" : "none")};
`;

const MonthYear = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.1em;
	font-weight: bold;

	& > ${MonthYear} {
		flex: 1;
	}

	& > button {
		width: ${props => 100 / 7}%;
		margin: 0;
	}
`;

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;

	& > * {
		display: flex;
		justify-content: center;
		width: ${props => 100 / 7}%;
		padding: ${props => props.theme.spacing.small} 0;
	}

	& > span {
		color: ${props => props.theme.colors.primary};
	}
`;

const Button = styled.button.attrs({
	color: props =>
		props.block ? "rgb(225,225,225)" : props.theme.colors.primary
})`
	cursor: pointer;
	background: none;
	border: 1px solid white;
	border-radius: 2px;
	color: inherit;
	font-size: inherit;
	padding: ${props => props.theme.spacing.small};

	&:hover > svg {
		stroke: ${props => props.color};
	}

	${props =>
		props.block &&
		`cursor: not-allowed;
        color: rgb(225, 225, 225);
        
        & > svg {
            stroke: ${props.color};
        }
    `};

	${props =>
		!props.block &&
		!props.active &&
		`&:hover, &:focus {
		border-color: ${props.color};
		color: ${props.color};
    `};

	${props =>
		props.active &&
		`border-color: ${props.color};
		background: ${props.color};
		color: white;
    `};
`;

const Input = styled.input`
	border: none;
	background: white;
	text-align: center;
	font-size: inherit;
	padding: ${props =>
		`${props.theme.spacing.small} ${props.theme.spacing.normal}`};
`;

const Svg = styled.svg`
	height: 1em;
	vertical-align: -0.1em;
`;

class DatePicker extends Component {
	constructor(props) {
		super(props);

		const currDate = moment(props.date || new Date());
		const month = currDate.month() + 1;
		const year = currDate.year();

		this.currYear = moment().year();

		this.state = {
			focused: false,
			month,
			year,
			day: null,
			days: this.getDaysInMonthYear(month, year),
			date: props.date ? currDate : moment(""),
			value: props.date ? currDate.format(props.format) : ""
		};
	}

	handleFocus = () => {
		this.setState({ focused: true });
	};

	handleBlur = e => {
		if (e.relatedTarget === null) {
			this.setState({ focused: false });

			if (this.state.date.format(this.props.format) !== this.state.value) {
				this.setDate(this.state.value);
			}
		}
	};

	componentDidMount() {
		this.wrapper.addEventListener("focusin", this.handleFocus);
		this.wrapper.addEventListener("focusout", this.handleBlur);
	}

	componentWillUnmount() {
		this.wrapper.removeEventListener("focusin", this.handleFocus);
		this.wrapper.removeEventListener("focusout", this.handleBlur);
	}

	setStateAndUpdateDays = state => {
		this.setState({
			...state,
			days: this.getDaysInMonthYear(
				state.month || this.state.month,
				state.year || this.state.year
			)
		});
	};

	setDay = day => {
		const newDate = moment(
			`${this.state.year}-${this.state.month}-${day}`,
			"YYYY-M-D",
			true
		);

		this.setDate(newDate);
	};

	setDate = date => {
		const newDate = moment(date, this.props.format, true);

		if (newDate.isValid()) {
			this.setState({
				year: newDate.year(),
				month: newDate.month() + 1,
				day: newDate.date(),
				date: newDate,
				value: newDate.format(this.props.format),
				focused: false
			});

			this.props.onChange(newDate.toDate());
		} else {
			this.setState({ value: "" });
		}
	};

	getDaysInMonthYear = (month, year) => {
		const momentDate = moment(`${year}-${month}`, "YYYY-M");
		const days = momentDate.daysInMonth();
		const offset = momentDate.startOf("month").day();

		return range(1 - offset, days + 1);
	};

	moveMonth = amount => {
		const newMonth = this.state.month + amount - 1;
		const numMonths = moment.months().length;

		const month = (newMonth % numMonths + numMonths) % numMonths + 1;
		const year = this.state.year + Math.floor(newMonth / numMonths);

		this.setStateAndUpdateDays({ month, year });
	};

	changeStateField = (field, value) => {
		this.setState({ [field]: value });
	};

	isCurrentDate = day => {
		return (
			this.state.date &&
			this.state.month === this.state.date.month() + 1 &&
			this.state.year === this.state.date.year() &&
			day === this.state.date.date()
		);
	};

	render() {
		const blockLeft =
			this.state.year === this.currYear - this.props.past &&
			this.state.month === 1;
		const blockRight =
			this.state.year === this.currYear + this.props.present &&
			this.state.month === moment.months().length;

		return (
			<DatePickerWrapper
				focused={this.state.focused}
				innerRef={wrapper => (this.wrapper = wrapper)}
			>
				<Input
					type="text"
					name={this.props.name}
					placeholder={`${this.props.placeholder} ${this.props.format}`}
					value={this.state.value}
					onChange={e => this.setState({ value: e.target.value })}
				/>
				<Popup show={this.state.focused} tabIndex={0}>
					<Header>
						<Button
							type="button"
							block={blockLeft}
							onClick={blockLeft ? undefined : () => this.moveMonth(-1)}
						>
							<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
								<path d="M14.5,23a.4984.4984,0,0,1-.3535-.1465l-9-9a.5.5,0,0,1,0-.707l9-9a.5.5,0,1,1,.707.707L6.207,13.5l8.6465,8.6465A.5.5,0,0,1,14.5,23Z" />
							</Svg>
						</Button>
						<MonthYear>
							<Select
								value={this.state.month}
								onChange={e =>
									this.setStateAndUpdateDays({
										month: parseInt(e.target.value, 10)
									})
								}
							>
								{moment.months().map((month, index) => (
									<option key={index} value={index + 1} label={month}>
										{month}
									</option>
								))}
							</Select>
							<Select
								value={this.state.year}
								onChange={e =>
									this.setStateAndUpdateDays({
										year: parseInt(e.target.value, 10)
									})
								}
							>
								{range(
									this.currYear + this.props.present,
									this.currYear - this.props.past - 1,
									-1
								).map((year, index) => (
									<option key={index} value={year}>
										{year}
									</option>
								))}
							</Select>
						</MonthYear>
						<Button
							type="button"
							block={blockRight}
							onClick={blockRight ? undefined : () => this.moveMonth(1)}
						>
							<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
								<path d="M9.5,23a.4984.4984,0,0,0,.3535-.1465l9-9a.5.5,0,0,0,0-.707l-9-9a.5.5,0,0,0-.707.707L17.793,13.5,9.1465,22.1465A.5.5,0,0,0,9.5,23Z" />
							</Svg>
						</Button>
					</Header>
					<Grid>
						{moment
							.weekdaysShort()
							.map((day, index) => <span key={index}>{day}</span>)}
						{this.state.days.map(
							(day, index) =>
								day < 1 ? (
									<span key={index} />
								) : (
									<Button
										type="button"
										key={index}
										active={this.isCurrentDate(day)}
										onClick={() => this.setDay(day)}
									>
										{day}
									</Button>
								)
						)}
					</Grid>
				</Popup>
			</DatePickerWrapper>
		);
	}
}

DatePicker.propTypes = {
	name: PropTypes.string,
	format: PropTypes.string,
	date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	placeholder: PropTypes.string,
	past: PropTypes.number,
	present: PropTypes.number,
	onChange: PropTypes.func.isRequired
};

DatePicker.defaultProps = {
	format: "DD/MM/YYYY",
	placeholder: "",
	past: 120,
	present: 0
};

export default DatePicker;

export const DatePickerField = props => (
	<DatePicker
		{...props}
		date={props.input.value}
		onChange={props.input.onChange}
	/>
);
