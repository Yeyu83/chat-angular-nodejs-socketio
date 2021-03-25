import { Router, Request, Response } from 'express';


const router = Router();

router.get('/messages', (req: Request, res: Response): void => {
    res.json({ message: "GET" });
});

router.post('/messages', (req: Request, res: Response): void => {
    const { cuerpo, de } = req.body; // body-parser
    res.json({ message: "POST", cuerpo, de });
});

router.post('/messages/:id', (req: Request, res: Response): void => {
    const { cuerpo, de } = req.body;
    const id = req.params.id; // para capturar los parámetros de la ruta
    res.json({ message: "POST", cuerpo, de, id });
});

export default router;