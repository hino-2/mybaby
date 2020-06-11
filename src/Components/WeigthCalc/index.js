import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import BabiesList from "../BabiesList";
import WeigthList from "../WeigthList";
import { bigButton } from "../../utils/buttonStyles";
import uniqid from "uniqid";
import "./style.scss";

const addWeigthEntryButtonStyle = {
	...bigButton,
	root: {
		...bigButton.root,
		"&:hover": {
			...bigButton["&.hover"],
			background: "#017301",
		},
		background: "forestgreen",
		height: 40,
		width: "100%",
		border: "none",
	},
	label: {
		...bigButton.label,
		textTransform: "none",
	},
	disabled: {
		background: "grey",
	},
};
const calculateButtonStyle = {
	...bigButton,
	root: {
		...bigButton.root,
		"&:hover": {
			...bigButton["&.hover"],
			background: "#9e8360",
		},
		background: "burlywood",
		height: 40,
		width: "100%",
		border: "none",
	},
	label: {
		...bigButton.label,
		textTransform: "none",
	},
	disabled: {
		background: "grey",
	},
};
const useStylesAddButton = makeStyles(addWeigthEntryButtonStyle);
const useStylesCalcButton = makeStyles(calculateButtonStyle);

const WeigthCalc = () => {
	const user = useSelector((state) => state.user);

	const [state, setState] = useState({
		babies: user
			? user.babies
			: [
					{
						name: "Мальчик",
						gender: "m",
						id: "genericBoy",
						weigths: [],
					},
					{
						name: "Девочка",
						gender: "f",
						id: "genericGirl",
						weigths: [],
					},
			  ],
		selectedBabyId: null,
		selectedBabyWeigths: [],
	});

	const classesAddButton = useStylesAddButton();
	const classesCalcButton = useStylesCalcButton();
	const addButtonProps = {
		classes: {
			root: classesAddButton.root,
			label: classesAddButton.label,
			disabled: classesAddButton.disabled,
		},
		disabled: state.selectedBabyId ? false : true,
	};
	const calcButtonProps = {
		classes: {
			root: classesCalcButton.root,
			label: classesCalcButton.label,
			disabled: classesCalcButton.disabled,
		},
		disabled: state.selectedBabyWeigths.length > 1 ? false : true,
	};

	const addWeigthEntry = () => {
		setState((prev) => {
			return {
				...prev,
				selectedBabyWeigths: [
					...prev.selectedBabyWeigths,
					{
						date: "",
						weigth: "",
						id: uniqid(),
					},
				],
			};
		});
	};

	const deleteWeigthEntry = (e) => {
		e.preventDefault();
		e.persist();
		setState((prev) => {
			return {
				...prev,
				selectedBabyWeigths: prev.selectedBabyWeigths.filter((weigth) => weigth.id !== e.target.id),
			};
		});

		{
			// let newBaby = user.babies.find(baby => baby.id === babyId)
			// console.log(newBaby)
			// newBaby = {
			//     ...newBaby,
			//     weigths: user.babies.find(baby => baby.id === babyId).weigths.filter(item => item.id !== weigth.id)
			// }
			// console.log(newBaby)
			// const newUser = {
			//     ...user,
			//     babies: [
			//         ...user.babies.filter(baby => baby.id !== babyId),
			//         newBaby
			//     ]
			// }
			// console.log(newUser)
			// const response = await fetch('/deleteWeigth', {
			//     method: 'DELETE',
			//     headers: {
			//       'Accept': 'application/json',
			//       'Content-Type': 'application/json'
			//     },
			//     body: JSON.stringify({userId: userId, babyId: babyId, weigth: weigth})
			// })
			// if(response.status !== 200) {
			//     console.log(response.error)
			//     return
			// }
			// const newUser = await response.json()
			// console.log(newUser)
			// setUserCookie('mybaby-user', newUser)
			// dispatch(userLogin(newUser))
		}
	};

	const repaintBordersOnBabiesLI = () => {
		// document.querySelectorAll(".weigth-calc .babies .baby-li").forEach((item) => (item.style.border = ""));
		// if (document.querySelector(`.weigth-calc .babies .baby-li#${state.selectedBabyId}`))
		// 	document.querySelector(`.weigth-calc .babies .baby-li#${state.selectedBabyId}`).style.border = "3px solid green";
	};

	const loadParams = (e) => {
		const babyLIId = e.target.closest(".baby-li").id;
		setState((prev) => {
			return {
				...prev,
				selectedBabyId: babyLIId,
				selectedBabyWeigths: prev.babies.find((baby) => baby.id === babyLIId).weigths,
			};
		});
	};

	const calculateAndSave = () => {
		// let result = [
		// 	...state.selectedBabyWeigths,
		// 	{
		// 		date: "2020-01-01",
		// 		weigth: 4000,
		// 	},
		// 	{
		// 		date: "2020-02-01",
		// 		weigth: 4500,
		// 	},
		// 	{
		// 		date: "2020-03-01",
		// 		weigth: 5000,
		// 	},
		// 	{
		// 		date: "2020-04-01",
		// 		weigth: 5500,
		// 	},
		// ];
	};

	return (
		<div className="weigth-calc">
			<div className="desc">
				<h2>Калькулятор веса</h2>
				<p>
					Я калькулятор веса ваших утят. Я помогу вам рассчитать прибавки в весе и покажу сколько обычно весит
					утенок в этом возрасте.
				</p>
				<h3>Как я работаю:</h3>
				<p>
					Сначала, мне нужно узнать какого пола ваш утенок и когда он появился на свет.
					<br />
					Затем, мне нужны даты и веса, по которым можно рассчитать прибавки.
					<br />
					Не все родители успевают записывать веса своих утят точно по месяцам. Ничего страшного. Укажите
					любую дату и сколько весил ваш утенок в этот день, и я постараюсь рассчитать остальное за вас.{" "}
					<font>Начните с даты рождения!</font>
				</p>
				{user ? (
					<p>
						При рассчете введенные значение сохраняются. Чтобы их не нужно было вводить каждый раз заново,{" "}
						<font>выберите утенка из списка.</font>
					</p>
				) : (
					[]
				)}
			</div>
			<div onClick={loadParams}>
				<BabiesList
					babies={state.babies}
					selectedBabyId={state.selectedBabyId}
					isEditable={false}
					showAge={user !== null}
				/>
			</div>
			<div className="calc">
				<div className="headers">
					<div className="label">Дата</div>
					<div className="label">Вес, г</div>
					<div className="label">Норма, г</div>
					<div>&nbsp;</div>
				</div>
				<WeigthList weigths={state.selectedBabyWeigths} deleteWeigth={deleteWeigthEntry} />
			</div>
			<div className="buttons">
				<div>
					<Button {...addButtonProps} onClick={addWeigthEntry}>
						Добавить дату и вес
					</Button>
				</div>
				<div>
					<Button {...calcButtonProps} onClick={calculateAndSave}>
						Рассчитать и сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default WeigthCalc;
