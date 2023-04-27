import {KeyValueStore} from './KeyValueStore';
import SecureKeyValueStore from './SecureKeyValueStore';
import {AsyncKeyValueStore} from './AsyncKeyValueStore';

const cacheTTLInMinutes = 10;
const secureKeyValueStore: KeyValueStore = new SecureKeyValueStore(
  cacheTTLInMinutes,
);

const asyncKeyValueStore: KeyValueStore = new AsyncKeyValueStore();

export {asyncKeyValueStore, secureKeyValueStore};
