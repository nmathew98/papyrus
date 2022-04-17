import buildMakePapyrus from "./entities/papyrus/papyrus";
import Puppeteer from "./external/puppeteer";
import Pug from "./external/pug";

export default buildMakePapyrus({ Browser: Puppeteer, TemplatingEngine: Pug });

export { Papyrus, PapyrusConfiguration } from "./entities/papyrus/papyrus";
