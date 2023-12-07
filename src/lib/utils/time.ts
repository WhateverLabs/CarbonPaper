export const timeUntil = (date: Date) => {
	const now = new Date();
	const diff = date.getTime() - now.getTime();

	if (diff < 0) {
		return 'Date must be in the future';
	}

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
	if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
	if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
	if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
	if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
	if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''}`;

	return 'Just now';
};
