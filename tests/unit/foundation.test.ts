import { describe, expect, it } from 'vitest'
import { defaultBranding } from '../../src/app/config/branding'

describe('foundation', () => { it('keeps business identity in configuration', () => { expect(defaultBranding.name).toBe('ShopEazy') }) })