import { test, expect } from '@playwright/test'
import { BlogPage } from '../../page-objects/BlogPage'

test.describe('Blog Page', () => {
  let blogPage: BlogPage

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page)
    await blogPage.visit()
    await page.waitForLoadState('networkidle')
  })

  test('should display the latest articles title', async ({ page }) => {
    await expect(blogPage.latestArticlesTitle).toBeVisible()
    await expect(blogPage.latestArticles).toBeVisible()
    const firstArticle = blogPage.articles.first()
    await expect(firstArticle).toBeVisible()
    const image = await blogPage.getArticleImage(firstArticle)
    await expect(image).toBeVisible()
    const caption = await blogPage.getArticleCaption(firstArticle)
    await expect(caption).toBeVisible()
    const metadata = await blogPage.getArticleMetadata(firstArticle)
    await expect(metadata).toBeVisible()
    const title = await blogPage.getArticleTitle(firstArticle)
    await expect(title).toBeVisible()

    const author = await blogPage.getArticleAuthor(firstArticle)
    await expect(author).toBeVisible()
    const comments = await blogPage.getArticleComments(firstArticle)
    await expect(comments).toBeVisible()
    const views = await blogPage.getArticleViews(firstArticle)
    await expect(views).toBeVisible()
    const timestamp = await blogPage.getArticleTimestamp(firstArticle)
    await expect(timestamp).toBeVisible()

    const authorText = await blogPage.getArticleAuthor(firstArticle)
    await expect(authorText).toBeVisible()

    const articleLink = await blogPage.getArticleLink(firstArticle)
    await expect(articleLink).toBeVisible()

    await articleLink.click({ force: true })
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/index.php?route=extension/maza/blog/article')
  })
})
