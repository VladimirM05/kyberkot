declare module '*.module.pcss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.jpg' {
	const value: string;
	export default value;
}

declare module '*.jpeg' {
	const value: string;
	export default value;
}

declare module '*.png' {
	const value: string;
	export default value;
}
