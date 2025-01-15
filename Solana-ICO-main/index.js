import express from 'express';
import cors from 'cors';
import {ConvertWithUSDTApi,ConvertWithSOLApi,TransferVLNapi,VLNPriceFun,RemainingTokenApi} from './BuyWithUSDT.js'; // Corrected ES6 import
import {UsdtRaisedApi} from './UsdtRaised.js';
const app = express();
app.use(cors());
app.use(express.json());
// RaisedUsdt()
// Use the imported API handler as the callback for this route
app.get('/Vln-Amount-Getting', VLNPriceFun);
app.get('/Remaining-token-api', RemainingTokenApi);
app.get('/Usdt-amount-raised',UsdtRaisedApi)
app.post('/Usdt-Conversion-Api', ConvertWithUSDTApi);
app.post('/Sol-Conversion-Api', ConvertWithSOLApi);
app.post('/VLN-Token-Transfer-Api', TransferVLNapi);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
