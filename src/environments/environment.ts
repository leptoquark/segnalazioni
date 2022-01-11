import { FormioAppConfig } from "@formio/angular";

export const environment = {
  production: false
};

export const AppConfig: FormioAppConfig = {
  appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
  apiUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
  icons: 'fontawesome'
}

export const EnvConfig: any = {
  appUrl: 'http://nodejs-mongodb-formio-segnalazioni-ril.apps.ocp.premaster.local',
  backendUrl: 'http://segnalazioni-backend-gitlab-segnalazioni-ril.apps.ocp.premaster.local',
  formId: 'segnalazione-dev',
  jwt_user: 'segnalazioni',
  jwt_password: 'segnalazionipasswordanac'
}