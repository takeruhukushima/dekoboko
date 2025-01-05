import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";

export const createClient = async () => {
  const publicUrl = process.env.PUBLIC_URL;

  const url = publicUrl || `http://127.0.0.1:3000`;
  const enc = encodeURIComponent;

  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "AT Protocol Express App",
      client_id: publicUrl
        ? `${url}/client-metadata.json`
        : `http://localhost?redirect_uri=${enc(
            `${url}/api/oauth/callback`
          )}&scope=${enc("atproto transition:generic")}`,
      client_uri: url,
      redirect_uris: [`${url}/api/oauth/callback`],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    },
    stateStore: new StateStore(),
    sessionStore: new SessionStore(),
  });
};