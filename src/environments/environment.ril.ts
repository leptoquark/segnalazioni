
import { FormioAppConfig } from "@formio/angular";

export const environment = {
  production: true,
};

export const AppConfig: FormioAppConfig = {
   appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   apiUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   icons: 'fontawesome'
  };

export const EnvConfig: any = {
   appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   backendUrl: 'http://segnalazioni-backend-gitlab-segnalazioni-ril.apps.ocp.premaster.local',
   formId: 'segnalazione-dev',
   jwt_user: 'segnalazioni',
   jwt_password: 'segnalazionipasswordanac',
   formio_auth_token: '0bcb5c5072646fee3d0a21543cfcc6fb'
}