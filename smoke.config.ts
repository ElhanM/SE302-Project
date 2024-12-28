import { PlaywrightTestConfig } from '@playwright/test'
import base from './playwright.config'

const config: PlaywrightTestConfig = {
  ...base,
  testDir: 'tests/smoke',
}

export default config
