export const MAX_FILE_SIZE = 102400; //100KB

export const validFileExtensions: string[] = ['png', 'jpeg'];

export function isValidFileType(fileName: string): boolean {
  return !!fileName && validFileExtensions.indexOf(fileName.split('.').pop()!) > -1;
}
