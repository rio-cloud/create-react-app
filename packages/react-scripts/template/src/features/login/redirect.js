import { Log, UserManager } from 'oidc-client';

export default function handleLoginRedirect() {
  const runsInIframe = window && window.parent && window.parent !== window;

  if (runsInIframe) {
    // Silent redirect within an <iframe>
    Log.logger = console;
    Log.level = Log.INFO;

    // This will propagate the received information provided via
    // query parameters to the parent frame
    new UserManager({}).signinSilentCallback();
  } else {
    // TODO: If your SPA lives inside the main frontend bucket you need to
    //       redirect to a "physical" `/index.html` because the bucket
    //       is configured to return the root index of the monolith if no
    //       exact match is found
    window.location.href = window.location.href.replace('/redirect', '/');
  }
}
