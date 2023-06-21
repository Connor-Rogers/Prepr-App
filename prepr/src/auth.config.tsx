import { isPlatform } from "@ionic/react";

export const domain = "{DOMAIN}";
export const clientId = "{CLIENT_ID} ";
const appId = "com.prepr.app";

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const iosOrAndroid = isPlatform('hybrid');

export const callbackUri = iosOrAndroid
  ? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  : 'http://localhost:8100';