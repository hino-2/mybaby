import uniqid from "uniqid";
import { formatDate } from "./utils.ts";

export const sortByDate = (a, b) => new Date(a.date) - new Date(b.date);

const getDiffInDays = (dateA, dateB) => Math.abs(Math.floor((dateB - dateA) / (1000 * 60 * 60 * 24)));

const getDiffInMonths = (dateA, dateB) => {
	let diff = dateB.getMonth() - dateA.getMonth();
	diff = diff < 0 ? diff + 12 : diff;
	return Math.abs(diff);
};

const getNextMonthAndYear = (currMonth, currYear) => {
	let nextMonth = currMonth + 1;
	let nextYear = currYear;
	if (nextMonth >= 13) {
		nextMonth = 1;
		nextYear++;
	}
	return [nextMonth, nextYear];
};

export const enrichWeights = (weights) => {
	let currWeights = weights.slice();
	let newWeights = [];

	weights.forEach((item, i, arr) => {
		if (!arr[i + 1]) return;

		const dateA = new Date(item.date);
		const dateB = new Date(arr[i + 1].date);
		const diffInDays = getDiffInDays(dateA, dateB);
		const diffInMonths = getDiffInMonths(dateA, dateB);
		const incByDay = (arr[i + 1].weight - item.weight) / diffInDays;
		console.log(diffInDays, diffInMonths, incByDay);

		let oldDate = new Date(item.date);
		let newDateMonth = dateA.getMonth();
		let newDateYear = dateA.getFullYear();
		let newWeight = item.weight;
		for (let i = 1; i <= diffInMonths; i++) {
			[newDateMonth, newDateYear] = getNextMonthAndYear(newDateMonth, newDateYear);
			const newDate = new Date(newDateYear, newDateMonth, 1);

			newWeight = Math.floor(newWeight + getDiffInDays(newDate, oldDate) * incByDay);

			if (![...currWeights, ...newWeights].some((w) => formatDate(w.date) === formatDate(newDate)))
				newWeights.push({
					date: newDate,
					weight: newWeight,
					id: uniqid(),
				});

			oldDate = newDate;
		}
	});

	return [...currWeights, ...newWeights].sort(sortByDate);
};

export const saveToDB = async (enrichedWeights) => {
	console.log("saveToDB is not implemented yet. Also,", enrichedWeights);
};
