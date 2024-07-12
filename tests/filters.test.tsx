describe('search-replace-for-block-editor.keyboardShortcut', () => {
  it('passes and returns the default keyboard shortcut', () => {
    jest.doMock('@wordpress/hooks', () => ({
      applyFilters: jest.fn((hook: string, arg: object) => arg),
    }));

    const { getShortcut } = require('../src/utils');
    const shortcut = getShortcut();
    expect(shortcut).toStrictEqual(
      {
        character: 'f',
        modifier: 'primaryShift'
      }
    );
  });

  it('passes and returns a custom keyboard shortcut', () => {
    jest.doMock('@wordpress/hooks', () => ({
      applyFilters: jest.fn((hook: string, arg: object) => {
        return { ...arg, character: 'j' };
      }),
    }));

    const { getShortcut } = require('../src/utils');
    const shortcut = getShortcut();
    expect(shortcut).toStrictEqual(
      {
        character: 'j',
        modifier: 'primaryShift'
      }
    );
  });

  afterEach(() => {
    jest.unmock('@wordpress/hooks');
    jest.unmock('../src/utils');
    jest.resetModules();
  });
});
