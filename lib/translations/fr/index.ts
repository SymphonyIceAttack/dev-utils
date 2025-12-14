import { base64Encoder } from "./base64-encoder";
import { common } from "./common";
import { encodingConverter } from "./encoding-converter";
import { home } from "./home";
import { layout } from "./layout";
import { md5Generator } from "./md5-generator";
import { passwordGenerator } from "./password-generator";
import { tools } from "./tools";
import { urlEncoder } from "./url-encoder";

export const translations_fr: { [key: string]: string } = {
  ...common,
  ...home,
  ...layout,
  ...tools,
  ...urlEncoder,
  ...base64Encoder,
  ...md5Generator,
  ...encodingConverter,
  ...passwordGenerator,
};

export default translations_fr;
