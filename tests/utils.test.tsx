import { getTextBlocks } from '../src/core/utils';

jest.mock( '@wordpress/blocks', () => ( {
	getBlockTypes: jest.fn( () => {
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
		];
	} ),
} ) );

describe( 'getTextBlocks', () => {
	it( 'passes and returns Blocks in the `text` category', () => {
		const blocks = getTextBlocks();
		expect( blocks ).toEqual( [
			'core/paragraph',
			'core/pullquote',
			'core/preformatted',
		] );
	} );

	it( 'passes and returns Length of Blocks', () => {
		const blocks = getTextBlocks();
		expect( blocks.length ).toBe( 3 );
	} );
} );
