# BalanSAAS App

### Setup

1. Set the variables of `.env-sample` into the `.env`.

### Commands

Use `pnpm` for a fast bundling the app

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm install -g pnpm ` | Install `pnpm` globally                  |
| `pnpm run dev`         | Run the development server               |
| `npx prettier -w .`    | Run the prettier recusively in all files |

If you want to add a new command you can do it in the `package.json` file in the `scripts` key

### Alias folders

You have the entry alias for the `./src/*` folder with `@`

### Folder/Files Conventions

- All routes are declares in `src/routes` folder
- `Fetch` requests are declared in `src/handlers`
- Tanstack abstractions are declares in `src/tanstask_hooks` folder (abstractions over `useMutation` and `useQuery`)
- In `src/screens` there are a folder for each main screen in the page, should contain a `*Layout` component and the required files
  - To better tracking, try to always put the `data-testid` attribute on the outer element of the layout or main component in screens
- In `src/components` are the reutilizable components, here you can find:
  - `/loaders` for loaders and basic skeletons, specialized skeletons should be in each screen folder if needed, generic ones here
  - `/ui` for shadcn components
  - `/icons` for shadcn components

_Note_ If a component is used in screens, and you want to use it in another component because is reutilizable of some way, you should parameterize it and put that into `components` folder (or a subfolder)

- In `src/lib` there are functions for handling a certain type of structure, like dates, string or validations for an item like rut
