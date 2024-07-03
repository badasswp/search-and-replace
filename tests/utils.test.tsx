import { getTextBlocks } from '../src/utils';
import { getAllowedBlocks } from '../src/utils';

jest.mock('@wordpress/blocks', () => ({
  getBlockTypes: jest.fn(() => {
    return [
      1,
      'string',
      true,
      null,
      undefined,
      [],
      {},
      { name: 'core/paragraph' },
      { category: 'text', name: 'core/paragraph' },
      { category: 'image', name: 'core/image' },
      { category: 'text', name: 'core/pullquote' },
      { category: 'text', name: 'core/preformatted' },
    ]
  }),
}));

jest.mock('@wordpress/hooks', () => ({
  applyFilters: jest.fn(() => []),
}));

describe('getTextBlocks', () => {
  it('passes and returns Blocks in the `text` category', () => {
    const blocks = getTextBlocks();
    expect(blocks).toEqual(
      ['core/paragraph', 'core/pullquote', 'core/preformatted']
    );
  });

  it('passes and returns Length of Blocks', () => {
    const blocks = getTextBlocks();
    expect(blocks.length).toBe(3);
  });
})

describe('getAllowedBlocks', () => {
  it('passes and returns Blocks with filters applied', () => {
    jest.mock('../src/utils', () => ({
      getTextBlocks: jest.fn(() => {
        return ['core/paragraph', 'core/pullquote', 'core/preformatted'];
      }),
    }));

    const blocks = getAllowedBlocks();
    expect(blocks).toEqual([]);
  });

  it('passes and returns Length of Blocks', () => {
    jest.mock('../src/utils', () => ({
      getTextBlocks: jest.fn(() => {
        return ['core/paragraph', 'core/pullquote', 'core/preformatted'];
      }),
    }));

    const blocks = getAllowedBlocks();
    expect(blocks.length).toEqual(0);
  });
})
