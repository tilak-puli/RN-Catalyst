# Data Synchronization

Status: [ accepted ] \
Deciders: [Livingston samuel, Chinnasamy Chinnaraj]\
Date: [2022-05-30]\
Technical Story: [https://github.com/Regional-IT-India/catalyst-ui-reactnative-starter/issues/6#issue-1252533135]

### Context

- How to improve data fetching, fetch UX(prefetching, refetching, caching etc) ?

### Considered Options

- [React Query](https://react-query-v2.tanstack.com)
- [RTK query](https://redux-toolkit.js.org/rtk-query/overview)

### Comparison of the Options

| React Query                                | RTK Query                                          |
| ------------------------------------------ | -------------------------------------------------- |
| Only React is required                     | React and Redux is required                        |
| React Suspense support                     | React suspense not officially supported            |
| Offline caching, Network status refetching | Supported but require extra user-code to implement |

Detailed comparison reference - [Comparison | React Query vs RTK Query](https://react-query-v3.tanstack.com/comparison)

### Recommendation

In this RN starter kit we are using React Query because for RTK an additional redux setup is required. React Query also provide support for React Suspense, Query cancellation etc.
