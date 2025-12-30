import type { Request, Response } from "express";
import { WikiService } from "../services/wiki-service";
import { SemanticSearchService } from "../services/semantic-search-service";

export class WikiController {
  public static async GetPages(req: Request, res: Response) {
    const pages = await WikiService.getWikiPages();
    res.json(pages);
  }
  public static async GetConnections(req: Request, res: Response) {
    const connections = await WikiService.getWikiConnections();
    res.json(connections);
  }

  public static async SearchWiki(req: Request, res: Response) {
    const { search } = req.body;
    const response = await SemanticSearchService.compareEmbedding(search);
    res.json(response);
  }
}
