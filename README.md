# React challenge dev
Xavi Pérez
<hr>

### Deployment url
[Challenge deployment url](https://challenge-react-jade.vercel.app/)

### Run project

  `npm run dev`

### Run tests

`npm run test`

### Environment variables (.env)

`COMIC_VINE_API_URL`
`COMIC_VINE_API_KEY`

### Project architecture
The project follows a feature-based structure.
<details>
<summary>
  Click to expaned
</summary>
challenge-react/<br/>
├─ app/<br/>
│  ├─ api/<br/>
│  │  └─ characters/<br/>
│  │     ├─ route.ts<br/>
│  │     └─ [id]/<br/>
│  │        └─ route.ts<br/>
│  └─ characters/<br/>
│     └─ [id]/<br/>
│        └─ page.tsx<br/>
├─ components/<br/>
│  ├─ Header.tsx<br/>
│  ├─ PageTitle.tsx<br/>
│  ├─ SearchBar.tsx<br/>
│  └─ ui/<br/>
│     ├─ FavoriteButton.tsx<br/>
│     └─ LoadingBar.tsx<br/>
├─ context/<br/>
│  ├─ CharactersContext.tsx<br/>
│  └─ FavoriteCharactersContext.tsx<br/>
├─ features/<br/>
│  ├─ characters/<br/>
│  │  ├─ CharacterCard.tsx<br/>
│  │  ├─ CharactersGrid.tsx<br/>
│  │  └─ CharacterView.tsx<br/>
│  └─ issues/<br/>
│     └─ IssuesSlider.tsx<br/>
├─ icons/<br/>
│  ├─ HeartIcon.tsx<br/>
│  ├─ HeartIconFilled.tsx<br/>
│  └─ SearchIcon.tsx<br/>
├─ services/<br/>
│  ├─ api.ts<br/>
│  └─ types.ts<br/>
</details>

### Important files

- **\app\globals.css** 
  - CSS variables and global styles

- **\components**
  - Header, PageTitle and SearchBar components

- **\components\ui**
  - FavoriteButton   

- **\context**
  - Context used with characters and favorite characters.

- **\services**
  - Api calls, get characters, and character issues and types descriptions

- **\app\api\\**
  - Server side api calls to ensure the data
