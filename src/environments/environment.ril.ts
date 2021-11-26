
import { FormioAppConfig } from "@formio/angular";

export const environment = {
  production: true,
};

export const AppConfig: FormioAppConfig = {
   appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   apiUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
  };

export const EnvConfig: any = {
   appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   backendUrl: 'http://segnalazioni-backend-segnalazioni-ril.apps.ocp.premaster.local',
   formId: 'segnalazione-dev',
   jwt_user: 'segnalazioni',
   jwt_password: 'segnalazionipasswordanac'
}