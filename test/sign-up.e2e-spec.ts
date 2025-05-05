import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Pizza Shop')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('johndoe@example.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('123812641264')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Invalid Name')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('Fulano Ciclano')
  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('aasdsasd@asdae.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('142641264')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
