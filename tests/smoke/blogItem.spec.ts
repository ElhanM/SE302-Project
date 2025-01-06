import { test, expect } from '@playwright/test'
import { BlogItemPage } from '../../page-objects/BlogItemPage'

test.describe('Blog Item Page', () => {
  let blogItemPage: BlogItemPage

  test.beforeEach(async ({ page }) => {
    blogItemPage = new BlogItemPage(page)
    await blogItemPage.visit()
  })

  test('should display all elements', async () => {
    await expect(blogItemPage.title).toBeVisible()
    await expect(blogItemPage.author).toBeVisible()
    await expect(blogItemPage.commentsNumber).toBeVisible()
    await expect(blogItemPage.views).toBeVisible()
    await expect(blogItemPage.image).toBeVisible()
    await expect(blogItemPage.description).toBeVisible()
    await expect(blogItemPage.addCommentTitle).toBeVisible()
    await expect(blogItemPage.comments.first()).toBeVisible()
  })
})
