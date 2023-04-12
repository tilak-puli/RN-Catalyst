# Storage

- [Storage](#storage)
  - [Overview](#overview)
  - [Dependencies](#dependencies)
  - [Interface Exposed Methods](#interface-exposed-methods)

## Overview

In React Native there are two types of storage options available, Secured and Unsecured. Secured storage is implemented using `SharedPreferences` in Android and `Keychain Services` in iOS, on the other hand Unsecured storage uses plain text file to store key values pair. We have both types of storage in this starter kit as an individual module, and sharing a common interface which give us flexibility to change storage type on the fly.

## Dependencies

- [Keychain Storage](https://www.npmjs.com/package/react-native-keychain) (For Secure Storage)
- [Async Storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) (For Unsecure Storage)

## Interface Exposed Methods

- `setItem(key: string, value: string): Promise<void>`
- `getItem(key: string): Promise<string | null>`
- `deleteItem(key: string): Promise<void>`
- `multiGet(keys: string[]): Promise<readonly [string, string | null][]>`
- `getAllItems(): Promise<readonly [string, string | null][]>`
- `clear(): Promise<void>`
