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
	print: (configuration: Record<string, any>) => Promise<void>;
	/**
	 * Close the headless browser
	 *
	 * @returns {void}
	 */
	close: () => Promise<void>;
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

export interface PapyrusConfiguration {
	template: string;
	outputOptions: Record<string, any>;
}

export type DataTransformer = (
	data: Record<string, any>,
) => Record<string, any>;

export default function buildMakePapyrus({
	Browser,
	TemplatingEngine,
}: {
	Browser: Browser;
	TemplatingEngine: TemplatingEngine;
}) {
	return function makePapyrus(configuration: PapyrusConfiguration): Papyrus {
		return Object.freeze({
			print: async (data: Record<string, any>, transform?: DataTransformer) => {
				await Browser.initialise();

				let templateData: Record<string, any> = data;
				if (transform !== undefined) templateData = transform(templateData);

				const html: string = await TemplatingEngine.compile(
					configuration.template,
					templateData,
				);

				await Browser.display(html);

				await Browser.print(configuration.outputOptions);
				await Browser.close();
			},
		});
	};
}