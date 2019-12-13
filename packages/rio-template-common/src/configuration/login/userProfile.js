import omit from 'lodash/fp/omit';

const stripSnakeProps = omit(['family_name', 'given_name']);

// TODO: Depending on your client subscriptions you may want to map
//       additional properties from the OAuth profile
export const mapUserProfile = (profile = {}) => ({
    azp: profile.azp,
    email: profile.email,
    familyName: profile.family_name,
    givenName: profile.given_name,
    locale: profile.locale,
    name: profile.name,
    sub: profile.sub,
    ...stripSnakeProps(profile),
});
