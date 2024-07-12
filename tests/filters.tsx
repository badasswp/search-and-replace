describe('search-replace-for-block-editor.keyboardShortcut', () => {
  it('passes and returns the default keyboard shortcut', () => {
    jest.resetModules();

    jest.doMock('@wordpress/hooks', () => ({
      applyFilters: jest.fn((hook, arg) => arg),
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
    jest.resetModules();

    jest.doMock('@wordpress/hooks', () => ({
      applyFilters: jest.fn((hook, arg) => {
        return Object.assign(
          arg,
          {
            character: 'j',
          },
        )
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
    jest.resetModules();
  });
})
