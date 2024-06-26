import * as firebase from "firebase-admin";
import * as serviceAccount from "../../key.json";
const configParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

firebase.initializeApp({
  credential: firebase.credential.cert(configParams),
  storageBucket: "gs://movies-challenge-2cfac.appspot.com",
});

export const firestore = firebase.firestore();
firestore.settings({ ignoreUndefinedProperties: true });
export const auth = firebase.auth();
export const storage = firebase.storage().bucket();
