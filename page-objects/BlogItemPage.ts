import { Locator, Page } from '@playwright/test'

export class BlogItemPage {
  readonly page: Page
  readonly title: Locator
  readonly author: Locator
  readonly commentsNumber: Locator
  readonly views: Locator
  readonly image: Locator
  readonly description: Locator
  readonly addCommentTitle: Locator
  readonly comments: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('h1.h1')
    this.author = page.locator('a.author')
    this.commentsNumber = page.locator('span.extra-comments')
    this.views = page.locator('span.extra-viewed')
    this.image = page.locator('img.img-fluid.mx-auto')
    this.description = page.locator('div.description')
    this.addCommentTitle = page.locator('h4.content-title.mb-3')
    this.comments = page.locator('li.media.comment')
  }

  async visit() {
    await this.page.goto(
      '/index.php?route=extension/maza/blog/article&article_id=37',
    )
  }
}
