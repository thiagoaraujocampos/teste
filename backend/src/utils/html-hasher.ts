import { createHmac } from "crypto";

export class HtmlHasher {
  public static hasher(html: string) {
    const hash = createHmac("sha256", "13").update(html).digest("hex");

    return hash;
  }
}
