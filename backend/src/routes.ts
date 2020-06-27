import express from 'express';
import mongoose from 'mongoose';

import ToolsController from './controller/ToolsController';

const routes = express();

mongoose.connect('mongodb+srv://machine:machine@cluster0-qqe7b.mongodb.net/usw?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const toolsController = new ToolsController;

routes.get('/list', toolsController.index);
routes.get('/tools', toolsController.show);
routes.post('/tools', toolsController.create);
routes.delete('/tools/:id', toolsController.destroy);

export default routes;
