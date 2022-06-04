import { readFile } from "fs/promises";

export default function buildMakePapyrus({
	Browser,
	TemplatingEngine,
}: {
	Browser: Browser;
	TemplatingEngine: TemplatingEngine;
}) {
	return function makePapyrus<T = any>(
		configuration: PapyrusConfiguration<T>,
	): Papyrus {
		return Object.freeze({
			print: async (data: Record<string, any>, transform?: DataTransformer) => {
				if (!configuration.template && !configuration.path)
					throw new Error(
						"Either a template or the path to a template must be provided",
					);

				let template: string | undefined;

				if (configuration.template) template = configuration.template;
				else if (configuration.path) {
					const buffer = await readFile(configuration.path);

					template = buffer.toString();
				}

				if (!template) throw new Error("Unable to load template");

				await Browser.initialise();

				let templateData: Record<string, any> = data;
				if (transform !== undefined) templateData = transform(templateData);

				const html: string = await TemplatingEngine.compile(
					template,
					templateData,
				);

				await Browser.display(html);

				await Browser.print(
					configuration.outputOptions,
					configuration.printHook,
				);
				await Browser.close();
			},
		});
	};
}

export interface Papyrus {
	/**
	 * Render a PDF document
	 *
	 * @param {Record<string, any>} data the data to inject
	 * @param {DataTransformer} transform optional data transformer
	 * @returns {void}
	 */
	print: (
		data: Record<string, any>,
		transform?: DataTransformer,
	) => Promise<void>;
}

type PrintHook<T = any> = (
	page: BrowserPage & T,
	configuration: Record<string, any>,
) => Promise<void>;

export interface PapyrusConfiguration<T> {
	outputOptions: Record<string, any>;
	template?: string;
	path?: string;
	printHook?: PrintHook<T>;
}

export interface Browser {
	/**
	 * Initialize the headless browser
	 *
	 * @returns {void}
	 */
	initialise: () => Promise<void>;
	/**
	 * Display some HTML in the browser
	 *
	 * @param {string} content the HTML to display
	 * @returns {void}
	 */
	display: (content: string) => Promise<void>;
	/**
	 * Print the contents in the browser
	 *
	 * @param {Record<string, string | any>} configuration the print configuration
	 * @returns {void}
	 */
	print: (
		configuration: Record<string, any>,
		hook?: PrintHook,
	) => Promise<void>;
	/**
	 * Close the headless browser
	 *
	 * @returns {void}
	 */
	close: () => Promise<void>;
}

export interface BrowserPage {
	pdf: (configuration: Record<string, any>) => Promise<any>;
}

export interface TemplatingEngine {
	/**
	 * Compile a HTML template
	 *
	 * @param {string} template the path to the HTML template
	 * @param {Record<string, any>} data the data to inject
	 * @param {Record<string, any>} configuration optional configuration
	 * @returns {string} the compiled HTML
	 */
	compile: (
		template: string,
		data: Record<string, any>,
		configuration?: Record<string, any>,
	) => Promise<string>;
}

export type DataTransformer = (
	data: Record<string, any>,
) => Record<string, any>;
