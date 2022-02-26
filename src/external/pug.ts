import pug from "pug";
import { TemplatingEngine } from "../entities/papyrus/papyrus";

const Pug: TemplatingEngine = Object.freeze({
	compile: async (template: string, data: Record<string, any>) => {
		const fn = pug.compile(template);

		return fn(data);
	},
});

export default Pug;
