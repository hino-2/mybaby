import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import uniqid from "uniqid";
import BabiesList from "../BabiesList";
import WeightList from "../WeightList";
import { bigButton } from "../../utils/buttonStyles";
import { sortByDate, enrichWeights, saveToDB } from "../../Logic/weight-calc";
import "./style.scss";

const addweightEntryButtonStyle = {
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
const useStylesAddButton = makeStyles(addweightEntryButtonStyle);
const useStylesCalcButton = makeStyles(calculateButtonStyle);

const WeightCalc = () => {
	const user = useSelector((state) => state.user);

	const [state, setState] = useState({
		babies: user ? user.babies : genericBabies,
		selectedBabyId: null,
		selectedBabyweights: [],
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
		disabled: state.selectedBabyweights.length > 1 ? false : true,
	};

	const addweightEntry = () => {
		setState((prev) => {
			return {
				...prev,
				selectedBabyweights: [
					...prev.selectedBabyweights,
					{
						date: "",
						weight: "",
						id: uniqid(),
					},
				],
			};
		});
	};

	const deleteweightEntry = (e) => {
		e.preventDefault();
		e.persist();
		setState((prev) => {
			return {
				...prev,
				selectedBabyweights: prev.selectedBabyweights.filter((weight) => weight.id !== e.target.id),
			};
		});
	};

	const loadParams = (e) => {
		const babyLIId = e.target.closest(".baby-li").id;
		setState((prev) => {
			return {
				...prev,
				selectedBabyId: babyLIId,
				selectedBabyweights: prev.babies.find((baby) => baby.id === babyLIId).weights.sort(sortByDate),
			};
		});
	};

	const calculateAndSaveWeights = async () => {
		const enrichedWeights = enrichWeights(state.selectedBabyweights);
		saveToDB(enrichedWeights);

		setState((prev) => {
			return {
				...prev,
				selectedBabyweights: enrichedWeights,
			};
		});
	};

	return (
		<div className="weight-calc">
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
				<WeightList weights={state.selectedBabyweights} deleteweight={deleteweightEntry} />
			</div>
			<div className="buttons">
				<div>
					<Button {...addButtonProps} onClick={addweightEntry}>
						Добавить дату и вес
					</Button>
				</div>
				<div>
					<Button {...calcButtonProps} onClick={calculateAndSaveWeights}>
						Рассчитать и сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default WeightCalc;

const genericBabies = [
	{
		name: "Мальчик",
		gender: "m",
		id: "genericBoy",
		weights: [],
	},
	{
		name: "Девочка",
		gender: "f",
		id: "genericGirl",
		weights: [],
	},
];
