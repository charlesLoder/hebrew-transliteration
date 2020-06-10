export interface TransOptions {
  isSequenced?: boolean;
  qametsQatan?: boolean;
  isSimple?: boolean;
}

export interface RemoveOptions {
  removeVowels?: boolean;
}

export interface Dict {
  [key: string]: string;
}
