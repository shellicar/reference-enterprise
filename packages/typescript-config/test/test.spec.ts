import { assert, describe, expect, it } from 'vitest';

describe('Default Test Suite', () => {
  it('can use expect', () => {
    expect(true).toBe(true);
  });

  it('can us assert', () => {
    assert.equal(1, 1);
  });
});
