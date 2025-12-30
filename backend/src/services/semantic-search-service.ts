import { FeatureExtractionPipeline, pipeline } from "@huggingface/transformers";
import { WikiRepository } from "../repository/wiki-repository";

export class SemanticSearchService {
  private static featureExtractionPipeline: Promise<FeatureExtractionPipeline>;

  public static loadFeatureExtraction() {
    const extractor = pipeline(
      "feature-extraction",
      "Xenova/multilingual-e5-small",
      {
        dtype: "int8",
      }
    );

    console.log("pipelone loaded");

    this.featureExtractionPipeline = extractor;
  }

  public static async getEmbedding(text: string, prefix: string) {
    const pipeline = await this.featureExtractionPipeline;

    const response = await pipeline(`${prefix}: ${text}`, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(response.data);
  }

  public static async compareEmbedding(searchQuery: string) {
    const embedding = await this.getEmbedding(searchQuery, "query");
    return WikiRepository.ListPagebySimilarity(embedding);
  }
}
