import { getBuilderLines, convertKnownHtmlCharsToRtf } from '../builder';

describe('getBuilderLines', () => {
  it('generates appropriate line information', () => {
    const content = [
      ['Family', 'Genus', 'Species'],
      ['One', 'Another', 'Third'],
      ['One', 'Another', 'Fourth'],
      ['One', 'Another', 'Fifth'],
    ];

    const rowConfig = [
      { colIndex: 0, indent: false, format: '{{it.VALUE}}' },
      { colIndex: 1, indent: true, format: '{{it.VALUE}}' },
      { colIndex: 2, indent: true, format: '{{it.VALUE}}' },
    ];

    expect(getBuilderLines(content, rowConfig)).toEqual([
      { value: 'One', indent: 0 },
      { value: 'Another', indent: 1 },
      { value: 'Third', indent: 2 },
      { value: 'Fourth', indent: 2 },
      { value: 'Fifth', indent: 2 },
    ]);
  });
});

describe('convertKnownHtmlCharsToRtf', () => {
  it('converts bold tags', () => {
    expect(convertKnownHtmlCharsToRtf('this is a <b>test</b> okay?')).toEqual(
      'this is a {\\b test} okay?'
    );
    expect(
      convertKnownHtmlCharsToRtf('this is a <b>test</b> <b>ok</b>ay?')
    ).toEqual('this is a {\\b test} {\\b ok}ay?');
    expect(convertKnownHtmlCharsToRtf('<b>simple</b>')).toEqual('{\\b simple}');
  });
});
