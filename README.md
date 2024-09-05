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

# How to run

- Install NodeJS and Docker compose.
- Run the following command in the root of the project `docker-compose up --build`
- Navigate to `http://localhost:5173/` in your browser
