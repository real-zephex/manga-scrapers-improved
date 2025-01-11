import axios from "axios";

interface ScraperResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class BaseScraper {
  url: string;
  timeout = 5000;
  throwErrors: boolean;

  constructor(url: string, throwErrors = false, timeout: number = 5000) {
    this.url = url;
    this.throwErrors = throwErrors;
    this.timeout = timeout;
  }

  static handleError(error: any, throwErrors: boolean): ScraperResponse {
    const errorMessage = `Failed to fetch data from the site. Error: ${
      error.message || error
    }`;
    if (throwErrors) {
      throw new Error(errorMessage);
    }
    return {
      success: false,
      error: errorMessage,
    };
  }

  async htmlScraper(
    url: string = this.url,
    method: string = "GET",
    text: FormData = new FormData(),
    headers = {}
  ): Promise<ScraperResponse> {
    try {
      const response =
        method === "GET"
          ? await axios({
              url: url,
              method: method,
              timeout: this.timeout,
              headers,
            })
          : await axios({
              url: url,
              method: method,
              timeout: this.timeout,
              data: text,
              headers,
            });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const errorMessage = `Failed to fetch data from the site. Error: ${error}`;
      if (this.throwErrors) {
        throw new Error(errorMessage);
      }
      return BaseScraper.handleError(error, this.throwErrors);
    }
  }
}

export default BaseScraper;
