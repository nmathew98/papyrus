import { Browser } from "../entities/papyrus/papyrus";
import puppeteer, {
	Browser as PuppeteerBrowser,
	Page as PuppeteerPage,
} from "puppeteer";

let browser: PuppeteerBrowser;
let page: PuppeteerPage;

const Puppeteer: Browser = Object.freeze({
	initialise: async () => {
		browser = await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		page = await browser.newPage();
	},
	display: async (content: string) => {
		if (page !== undefined) await page.setContent(content);
	},
	print: async (configuration: Record<string, any>) => {
		if (page !== undefined) await page.pdf(configuration);
	},
	close: async () => {
		if (browser !== undefined) await browser.close();
	},
});

export default Puppeteer;
