# Thought Process

- First I have created a `Home` component. In a real world scenario it will correspond to `Home` page.
- I am using Mantine UI components for the task.
- Next, I loaded the data from the json file and sorted the items in ascending order of item position incase the items come out of order.
- I have created a reusable `Card` component that displays the item title and the thumbnail for each item.
- I am using Mantine `Grid` component for the cards to place them as requested.
- Clicking on each card will display the thumbnail in an overlay using Mantine Modal Manager API.
- Since I am not a backend developer, I have setup a mock server using MSW.
- Now, instead of directly loading the json file in `Home` component, I have created a get API for the data. I am using `useEffect` to call the API and save the data in `items` state.
- The get API first checks if the data is present in `localStorage`. If not it loads the json file. It then saves the data in `localStorage` and returns the data. Next time it will return the data from `localStorage`.
- I have added reorder functionality using HTML Drag and Drop API.
- To track dragged item and dragged over item, I have created two react ref `draggedItemRef` and `draggedOverItemRef`.
- I have created a `useInterval` hook to save the data after every five seconds. If no change is made, then we don't save. For this, I have created another ref `changeDetectorRef` to track changes.
- Every time we save, I am updating the `lastSavedTime` state value with current time. Then every 1 second I am updating the `currentTime` state value. The difference of `currentTime` and `lastSavedTime` will give us the desired result.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
