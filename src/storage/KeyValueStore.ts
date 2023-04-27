export interface KeyValueStore {
  setItem(key: string, value: string): Promise<void>;

  getItem(key: string): Promise<string | null>;
  deleteItem(key: string): Promise<void>;
  multiGet(keys: string[]): Promise<readonly [string, string | null][]>;
  getAllItems(): Promise<readonly [string, string | null][]>;
  clear(): Promise<void>;
}
