import { FormioAppConfig } from "@formio/angular";

export const AppConfig: FormioAppConfig = {
   //appUrl: 'http://localhost:3001',
   //apiUrl: 'http://localhost:3001'
   appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   apiUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
  };

export const EnvConfig: any = {
   //appUrl: 'http://localhost:3001',
   //backendUrl: 'http://localhost:8080',
   appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
   backendUrl: 'http://segnalazioni-backend-segnalazioni-ril.apps.ocp.premaster.local',
   formId: 'segnalazione-dev',
   jwt_user: 'segnalazioni',
   jwt_password: 'segnalazionipasswordanac'
 }