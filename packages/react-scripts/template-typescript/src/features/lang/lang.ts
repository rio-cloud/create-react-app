import defaultTo from 'lodash/fp/defaultTo';
import flow from 'lodash/fp/flow';
import head from 'lodash/fp/head';
import split from 'lodash/fp/split';

import { addLocaleData } from 'react-intl';
import cs from 'react-intl/locale-data/cs';
import da from 'react-intl/locale-data/da';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import et from 'react-intl/locale-data/et';
import fr from 'react-intl/locale-data/fr';
import it from 'react-intl/locale-data/it';
import lt from 'react-intl/locale-data/lt';
import lv from 'react-intl/locale-data/lv';
import nl from 'react-intl/locale-data/nl';
import no from 'react-intl/locale-data/no';
import pl from 'react-intl/locale-data/pl';
import pt from 'react-intl/locale-data/pt';
import ro from 'react-intl/locale-data/ro';
import sk from 'react-intl/locale-data/sk';
import sv from 'react-intl/locale-data/sv';

export const DEFAULT_LOCALE: string = 'en-GB';

// React Intl relies on locale data to support its plural and relative-time
// formatting features, even if your application doesn't support all of these they
// should still be adding all officially supported locales

// TODO: Check whether you added all necessary locales
addLocaleData([
    ...cs,
    ...da,
    ...de,
    ...en,
    ...es,
    ...et,
    ...fr,
    ...it,
    ...lt,
    ...lv,
    ...nl,
    ...no,
    ...pl,
    ...pt,
    ...ro,
    ...sk,
    ...sv,
]);

/*
  Locales returned by UserAdmin Service:
  cs-CZ
  da-DK
  de-DE
  en-US
  es-ES
  et-EE
  fr-FR
  it-IT
  lt-LT
  lv-LV
  nl-NL
  no-NO
  pl-PL
  pt-PT
  ro-RO
  sk-SK
  sv-SE
*/
// We're keeping a map of supported locales and the
// default locales for languages without locale for
// being able to tell whether a CDN lookup makes
// sense or not.
// TODO: Remember to add all supported translations for your App
export const supportedLocaleMap: { [key: string]: string } = {
    'de': 'de-DE',
    'de-DE': 'de-DE',
    'en': 'en-GB',
    'en-GB': 'en-GB',
};

export function extractLanguage(a: string): string | undefined {
    return flow(
      defaultTo(DEFAULT_LOCALE),
      split('-'),
      head
    )(a);
}

export const DEFAULT_LANG: string | undefined = extractLanguage(DEFAULT_LOCALE);
