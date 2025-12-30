import { Page as wikiPage } from "wikijs";
import { WikiDataManipulationService } from "./wiki-data-manipulation-service";
import { WikiRepository } from "../repository/wiki-repository";
import { SemanticSearchService } from "./semantic-search-service";
import { WikiOp } from "../api/wiki-op";
import { normalizeText } from "../utils/formatter";

export interface Page {
  id: number;
  name: string;
  link: string;
  html: string;
  categories: string[];
  embedding: number[];
  connections?: number[];
}

export interface Connection {
  originPage: number;
  targetPage: number;
}

export class WikiService {
  public static async GetPages() {
    const pageRecords = await WikiDataManipulationService.GetPages();

    if (!pageRecords) {
      throw new Error("deu erro no GetAllPages da service");
    }

    const allPagesObjects: Page[] = [];

    while (pageRecords.length > 0) {
      console.log("processing pages", pageRecords.length);
      const pageBatch = pageRecords.splice(0, 20);

      const pageBatchPromisse = pageBatch.map((page) => {
        return WikiService.FormatPage(page[1]);
      });

      const formatedPages = await Promise.all(pageBatchPromisse);

      const filteredPages = formatedPages.filter((page) => !!page);

      console.log("update page %i embeddings", filteredPages.length);

      await this.UpdatePagesEmbeddings(filteredPages);
      await WikiRepository.UpdatePage(filteredPages);
      allPagesObjects.push(...filteredPages);
    }

    return allPagesObjects;
  }

  private static async FormatPage(page: wikiPage) {
    try {
      const [wikiText, categories] = await Promise.all([
        await WikiOp.getWikiText(page.raw.title),
        await page.categories(),
      ]);

      if (!wikiText) return;
      const cleanWikiText = normalizeText(wikiText);

      const pageObj: Page = {
        id: page.raw.pageid,
        name: page.raw.title,
        link: page.raw.fullurl,
        embedding: [],
        categories,
        html: cleanWikiText,
      };

      return pageObj;
    } catch (error) {
      console.log("erro no formatPage: ", error);
    }
  }

  private static async UpdatePagesEmbeddings(pages: Page[]) {
    for (const page of pages) {
      page.embedding = await SemanticSearchService.getEmbedding(
        page.html,
        "passage"
      );
    }
  }

  public static async UpdatePageConnections() {
    const allPages = await this.GetPages();

    for (const page of allPages) {
      console.log("processing connections", allPages.length);

      const getPageConnections = await WikiDataManipulationService.GetPageLinks(
        page.html
      );

      const connections: Connection[] = [];

      for (const entrie of getPageConnections) {
        const connection = allPages.find((page) => {
          return page.name == entrie[1];
        });

        if (!connection) {
          continue;
        }
        connections.push({
          originPage: Math.max(page.id, connection.id),
          targetPage: Math.min(page.id, connection.id),
        });
      }
      await WikiRepository.UpdateConnection(connections);
    }
  }

  public static async getWikiPages() {
    const pages = await WikiRepository.GetPages();
    return pages;
  }

  public static async getWikiConnections() {
    const connection = await WikiRepository.GetConnections();
    return connection;
  }
}
