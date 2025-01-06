import { Locator, Page } from '@playwright/test'

export class BlogPage {
  readonly page: Page
  readonly latestArticlesTitle: Locator
  readonly latestArticles: Locator
  readonly articles: Locator

  constructor(page: Page) {
    this.page = page
    this.latestArticlesTitle = page.locator(
      'h3.module-title:has-text("Latest Articles")',
    )
    this.latestArticles = page.locator('div.tab-content').first()
    this.articles = page.locator('div.article-thumb.image-top')
  }

  async visit() {
    await this.page.goto('/index.php?route=extension/maza/blog/home')
  }

  async getArticleImage(article: Locator) {
    return article.locator('div.image img')
  }

  async getArticleCaption(article: Locator) {
    return article.locator('div.caption')
  }

  async getArticleMetadata(article: Locator) {
    const caption = await this.getArticleCaption(article)
    return caption.locator('div.metadata')
  }

  async getArticleTitle(article: Locator) {
    const caption = await this.getArticleCaption(article)
    return caption.locator('h4.title')
  }

  async getArticleAuthor(article: Locator) {
    const metadata = await this.getArticleMetadata(article)
    return metadata.locator('span.author')
  }

  async getArticleComments(article: Locator) {
    const metadata = await this.getArticleMetadata(article)
    return metadata.locator('span.comment')
  }

  async getArticleViews(article: Locator) {
    const metadata = await this.getArticleMetadata(article)
    return metadata.locator('span.viewed')
  }

  async getArticleTimestamp(article: Locator) {
    const metadata = await this.getArticleMetadata(article)
    return metadata.locator('span.timestamp')
  }

  async getArticleLink(article: Locator) {
    const title = await this.getArticleTitle(article)
    return title.locator('a')
  }
}
