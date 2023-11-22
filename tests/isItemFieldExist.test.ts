import isItemFieldExist from '../utils/isItemFieldExist';

test('item field is not exist', () => {
  expect(isItemFieldExist('')).toBeFalsy();
});
