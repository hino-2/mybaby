export function formatDate(date: Date): string {
	const _d = new Date(date);
	return _d.toLocaleDateString("en-CA");
}
