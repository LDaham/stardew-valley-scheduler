import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import enMessages from "../../messages/en.json";

type Messages = Record<string, unknown>;

// 영어를 기준으로 로케일 메시지를 덮어쓴다(deep merge).
// → 새 언어 파일에는 번역된 게임 용어만 담고, 누락된 앱 UI 문구는 영어로 폴백된다.
function deepMerge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = out[k];
    if (
      v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      b &&
      typeof b === "object" &&
      !Array.isArray(b)
    ) {
      out[k] = deepMerge(b as Messages, v as Messages);
    } else {
      out[k] = v;
    }
  }
  return out;
}

// 요청별 로케일 결정 및 메시지 로드(영어 폴백 병합)
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = enMessages as Messages;
  const messages =
    locale === "en"
      ? base
      : deepMerge(base, (await import(`../../messages/${locale}.json`)).default);

  return { locale, messages };
});
