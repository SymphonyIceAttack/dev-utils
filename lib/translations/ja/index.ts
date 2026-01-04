import { about } from "./about";
import { base64Encoder } from "./base64-encoder";
import { binaryCodeTranslator } from "./binary-code-translator";
import { common } from "./common";
import { contact } from "./contact";
import { disclaimer } from "./disclaimer";
import { emailTool } from "./email-tool";
import { encodingConverter } from "./encoding-converter";
import { home } from "./home";
import { layout } from "./layout";
import { md5Generator } from "./md5-generator";
import { passwordGenerator } from "./password-generator";
import { privacy } from "./privacy";
import { terms } from "./terms";
import { tools } from "./tools";
import { urlEncoder } from "./url-encoder";
import { uuidGenerator } from "./uuid-generator";

export const translations_ja: { [key: string]: string } = {
  ...common,
  ...home,
  ...layout,
  ...tools,
  ...urlEncoder,
  ...base64Encoder,
  ...md5Generator,
  ...encodingConverter,
  ...passwordGenerator,
  ...uuidGenerator,
  ...binaryCodeTranslator,
  ...emailTool,
  ...about,
  ...privacy,
  ...terms,
  ...contact,
  ...disclaimer,
};

export default translations_ja;
