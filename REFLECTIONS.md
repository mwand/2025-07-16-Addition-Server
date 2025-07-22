# REFLECTIONS

These are notes on gotchas that tripped me up

- I had to change imports from types to say `import { **type** ToDoItem } from './types'` .  Not sure if this is a version issue.  This broke the browser (leading to a blank screen), but did not show u  p as an error in VSC.
- - discovered this by opening the console in the browser.
- 