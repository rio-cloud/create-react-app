import omit from 'lodash/fp/omit';
import { UserProfileType } from './types';

function stripSnakeProps(a: object): object {
    return omit(['family_name', 'given_name'], a);
}

// TODO: Depending on your client subscriptions you may want to map
//       additional properties from the OAuth profile
export const mapUserProfile: (a: any) => UserProfileType = (profile = {}) => ({
    azp: profile.azp,
    email: profile.email,
    familyName: profile.family_name,
    givenName: profile.given_name,
    locale: profile.locale,
    name: profile.name,
    sub: profile.sub,
    ...stripSnakeProps(profile),
});
