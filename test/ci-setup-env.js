"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var core = require("@actions/core");
var serverEnv = "BASE_PATH=https://staging-api.tilled.com\nTILLED_SECRET_KEY=".concat(process.env.TILLED_SECRET_KEY, "\nTILLED_PARTNER_ACCOUNT=").concat(process.env.TILLED_PARTNER_ACCOUNT, "\n");
var clientEnv = "VITE_TILLED_PUBLIC_KEY=".concat(process.env.VITE_TILLED_PUBLIC_KEY, "\nVITE_TILLED_MERCHANT_ACCOUNT_ID=").concat(process.env.VITE_TILLED_MERCHANT_ACCOUNT_ID, "\nVITE_TILLED_CUSTOMER_ID=").concat(process.env.VITE_TILLED_CUSTOMER_ID, "\nVITE_TILLED_MERCHANT_NAME=SDK Test\nVITE_TILLED_MERCHANT_TAX=1\n");
// These .env files need to be created in the react-ts-checkout submodule
// Vite needs the .env file to be in the client directory
// and the env variables to be prefixed with VITE_
function createEnvFiles() {
    core.info('Creating environment files');
    if (!fs.existsSync('/test/project/react/react-ts-checkout')) {
        core.info('The react-ts-checkout submodule does not exist');
        throw new Error('The react-ts-checkout submodule does not exist');
    }
    fs.writeFileSync('/test/project/react/react-ts.checkout/.env', serverEnv);
    fs.writeFileSync('/test/project/react/react-ts.checkout/client/.env', clientEnv);
    core.info('Environment files created');
}
createEnvFiles();
