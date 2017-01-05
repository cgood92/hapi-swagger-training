import express from 'express';
import cors from 'cors';

export const router = express.Router();

const {APP_WEB_BASE_PATH} = process.env;

router.get('/nav', cors(), (req, res) => {
    res.send([
        {
            "href": `${APP_WEB_BASE_PATH}`,
            "text": "Home",
            "rel": "home"
        }
    ]);
});


export default router;
