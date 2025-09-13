import { findProperty } from '../find-property'
import webhookSample1 from './test-samples/webhook-sample1'
import webhookSample2 from './test-samples/webhook-sample2'
import webhookSample3 from './test-samples/webhook-sample3'

describe('findProperty', () => {
  describe('Basic functionality', () => {
    const testObject = {
      level1: {
        level2: {
          targetKey: 'found at level2',
          level3: {
            anotherKey: 'another value',
            targetKey: 'found at level3',
          },
        },
        directKey: 'direct value',
      },
      array: [
        { targetKey: 'found in array item' },
        { otherKey: 'other value' },
      ],
      topLevel: 'top level value',
    }

    it('should find property at nested level and return value with path', () => {
      const result = findProperty(testObject, 'targetKey')
      expect(result).toEqual({
        value: 'found at level2',
        path: ['level1', 'level2', 'targetKey'],
      })
    })

    it('should find property with multiple keys', () => {
      const result = findProperty(testObject, ['nonExistent', 'directKey'])
      expect(result).toEqual({
        value: 'direct value',
        path: ['level1', 'directKey'],
      })
    })

    it('should find property in array with correct path', () => {
      const result = findProperty(testObject.array, 'targetKey')
      expect(result).toEqual({
        value: 'found in array item',
        path: ['0', 'targetKey'],
      })
    })

    it('should return undefined for non-existent key', () => {
      const result = findProperty(testObject, 'nonExistentKey')
      expect(result).toBeUndefined()
    })

    it('should find top level property', () => {
      const result = findProperty(testObject, 'topLevel')
      expect(result).toEqual({
        value: 'top level value',
        path: ['topLevel'],
      })
    })
  })

  describe('Edge cases', () => {
    it('should return undefined for null object', () => {
      const result = findProperty(null, 'key')
      expect(result).toBeUndefined()
    })

    it('should return undefined for undefined object', () => {
      const result = findProperty(undefined, 'key')
      expect(result).toBeUndefined()
    })

    it('should return undefined for primitive values', () => {
      expect(findProperty('string', 'key')).toBeUndefined()
      expect(findProperty(123, 'key')).toBeUndefined()
      expect(findProperty(true, 'key')).toBeUndefined()
    })

    it('should handle empty object', () => {
      const result = findProperty({}, 'key')
      expect(result).toBeUndefined()
    })

    it('should handle empty array', () => {
      const result = findProperty([], 'key')
      expect(result).toBeUndefined()
    })

    it('should handle array of primitives', () => {
      const result = findProperty([1, 2, 3, 'test'], 'key')
      expect(result).toBeUndefined()
    })
  })

  describe('Circular reference handling', () => {
    it('should handle circular references without infinite recursion', () => {
      const obj: any = { key: 'value' }
      obj.circular = obj // Create circular reference

      const result = findProperty(obj, 'key')
      expect(result).toEqual({
        value: 'value',
        path: ['key'],
      })
    })

    it('should not find property in circular reference part', () => {
      const obj: any = { key: 'value' }
      obj.circular = obj

      const result = findProperty(obj, 'circular')
      expect(result).toEqual({
        value: obj,
        path: ['circular'],
      })
    })

    it('should handle deeply nested circular references', () => {
      const obj: any = {
        level1: {
          level2: {
            targetKey: 'found',
          },
        },
      }
      obj.level1.level2.circular = obj

      const result = findProperty(obj, 'targetKey')
      expect(result).toEqual({
        value: 'found',
        path: ['level1', 'level2', 'targetKey'],
      })
    })
  })

  describe('Array handling', () => {
    it('should handle nested arrays', () => {
      const obj = {
        data: [
          [{ nested: 'value1' }],
          [{ nested: 'value2' }, { other: 'value3' }],
        ],
      }

      const result = findProperty(obj, 'nested')
      expect(result).toEqual({
        value: 'value1',
        path: ['data', '0', '0', 'nested'],
      })
    })

    it('should handle mixed arrays and objects', () => {
      const obj = {
        items: [
          { type: 'product', details: { name: 'Item 1' } },
          { type: 'service', details: { name: 'Service 1' } },
        ],
      }

      const result = findProperty(obj, 'name')
      expect(result).toEqual({
        value: 'Item 1',
        path: ['items', '0', 'details', 'name'],
      })
    })

    it('should handle array with null/undefined elements', () => {
      const obj = {
        items: [null, undefined, { target: 'found' }],
      }

      const result = findProperty(obj, 'target')
      expect(result).toEqual({
        value: 'found',
        path: ['items', '2', 'target'],
      })
    })
  })

  describe('Type safety', () => {
    it('should work with typed return values', () => {
      const obj = {
        user: {
          id: 123,
          name: 'John',
          active: true,
        },
      }

      const idResult = findProperty<number>(obj, 'id')
      expect(idResult?.value).toBe(123)
      expect(typeof idResult?.value).toBe('number')

      const nameResult = findProperty<string>(obj, 'name')
      expect(nameResult?.value).toBe('John')
      expect(typeof nameResult?.value).toBe('string')

      const activeResult = findProperty<boolean>(obj, 'active')
      expect(activeResult?.value).toBe(true)
      expect(typeof activeResult?.value).toBe('boolean')
    })

    it('should handle complex object types', () => {
      interface User {
        id: number
        name: string
      }

      const obj = {
        data: {
          user: { id: 1, name: 'Test User' },
        },
      }

      const result = findProperty<User>(obj, 'user')
      expect(result?.value).toEqual({ id: 1, name: 'Test User' })
      expect(result?.path).toEqual(['data', 'user'])
    })
  })

  describe('Real-world webhook examples', () => {
    it('should find session_id in webhook sample 1', () => {
      const result = findProperty(webhookSample1, 'session_id')
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['extras', 'creation_extras', 'session_id'],
      })
    })

    it('should find special_reference in webhook sample 1', () => {
      const result = findProperty(webhookSample1, 'special_reference')
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['special_reference'],
      })
    })

    it('should find merchant_order_id in webhook sample 1', () => {
      const result = findProperty(webhookSample1, 'merchant_order_id')
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['extras', 'creation_extras', 'merchant_order_id'],
      })
    })

    it('should find session_id in webhook sample 2', () => {
      const result = findProperty(webhookSample2, 'session_id')
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['intention', 'extras', 'creation_extras', 'session_id'],
      })
    })

    it('should find special_reference in webhook sample 2', () => {
      const result = findProperty(webhookSample2, 'special_reference')
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['intention', 'special_reference'],
      })
    })

    it('should find merchant_order_id in webhook sample 3', () => {
      const result = findProperty(webhookSample3, 'merchant_order_id')
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['obj', 'order', 'merchant_order_id'],
      })
    })

    it('should find multiple keys with fallback - session_id, special_reference, merchant_order_id', () => {
      const result = findProperty(webhookSample1, [
        'session_id',
        'special_reference',
        'merchant_order_id',
      ])
      expect(result).toEqual({
        value: 'dummy_session_12345',
        path: ['special_reference'], // First found at root level
      })
    })

    it('should find integration_id across all samples', () => {
      const result1 = findProperty(webhookSample1, 'integration_id')
      expect(result1?.value).toBe(1234567)

      const result2 = findProperty(webhookSample2, 'integration_id')
      expect(result2?.value).toBe(1234567)

      const result3 = findProperty(webhookSample3, 'integration_id')
      expect(result3?.value).toBe(1234567)
    })

    it('should find transaction ID across different webhook structures', () => {
      const result1 = findProperty(webhookSample1, 'id')
      expect(result1?.value).toBe('pi_test_dummy123456789abcdef')

      const result2 = findProperty(webhookSample2, 'id')
      expect(result2?.value).toBe('pi_test_dummy123456789abcdef')

      const result3 = findProperty(webhookSample3, 'id')
      expect(result3?.value).toBe(11111111)
    })

    it('should handle complex nested search in webhook sample 3', () => {
      const result = findProperty(webhookSample3, 'migs_transaction')
      expect(result?.value).toEqual({
        id: '11111111',
        stan: '99999',
        type: 'CAPTURE',
        amount: 199.0,
        source: 'INTERNET',
        receipt: 'dummy_receipt_123',
        acquirer: {
          id: 'BMNF_S2I',
          date: '0910',
          batch: 20250910,
          timeZone: '+0300',
          merchantId: 'DUMMY_MERCH',
          transactionId: 'dummy_txn_999',
          settlementDate: '2025-09-10',
        },
        currency: 'EGP',
        terminal: 'DUMMY_TERM',
        authorizationCode: '123456',
      })
      expect(result?.path).toEqual(['obj', 'data', 'migs_transaction'])
    })
  })

  describe('Multiple keys search', () => {
    const obj = {
      payment: {
        transaction_id: 'txn_123',
        order: {
          id: 'order_456',
        },
      },
      user: {
        user_id: 'user_789',
      },
    }

    it('should find first matching key from multiple options', () => {
      const result = findProperty(obj, ['id', 'transaction_id', 'user_id'])
      expect(result).toEqual({
        value: 'txn_123',
        path: ['payment', 'transaction_id'],
      })
    })

    it("should find alternative key when first doesn't exist", () => {
      const result = findProperty(obj, ['non_existent', 'user_id'])
      expect(result).toEqual({
        value: 'user_789',
        path: ['user', 'user_id'],
      })
    })

    it('should return undefined when none of the keys exist', () => {
      const result = findProperty(obj, ['key1', 'key2', 'key3'])
      expect(result).toBeUndefined()
    })
  })

  describe('Performance and deep nesting', () => {
    it('should handle deeply nested objects', () => {
      const deepObj: any = {}
      let current = deepObj

      // Create 100 levels of nesting
      for (let i = 0; i < 100; i++) {
        current[`level${i}`] = {}
        current = current[`level${i}`]
      }
      current.deepKey = 'found at depth 100'

      const result = findProperty(deepObj, 'deepKey')
      expect(result?.value).toBe('found at depth 100')
      expect(result?.path).toHaveLength(101) // 100 levels + the key itself
    })

    it('should handle large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => ({
        index: i,
        ...(i === 500 && { specialKey: 'found at index 500' }),
      }))

      const obj = { data: largeArray }
      const result = findProperty(obj, 'specialKey')

      expect(result).toEqual({
        value: 'found at index 500',
        path: ['data', '500', 'specialKey'],
      })
    })
  })
})
