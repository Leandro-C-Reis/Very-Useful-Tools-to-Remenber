import { Request, Response } from 'express';
import Tool from '../models/tool';

class ToolsController {
  async index(request: Request, response: Response) {
    const result = await Tool.find();
  
    const tools = result.map((tool: any) => {
      return {
       id: tool.id,
       title: tool.title,
       link: tool.link,
       description: tool.description,
       tags: tool.tags
     }
   })
  
    response.json(tools);
  }

  async show(request: Request, response: Response) {
    const tag = request.query.tag;
  
    if (!tag) {
      response.status(400).json({ message: "Nenhuma tag requisitada." })
    }
  
    const result = await Tool.find({ tags: tag })
  
    if (!result) {
      response.status(404).json({ message: "Nenhuma tag encontrada." })
    }
  
    const tools = result.map((tool: any) => {
       return {
        id: tool.id,
        title: tool.title,
        link: tool.link,
        description: tool.description,
        tags: tool.tags
      }
    })
  
    response.json(tools);
  }

  async create(request: Request, response: Response) {
    const { title, link, description, tags} = request.body;
  
    if (title == null || link == null || description == null || tags == null) {
      response.status(406).json({ message: "Informações incompletas." });
    }
  
    let id: number;
    const last: any = await Tool.find({}).sort({_id: -1}).limit(1);
   
    if (last.length === 0) {
      id = 1;
    }
    else {
      id = Number(last[0].id) + 1;
    }
     const status = await Tool.create({
      id,
      title,
      link,
      description,
      tags
    }) 
  
    if (!status) response.status(501).json({ message: "Erro ao comunicar com banco de dados." })
  
    response.status(201).json({ id, title, link, description, tags });
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
   
    const status = await Tool.deleteOne({ id: Number(id) });
  
    if (status.n === 0){
      response.status(404).json({ message: `Nenhuma ferramenta encontrada com id: ${id}` })
    }else {
      response.status(204).json();
    }
  }
}

export default ToolsController;